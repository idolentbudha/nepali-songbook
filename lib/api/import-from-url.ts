export type ImportResult = {
  draft?: {
    title: string;
    artist: string;
    /** Optional album name if detected */
    album?: string;
    /** Optional chord key/tonality if detected (e.g., "C", "Gm") */
    key?: string;
    lines: string[];
    sourceUrl: string;
  };
  error?: string;
};

export async function importFromUrl(url: string): Promise<ImportResult> {
  try {
    const res = await fetch(url, { headers: { Accept: "text/html" } });
    if (!res.ok) return { error: `Fetch failed: ${res.status}` };
    const html = await res.text();
    const site = hostnameFromUrl(url);

    // Site-specific extractor: ultimate-guitar.com (best-effort)
    if (
      /ultimate-guitar\.com$/i.test(site) ||
      /ultimate-guitar\.com/i.test(url)
    ) {
      const draft = extractFromUltimateGuitar(html, url);
      if (draft) return { draft };
    }

    // Site-specific extractor: e-chords.com (best-effort)
    if (/e-chords\.com$/i.test(site) || /e-chords\.com/i.test(url)) {
      const draft = extractFromEChords(html, url);
      if (draft) return { draft };
    }

    // Generic extractor fallback: try <pre>, then <article>, replace <br> with newlines
    const draft = extractGeneric(html, url);
    if (draft) return { draft };

    return { error: "Could not extract chords/lyrics from this page." };
  } catch (e: any) {
    return { error: String(e?.message || e) };
  }
}

