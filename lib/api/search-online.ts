import { GOOGLE_CSE } from "@/lib/flags";

export type OnlineSource = {
  site: string; // e.g., "Ultimate-Guitar", "Chordify"
  url: string;
};

export type SearchResult = {
  id: string; // synthetic id for list keys
  title: string;
  artist: string;
  source: OnlineSource;
};

// Client-side search. If Google CSE env is provided and sites are configured,
// perform one query per site and return the top result from each (max 1/site).
// Otherwise, fall back to the local stub.
export async function searchOnline(query: string): Promise<SearchResult[]> {
  const q = query.trim();
  if (!q) return [];
  if (GOOGLE_CSE.key && GOOGLE_CSE.cx) {
    return searchViaGoogleCSE(q);
  }
  // Fallback: stubbed results
  await delay(350);
  // Produce deterministic mock results from the query
  const base = slug(q);
  return [
    {
      id: `${base}-ug`,
      title: `${q} (Chords)`,
      artist: "Unknown Artist",
      source: {
        site: "ExampleUG",
        url: `https://www.e-chords.com/ug/${encodeURIComponent(base)}`,
      },
    },
    {
      id: `${base}-cfy`,
      title: `${q} (Live)`,
      artist: "Unknown Artist",
      source: {
        site: "ExampleChordify",
        url: `https://example.com/cfy/${encodeURIComponent(base)}`,
      },
    },
    {
      id: `${base}-misc`,
      title: `${q} - Acoustic`,
      artist: "Unknown Artist",
      source: {
        site: "ExampleMisc",
        url: `https://example.com/m/${encodeURIComponent(base)}`,
      },
    },
  ];
}

async function searchViaGoogleCSE(q: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  // Single query against CSE configuration; take up to 3 distinct domains.
  try {
    const url =
      "https://www.googleapis.com/customsearch/v1" +
      `?q=${encodeURIComponent(q)}` +
      `&key=${encodeURIComponent(GOOGLE_CSE.key)}` +
      `&cx=${encodeURIComponent(GOOGLE_CSE.cx)}` +
      `&num=10`;
    const res = await fetch(url);
    if (!res.ok) return results;
    const data: any = await res.json();
    // const data: any = DUMMY_RESPONSE_DATA;
    console.log("data:", data);
    const items: any[] = Array.isArray(data?.items) ? data.items : [];
    const seen = new Set<string>();
    for (const item of items) {
      if (results.length >= 3) break;
      const link: string | undefined = item?.link || item?.formattedUrl;
      if (!link) continue;
      const domain = (item?.displayLink as string) || hostnameFromUrl(link);
      if (seen.has(domain)) continue;
      seen.add(domain);
      results.push({
        id: `${slug(q)}-${slug(domain)}`,
        title: (item?.title as string) || q,
        artist: "",
        source: { site: domain, url: link },
      });
    }
  } catch (e) {
    console.warn("CSE query failed", e);
  }
  return results;
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
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
