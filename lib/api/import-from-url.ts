export type ImportResult = {
  draft?: {
    title: string;
    artist: string;
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

  // e-chords typically renders the tab/chords inside <pre> blocks
  const blocks = extractPreBlocks(html);
  const chosen = pickBestBlock(blocks);
  if (!chosen) return undefined;
  const text = htmlToText(chosen);
  let lines = sanitizeLines(text);
  lines = postProcessLines(lines);
  if (!lines.length) return undefined;
  return { title, artist, lines, sourceUrl };
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