function extractFromUltimateGuitar(
  html: string,
  sourceUrl: string
): ImportResult["draft"] | undefined {
  // Title via og:title or <title>, then custom split for UG format
  const titleRaw =
    matchMetaContent(
      html,
      /<meta\s+property=["']og:title["']\s+content=["']([^"']+)/i
    ) || matchTitle(html);
  const { title, artist } = splitUGTitleArtist(titleRaw);

  // Try to enrich with key/album from Next.js data
  const ugMeta = extractUGMetaFields(html);
  const keyGuess = ugMeta.key;
  const albumGuess = ugMeta.album;
  const artistFinal = ugMeta.artist || artist;
  const titleFinal = ugMeta.title || title;

  // Attempt 1: parse embedded Next.js data and scan for [ch] markup
  const nextText = extractUGNextDataText(html);
  if (nextText) {
    const text = normalizeUGMarkup(nextText);
    let lines = sanitizeLines(text);
    // Text likely already inline [C]style after normalization
    lines = postProcessLines(lines);
    if (lines.length)
      return {
        title: titleFinal,
        artist: artistFinal,
        album: albumGuess,
        key: keyGuess,
        lines,
        sourceUrl,
      };
  }

  // Attempt 2: if HTML contains [ch]...[/ch] directly, extract visible content
  const inlineCandidate = extractUGInlineFromHtml(html);
  if (inlineCandidate) {
    const text = normalizeUGMarkup(inlineCandidate);
    let lines = sanitizeLines(text);
    lines = postProcessLines(lines);
    if (lines.length)
      return {
        title: titleFinal,
        artist: artistFinal,
        album: albumGuess,
        key: keyGuess,
        lines,
        sourceUrl,
      };
  }

  // Attempt 3: fall back to any <pre> blocks (rare on UG)
  const blocks = extractPreBlocks(html);
  const chosen = pickBestBlock(blocks);
  if (chosen) {
    const text = htmlToText(chosen);
    let lines = sanitizeLines(text);
    lines = postProcessLines(lines);
    if (lines.length)
      return {
        title: titleFinal,
        artist: artistFinal,
        album: albumGuess,
        key: keyGuess,
        lines,
        sourceUrl,
      };
  }

  return undefined;
}

function splitUGTitleArtist(s?: string): { title: string; artist: string } {
  if (!s) return { title: "Untitled", artist: "" };
  // Common formats: "Song Name CHORDS by Artist @ Ultimate-Guitar.Com"
  let cleaned = s.replace(/@\s*Ultimate.*$/i, "").trim();
  // Remove trailing CHORDS / TABS label from title portion
  const lower = cleaned.toLowerCase();
  const byIdx = lower.lastIndexOf(" by ");
  if (byIdx !== -1) {
    const rawTitle = cleaned.slice(0, byIdx).trim();
    const artist = cleaned.slice(byIdx + 4).trim();
    const title = rawTitle.replace(/\s*(?:chords?|tabs?)\s*$/i, "").trim();
    return { title: title || rawTitle, artist };
  }
  // Fallback: remove suffix label and return as title only
  cleaned = cleaned.replace(/\s*(?:chords?|tabs?)\s*$/i, "").trim();
  return { title: cleaned, artist: "" };
}

function extractUGNextDataText(html: string): string | null {
  const m = html.match(
    /<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i
  );
  if (!m) return null;
  try {
    const json = JSON.parse(m[1]);
    // Recursively scan for a big string that contains [ch] tags or many chords
    let found: string | null = null;
    const visit = (v: any) => {
      if (found) return;
      if (typeof v === "string") {
        if (/\[ch\][^\[]+\[\/ch\]/i.test(v) || chordDensity(v) >= 8) {
          found = v;
        }
        return;
      }
      if (Array.isArray(v)) {
        for (const x of v) visit(x);
        return;
      }
      if (v && typeof v === "object") {
        for (const k in v) visit(v[k]);
      }
    };
    visit(json);
    return found;
  } catch {
    return null;
  }
}

function extractUGMetaFields(html: string): {
  key?: string;
  album?: string;
  artist?: string;
  title?: string;
} {
  const m = html.match(
    /<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i
  );
  if (!m) return {};
  try {
    const json = JSON.parse(m[1]);
    const wanted: Record<string, string[]> = {
      key: ["tonality_name", "tonality", "key"],
      album: ["album_name", "album"],
      artist: ["artist_name", "artist", "artistName"],
      title: ["song_name", "song", "title"],
    };
    const out: any = {};
    const visit = (v: any) => {
      if (!v) return;
      if (typeof v === "string") return;
      if (Array.isArray(v)) {
        for (const x of v) visit(x);
        return;
      }
      if (typeof v === "object") {
        for (const k in v) {
          const lower = k.toLowerCase();
          for (const [field, keys] of Object.entries(wanted)) {
            if (keys.some((kk) => kk.toLowerCase() === lower)) {
              const val = v[k];
              if (typeof val === "string" && !out[field]) out[field] = val;
            }
          }
          visit(v[k]);
        }
      }
    };
    visit(json);
    // Basic cleanup for key like "C major" => "C" or "G minor" => "Gm"
    if (typeof out.key === "string") {
      const k = out.key.trim();
      const mm = k.match(/^[A-G](?:#|b)?/);
      if (mm) {
        const base = mm[0];
        const minor = /minor|m\b/i.test(k) && !/major/i.test(k);
        out.key = minor ? base + "m" : base;
      }
    }
    return out;
  } catch {
    return {};
  }
}

function chordDensity(s: string): number {
  const m = s.match(/\b[A-G](?:#|b)?m?(?:maj|min|sus|dim|aug)?\d*\b/g);
  return m ? m.length : 0;
}

function extractUGInlineFromHtml(html: string): string | null {
  // If UG rendered inline with [ch] tags in the initial HTML, capture a reasonable slice
  const m = html.match(/\[ch\][\s\S]*?\[\/ch\][\s\S]*?(?:<\/|$)/i);
  if (!m) return null;
  // Remove trailing closing tag edge if present
  return m[0].replace(/<\/[^>]*>$/i, "");
}

function normalizeUGMarkup(s: string): string {
  // Convert UG [ch]X[/ch] tags to our inline [X]
  let out = s.replace(/\[ch\]([^\[]*?)\[\/ch\]/gi, (m, g1) => {
    const chord = String(g1 || "").trim();
    return chord ? `[${chord}]` : "";
  });
  // Strip other UG bbcode-like tags (e.g., [tab], [/tab])
  out = out.replace(
    /\[(?:\/)?(?:tab|chord|intro|verse|chorus|bridge|solo)\]/gi,
    ""
  );
  // Normalize newlines
  out = out.replace(/\r\n?/g, "\n");
  return out;
}

function extractEChordsKey(html: string): string | undefined {
  // Look for Key/Tone/Tom labels on the page
  const m = html.match(
    /(Key|Tone|Tom)\s*[:\-]\s*([A-G](?:#|b)?(?:m|maj|min|sus|dim|aug)?\d?)/i
  );
  if (m) {
    const guess = m[2].trim();
    // Validate using chord token pattern (reuse logic loosely)
    if (/^[A-G](?:#|b)?(?:m|maj|min|sus|dim|aug)?\d?$/.test(guess))
      return guess;
  }
  return undefined;
}

function extractFromEChords(
  html: string,
  sourceUrl: string
): ImportResult["draft"] | undefined {
  // Title from og:title or <title>
  const titleRaw =
    matchMetaContent(
      html,
      /<meta\s+property=["']og:title["']\s+content=["']([^"']+)/i
    ) || matchTitle(html);
  const { title, artist } = splitTitleArtist(titleRaw);

  // Try to detect a Key/Tone/Tom in the page
  const keyGuess = extractEChordsKey(html);

  // e-chords typically renders the tab/chords inside <pre> blocks
  const blocks = extractPreBlocks(html);
  const chosen = pickBestBlock(blocks);
  if (!chosen) return undefined;
  const text = htmlToText(chosen);
  let lines = sanitizeLines(text);
  lines = postProcessLines(lines);
  if (!lines.length) return undefined;
  return { title, artist, key: keyGuess, lines, sourceUrl };
}

function extractGeneric(
  html: string,
  sourceUrl: string
): ImportResult["draft"] | undefined {
  const titleRaw =
    matchMetaContent(
      html,
      /<meta\s+property=["']og:title["']\s+content=["']([^"']+)/i
    ) || matchTitle(html);
  const { title, artist } = splitTitleArtist(titleRaw);
  let text = "";
  const preBlocks = extractPreBlocks(html);
  if (preBlocks.length) {
    text = htmlToText(pickBestBlock(preBlocks)!);
  } else {
    // Fall back to replacing <br> with newlines for common containers
    const m = html.match(
      /<(?:article|div|section)[^>]*>([\s\S]*?)<\/\s*(?:article|div|section)\s*>/i
    );
    if (m) text = htmlToText(m[1]);
  }
  let lines = sanitizeLines(text);
  lines = postProcessLines(lines);
  if (!lines.length) return undefined;
  return { title, artist, lines, sourceUrl };
}

function extractPreBlocks(html: string): string[] {
  const out: string[] = [];
  const re = /<pre[^>]*>([\s\S]*?)<\/pre>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function pickBestBlock(blocks: string[]): string | undefined {
  if (!blocks.length) return undefined;
  // Heuristic: choose the block with the most newline density and chord-like tokens
  let best: { score: number; html: string } | null = null;
  for (const b of blocks) {
    const text = htmlToText(b);
    const lines = text.split(/\r?\n/);
    const chordHits = (
      text.match(/\b([A-G](?:#|b)?m?(?:maj|min|sus|dim|aug)?\d*)\b/g) || []
    ).length;
    const score = lines.length + chordHits * 2;
    if (!best || score > best.score) best = { score, html: b };
  }
  return best?.html;
}

function matchMetaContent(html: string, re: RegExp): string | undefined {
  const m = html.match(re);
  return m?.[1]?.trim();
}

function matchTitle(html: string): string | undefined {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m?.[1]?.replace(/\s+/g, " ").trim();
}

function splitTitleArtist(s?: string): { title: string; artist: string } {
  if (!s) return { title: "Untitled", artist: "" };
  const parts = s.split(" - ");
  if (parts.length >= 2) {
    const artist = parts[0].trim();
    const title = parts.slice(1).join(" - ").trim();
    return { title, artist };
  }
  return { title: s, artist: "" };
}

function htmlToText(fragment: string): string {
  let s = fragment
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<p\s*[^>]*>/gi, "\n")
    .replace(/<\/(?:p|div|section)>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  return s;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function sanitizeLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+$/g, ""))
    .filter((l) => l.trim().length > 0);
}

function hostnameFromUrl(u: string): string {
  try {
    const h = new URL(u).hostname;
    return h.replace(/^www\./, "");
  } catch {
    const m = u.match(/^(?:https?:\/\/)?([^/]+)/i);
    return (m?.[1] || u).replace(/^www\./, "");
  }
}

// --- Post-processing to clean messy scraped text into our inline chord markup ---

function postProcessLines(lines: string[]): string[] {
  const cleaned = collapseBlankLines(lines.map((l) => l.replace(/\s+$/g, "")));
  const converted = convertChordOverLyricsToInline(cleaned);
  return collapseBlankLines(converted);
}

function collapseBlankLines(lines: string[]): string[] {
  const out: string[] = [];
  let prevBlank = false;
  for (const l of lines) {
    const isBlank = l.trim().length === 0;
    if (isBlank) {
      if (!prevBlank) out.push("");
      prevBlank = true;
    } else {
      out.push(l);
      prevBlank = false;
    }
  }
  return out;
}

function isChordToken(tok: string): boolean {
  // Matches tokens like C, G, Am, F#, Bb, D/F#, Cmaj7, Asus2, Gm7, etc.
  return /^(?:[A-G](?:#|b)?(?:m|maj|min|sus|dim|aug)?\d*(?:\/[A-G](?:#|b)?)?)$/.test(
    tok
  );
}

function isChordLine(line: string): boolean {
  const parts = line.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return false;
  const chordCount = parts.filter(isChordToken).length;
  // Consider a line a chord line if majority tokens look like chords and
  // the line has limited non-chord characters
  return chordCount >= 1 && chordCount / parts.length >= 0.6;
}

function convertChordOverLyricsToInline(lines: string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const cur = lines[i];
    const next = i + 1 < lines.length ? lines[i + 1] : undefined;
    if (next && isChordLine(cur) && next.trim().length > 0) {
      const inline = injectChordsIntoLyric(cur, next);
      if (inline) {
        out.push(inline);
        i++; // skip next
        continue;
      }
    }
    out.push(cur);
  }
  return out;
}

function injectChordsIntoLyric(
  chordLine: string,
  lyricLine: string
): string | null {
  // Use character positions in chord line to place [CHORD] before the nearest lyric char.
  const cl = chordLine; // keep original spacing
  const ll = lyricLine;
  const positions: { idx: number; chord: string }[] = [];
  let i = 0;
  while (i < cl.length) {
    if (cl[i] === " ") {
      i++;
      continue;
    }
    // capture chord token starting at i
    let j = i;
    while (j < cl.length && cl[j] !== " ") j++;
    const token = cl.slice(i, j);
    if (isChordToken(token)) {
      positions.push({ idx: i, chord: token });
    }
    i = j;
  }
  if (positions.length === 0) return null;
  // Build inline by inserting [chord] into lyric at or after the chord index
  let result = ll;
  // Insert from right to left to keep indices stable
  positions.sort((a, b) => b.idx - a.idx);
  for (const p of positions) {
    const insertAt = findNextLyricIndex(result, p.idx);
    result =
      result.slice(0, insertAt) + `[${p.chord}]` + result.slice(insertAt);
  }
  return result;
}

function findNextLyricIndex(lyric: string, approxIdx: number): number {
  // If approxIdx is out of range, clamp.
  if (approxIdx <= 0) return 0;
  if (approxIdx >= lyric.length) return lyric.length;
  // Move right until a non-space character or end
  for (let k = approxIdx; k < lyric.length; k++) {
    if (lyric[k] !== " ") return k;
  }
  // If only trailing spaces, insert at end
  return lyric.length;
}
