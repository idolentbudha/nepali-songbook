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

const DUMMY_RESPONSE_DATA = {
  kind: "customsearch#search",
  url: {
    type: "application/json",
    template:
      "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json",
  },
  queries: {
    request: [
      {
        title: "Google Custom Search - Timi bhane",
        totalResults: "721",
        searchTerms: "Timi bhane",
        count: 10,
        startIndex: 1,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "26742e10238f84140",
      },
    ],
    nextPage: [
      {
        title: "Google Custom Search - Timi bhane",
        totalResults: "721",
        searchTerms: "Timi bhane",
        count: 10,
        startIndex: 11,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "26742e10238f84140",
      },
    ],
  },
  context: {
    title: "nepalisongbook",
  },
  searchInformation: {
    searchTime: 0.247104,
    formattedSearchTime: "0.25",
    totalResults: "721",
    formattedTotalResults: "721",
  },
  items: [
    {
      kind: "customsearch#result",
      title: "Timi Bhane - Albatross | E-CHORDS",
      htmlTitle: "<b>Timi Bhane</b> - Albatross | E-CHORDS",
      link: "https://www.e-chords.com/chords/albatross/timi-bhane",
      displayLink: "www.e-chords.com",
      snippet:
        "Learn to play Timi Bhane by Albatross using chords and tabs, watching video lessons and much more.",
      htmlSnippet:
        "Learn to play <b>Timi Bhane</b> by Albatross using chords and tabs, watching video lessons and much more.",
      formattedUrl: "https://www.e-chords.com/chords/albatross/timi-bhane",
      htmlFormattedUrl:
        "https://www.e-chords.com/chords/albatross/<b>timi</b>-<b>bhane</b>",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNndt1FS_FosmkNN85-8x2jYl0DQ5Ps7Hn6kepf34AArhNBpavSmcASHYt&s",
            width: "310",
            height: "163",
          },
        ],
        metatags: [
          {
            "msapplication-tilecolor": "#09354f",
            "og:image": "https://www.e-chords.com/assets/img/cover.jpg",
            "og:type": "website",
            "twitter:card": "summary_large_image",
            "twitter:title": "Timi Bhane - Albatross",
            "theme-color": "#09354f",
            "og:site_name": "E-Chords.com",
            author: "Petaxxon.com.br",
            "og:description":
              "Learn to play Timi Bhane by Albatross using chords and tabs, watching video lessons and much more",
            "twitter:image": "https://www.e-chords.com/assets/img/cover.jpg",
            "fb:app_id": "551770354983506",
            "twitter:site": "@echords",
            "og:locale:alternate": "es",
            viewport: "width=device-width, initial-scale=1",
            "twitter:description":
              "Learn to play Timi Bhane by Albatross using chords and tabs, watching video lessons and much more",
            "csrf-token": "Z0rv4OBLIwHGyOYQU0RSlGL688h6BeUhODqOU556",
            "og:locale": "en",
            "og:url": "https://www.e-chords.com/chords/albatross/timi-bhane",
          },
        ],
        cse_image: [
          {
            src: "https://www.e-chords.com/assets/img/cover.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "TOP Albatross Chords for Guitar, Ukulele, Bass at Ultimate-Guitar",
      htmlTitle:
        "TOP Albatross Chords for Guitar, Ukulele, Bass at Ultimate-Guitar",
      link: "https://www.ultimate-guitar.com/artist/albatross_30279?sort=hits",
      displayLink: "www.ultimate-guitar.com",
      snippet:
        "May 2, 2025 ... Farki Farki Nahera Malailead Solo. 8. PRO · Nischal. 6. PRO · Afnai Sansar Ma Kina. CRD · Timi Bhane (ver 2).",
      htmlSnippet:
        "May 2, 2025 <b>...</b> <b>Farki Farki</b> Nahera Malailead Solo. 8. PRO &middot; Nischal. 6. PRO &middot; Afnai Sansar Ma Kina. CRD &middot; <b>Timi Bhane</b> (ver 2).",
      formattedUrl:
        "https://www.ultimate-guitar.com/artist/albatross_30279?sort=hits",
      htmlFormattedUrl:
        "https://www.ultimate-guitar.com/artist/albatross_30279?sort=hits",
      pagemap: {
        metatags: [
          {
            "application-name": "Ultimate Guitar",
            "theme-color": "#272727",
            viewport:
              "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
            "csrf-token":
              "4tCZIUrSC0GzuvbQR7PM2PMKmePapi4uESuIKe40tV6Elu15ILtOLPzfpo8kwP65uDr_iIrNeX1EHNpCoWX0Dg==",
            "mobile-web-app-capable": "yes",
            "og:url":
              "https://www.ultimate-guitar.com/artist/albatross_30279?sort=hits",
            "csrf-param": "_csrf",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Albatross Chords & Tabs for Guitar, Ukulele, Bass, Drums at ...",
      htmlTitle:
        "Albatross Chords &amp; Tabs for Guitar, Ukulele, Bass, Drums at ...",
      link: "https://www.ultimate-guitar.com/artist/albatross_30279",
      displayLink: "www.ultimate-guitar.com",
      snippet:
        "May 2, 2025 ... Timi Bhane (ver 2). 3. CRD · Timi Bhane Intro. TAB · Timi Bhane. TAB · Timi Bhane (ver 2). 3. TAB · Timi ...",
      htmlSnippet:
        "May 2, 2025 <b>...</b> <b>Timi Bhane</b> (ver 2). 3. CRD &middot; <b>Timi Bhane</b> Intro. TAB &middot; <b>Timi Bhane</b>. TAB &middot; <b>Timi Bhane</b> (ver 2). 3. TAB &middot; Timi&nbsp;...",
      formattedUrl: "https://www.ultimate-guitar.com/artist/albatross_30279",
      htmlFormattedUrl:
        "https://www.ultimate-guitar.com/artist/albatross_30279",
      pagemap: {
        metatags: [
          {
            "application-name": "Ultimate Guitar",
            "theme-color": "#272727",
            viewport:
              "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
            "csrf-token":
              "uvI_ZhKyfDAHJcOhJ9qcQ1Bmsercfmfi_0iVdLimKTf3nHdTS584dk5u8-ptr650PCfJ2JMsAaarItcYwvZqWw==",
            "mobile-web-app-capable": "yes",
            "og:url": "https://www.ultimate-guitar.com/artist/albatross_30279",
            "csrf-param": "_csrf",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Albatross chords at Ultimate-Guitar",
      htmlTitle: "Albatross chords at Ultimate-Guitar",
      link: "https://www.ultimate-guitar.com/artist/albatross_30279?filter=chords",
      displayLink: "www.ultimate-guitar.com",
      snippet:
        "May 2, 2025 ... Timi Bhane. 49. CRD · Timi Bhane (ver 2). 3. CRD. Trending stories. Faith No More Probably Won't Reunite, Keyboardist Roddy Bottum Admits: 'I ...",
      htmlSnippet:
        "May 2, 2025 <b>...</b> <b>Timi Bhane</b>. 49. CRD &middot; <b>Timi Bhane</b> (ver 2). 3. CRD. Trending stories. Faith No More Probably Won&#39;t Reunite, Keyboardist Roddy Bottum Admits: &#39;I&nbsp;...",
      formattedUrl:
        "https://www.ultimate-guitar.com/artist/albatross_30279?filter=chords",
      htmlFormattedUrl:
        "https://www.ultimate-guitar.com/artist/albatross_30279?filter=chords",
      pagemap: {
        metatags: [
          {
            "application-name": "Ultimate Guitar",
            "theme-color": "#272727",
            viewport:
              "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
            "csrf-token":
              "M0gFOPZDkQuUZV-vKqpu5QPHe_5m7-_v3yXNZL6YWP9EEEQKx3DmTfcKD-llxT6XSJRNi1XdvL6dcocPjq0HuA==",
            "mobile-web-app-capable": "yes",
            "og:url":
              "https://www.ultimate-guitar.com/artist/albatross_30279?filter=chords",
            "csrf-param": "_csrf",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Albatross - chords and tabs | E-CHORDS",
      htmlTitle: "Albatross - chords and tabs | E-CHORDS",
      link: "https://www.e-chords.com/albatross",
      displayLink: "www.e-chords.com",
      snippet:
        "Most accessed · 1 Timi Bhane · 2 Nischal · 3 Farki Farki Nahera Malai · 4 Alpabiram · 5 Afnai Sanar Ma Kina.",
      htmlSnippet:
        "Most accessed &middot; 1 <b>Timi Bhane</b> &middot; 2 Nischal &middot; 3 <b>Farki Farki</b> Nahera Malai &middot; 4 Alpabiram &middot; 5 Afnai Sanar Ma Kina.",
      formattedUrl: "https://www.e-chords.com/albatross",
      htmlFormattedUrl: "https://www.e-chords.com/albatross",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNndt1FS_FosmkNN85-8x2jYl0DQ5Ps7Hn6kepf34AArhNBpavSmcASHYt&s",
            width: "310",
            height: "163",
          },
        ],
        metatags: [
          {
            "msapplication-tilecolor": "#09354f",
            "og:image": "https://www.e-chords.com/assets/img/cover.jpg",
            "og:type": "website",
            "twitter:card": "summary_large_image",
            "twitter:title": "Albatross - chords and tabs",
            "theme-color": "#09354f",
            "og:site_name": "E-Chords.com",
            author: "Petaxxon.com.br",
            "og:description":
              "Albatross, chords, tabs and video lessons. Play all Albatross's songs on e-chords.com",
            "twitter:image": "https://www.e-chords.com/assets/img/cover.jpg",
            "fb:app_id": "551770354983506",
            "twitter:site": "@echords",
            "og:locale:alternate": "es",
            viewport: "width=device-width, initial-scale=1",
            "twitter:description":
              "Albatross, chords, tabs and video lessons. Play all Albatross's songs on e-chords.com",
            "csrf-token": "iq5nxKpifdcULIkfvKwgiiKpx7KjSOP2ynwBxfEq",
            "og:locale": "en",
            "og:url": "https://www.e-chords.com/albatross",
          },
        ],
        cse_image: [
          {
            src: "https://www.e-chords.com/assets/img/cover.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "Albatross Beginner Chords for Guitar, Ukulele, Bass at Ultimate-Guitar",
      htmlTitle:
        "Albatross Beginner Chords for Guitar, Ukulele, Bass at Ultimate-Guitar",
      link: "https://www.ultimate-guitar.com/artist/albatross_30279?difficulty[]=2",
      displayLink: "www.ultimate-guitar.com",
      snippet:
        "May 2, 2025 ... Timi Bhane. PRO · Timi Bhane (ver 2). 3. TAB. Trending stories. 'She Was Not a Rush Fan': Geddy Lee on the 'Daunting Task' in Front of Rush's ...",
      htmlSnippet:
        "May 2, 2025 <b>...</b> <b>Timi Bhane</b>. PRO &middot; <b>Timi Bhane</b> (ver 2). 3. TAB. Trending stories. &#39;She Was Not a Rush Fan&#39;: Geddy Lee on the &#39;Daunting Task&#39; in Front of Rush&#39;s&nbsp;...",
      formattedUrl:
        "https://www.ultimate-guitar.com/artist/albatross_30279?difficulty[]=2",
      htmlFormattedUrl:
        "https://www.ultimate-guitar.com/artist/albatross_30279?difficulty[]=2",
      pagemap: {
        metatags: [
          {
            "application-name": "Ultimate Guitar",
            "theme-color": "#272727",
            viewport:
              "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
            "csrf-token":
              "8oYf4AyuJRscZpysX2-AsOuDcD2V6vLxst9WYN_PQzmq53ChOsdiS18U2vsXLLKGs-Q8ROLYkJ-KsjUMqrVyUQ==",
            "mobile-web-app-capable": "yes",
            "og:url":
              "https://www.ultimate-guitar.com/artist/albatross_30279?difficulty%5B0%5D=2",
            "csrf-param": "_csrf",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "Farki Farki Naher Malai Chords & Lyrics by Albatross | Hamrochords ...",
      htmlTitle:
        "<b>Farki Farki</b> Naher Malai Chords &amp; Lyrics by Albatross | Hamrochords ...",
      link: "https://hamrochords.com/albatross/farki-farki-naher-malai",
      displayLink: "hamrochords.com",
      snippet: "Chords & Lyrics of Farki Farki Naher Malai by Albatross.",
      htmlSnippet:
        "Chords &amp; Lyrics of <b>Farki Farki</b> Naher Malai by Albatross.",
      formattedUrl: "https://hamrochords.com/albatross/farki-farki-naher-malai",
      htmlFormattedUrl:
        "https://hamrochords.com/albatross/farki-farki-naher-malai",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZEXyuAwD5UGzImBr3LcIcY_5mX_zw5A_tPYlXR84mI4dProBA7fMZwK0&s",
            width: "302",
            height: "167",
          },
        ],
        metatags: [
          {
            "msapplication-tilecolor": "#ffffff",
            "og:image":
              "https://hamrochords.com/images/artist-images/albatross-image-37397dd712d18dd68262dde9b9fdb4f51506a26d99.jpg",
            "theme-color": "#ffffff",
            "og:type": "article",
            author: "www.hamrochords.com",
            "og:title": "Farki Farki Naher Malai Chords & Lyrics by Albatross",
            "msapplication-tileimage": "/favicon/ms-icon-144x144.png",
            "og:description":
              "Chords & Lyrics of Farki Farki Naher Malai by Albatross",
            "fb:pages": "1588181988088130",
            "fb:app_id": "375744169173747",
            viewport: "width=device-width, initial-scale=1.0",
            "fb:use_automatic_ad_placement": "enable=true ad_density=default",
            "og:url":
              "https://hamrochords.com/albatross/farki-farki-naher-malai",
          },
        ],
        cse_image: [
          {
            src: "https://hamrochords.com/images/artist-images/albatross-image-37397dd712d18dd68262dde9b9fdb4f51506a26d99.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "timi feri aauna-तिमी फेरी आउन Chords, Lyrics & Guitar Tabs by Axix ...",
      htmlTitle:
        "<b>timi</b> feri aauna-तिमी फेरी आउन Chords, Lyrics &amp; Guitar Tabs by Axix ...",
      link: "https://hamrochords.com/axix/timi-feri-aauna",
      displayLink: "hamrochords.com",
      snippet:
        "Intro: parkhera basi raheko hunchhu ma timilai tehi talako tyo chiya pasalma tara timi bhane kahilyai aaudai nau bhetna sayad birsiyou ki kya ho hamra ti bacha",
      htmlSnippet:
        "Intro: parkhera basi raheko hunchhu ma timilai tehi talako tyo chiya pasalma tara <b>timi bhane</b> kahilyai aaudai nau bhetna sayad birsiyou ki kya ho hamra ti bacha",
      formattedUrl: "https://hamrochords.com/axix/timi-feri-aauna",
      htmlFormattedUrl: "https://hamrochords.com/axix/<b>timi</b>-feri-aauna",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg5e7u5zvHYj8bStkGt2cspqnljCDrzNOw6bVn-2OeYJPcijHp_L0RALpt&s",
            width: "318",
            height: "159",
          },
        ],
        metatags: [
          {
            "msapplication-tilecolor": "#ffffff",
            "og:image":
              "https://hamrochords.com/img/hamrochords-logo-large.png",
            "theme-color": "#ffffff",
            "og:type": "article",
            author: "www.hamrochords.com",
            "og:title":
              "timi feri aauna-तिमी फेरी आउन Chords, Lyrics & Guitar Tabs  by Axix",
            "msapplication-tileimage": "/favicon/ms-icon-144x144.png",
            "og:description":
              "Chords, Lyrics & Guitar tab of timi feri aauna-तिमी फेरी आउन by Axix",
            "fb:pages": "1588181988088130",
            "fb:app_id": "375744169173747",
            viewport: "width=device-width, initial-scale=1.0",
            "fb:use_automatic_ad_placement": "enable=true ad_density=default",
            "og:url": "https://hamrochords.com/axix/timi-feri-aauna",
          },
        ],
        cse_image: [
          {
            src: "https://hamrochords.com/img/hamrochords-logo-large.png",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Timi Ek Phool Hau Bhane Chords & Lyrics by Narayan Gopal ...",
      htmlTitle:
        "<b>Timi</b> Ek Phool Hau <b>Bhane</b> Chords &amp; Lyrics by Narayan Gopal ...",
      link: "https://hamrochords.com/narayan-gopal/timi-ek-phool-hau-bhane",
      displayLink: "hamrochords.com",
      snippet:
        "Rhythm : Root Chord : Download PDF. Intro: Timi Aka Phool Hau Bhane Ma Gulaphako Paraga Dui Begla Beglai Gatika Maan Madhura Raga",
      htmlSnippet:
        "Rhythm : Root Chord : Download PDF. Intro: <b>Timi</b> Aka Phool Hau <b>Bhane</b> Ma Gulaphako Paraga Dui Begla Beglai Gatika Maan Madhura Raga",
      formattedUrl:
        "https://hamrochords.com/narayan-gopal/timi-ek-phool-hau-bhane",
      htmlFormattedUrl:
        "https://hamrochords.com/narayan-gopal/<b>timi</b>-ek-phool-hau-<b>bhane</b>",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjwIIPqp3AvMfyJxvy4L6mAANohjn_y6wzdVbuhZgUBTy60ABfeKLdr10&s",
            width: "259",
            height: "194",
          },
        ],
        metatags: [
          {
            "msapplication-tilecolor": "#ffffff",
            "og:image":
              "https://hamrochords.com/images/artist-images/narayan-gopal-image-12b844f5644d145ac1f4269316a4d29a8b37c8a630.jpg",
            "theme-color": "#ffffff",
            "og:type": "article",
            author: "www.hamrochords.com",
            "og:title":
              "Timi Ek Phool Hau Bhane Chords & Lyrics by Narayan Gopal",
            "msapplication-tileimage": "/favicon/ms-icon-144x144.png",
            "og:description":
              "Chords & Lyrics of Timi Ek Phool Hau Bhane by Narayan Gopal",
            "fb:pages": "1588181988088130",
            "fb:app_id": "375744169173747",
            viewport: "width=device-width, initial-scale=1.0",
            "fb:use_automatic_ad_placement": "enable=true ad_density=default",
            "og:url":
              "https://hamrochords.com/narayan-gopal/timi-ek-phool-hau-bhane",
          },
        ],
        cse_image: [
          {
            src: "https://hamrochords.com/images/artist-images/narayan-gopal-image-12b844f5644d145ac1f4269316a4d29a8b37c8a630.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Artist: Albatross",
      htmlTitle: "Artist: Albatross",
      link: "https://hamrochords.com/download/pdf/?song=farki-farki-naher-malai",
      displayLink: "hamrochords.com",
      snippet:
        "A. Farki Farki Naher Malai. B.........A. Timi Vane....... © hamrochords.com.",
      htmlSnippet:
        "A. <b>Farki Farki</b> Naher Malai. B.........A. Timi Vane....... © hamrochords.com.",
      formattedUrl:
        "https://hamrochords.com/download/pdf/?song=farki-farki-naher-malai",
      htmlFormattedUrl:
        "https://hamrochords.com/download/pdf/?song=farki-farki-naher-malai",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp2xSma3b0kGObrCOUCitUZBIstOBPEatfLNojNbkb4abO4KKRG6A1r7hR&s",
            width: "189",
            height: "267",
          },
        ],
        metatags: [
          {
            moddate: "D:20250730050512+05'45'",
            creationdate: "D:20250730050512+05'45'",
            producer: "dompdf 1.2.2 + CPDF",
          },
        ],
        cse_image: [
          {
            src: "x-raw-image:///e04ec70ebc4531b74e3dd5b75e0cff70537737493f732ae5c63b0ce64c7a7eef",
          },
        ],
      },
      mime: "application/pdf",
      fileFormat: "PDF/Adobe Acrobat",
    },
  ],
};

// Client-side search. If Google CSE env is provided and sites are configured,
// perform one query per site and return the top result from each (max 1/site).
// Otherwise, fall back to the local stub.
export async function searchOnline(query: string): Promise<SearchResult[]> {
  debugger;
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
    // const url =
    //   "https://www.googleapis.com/customsearch/v1" +
    //   `?q=${encodeURIComponent(q)}` +
    //   `&key=${encodeURIComponent(GOOGLE_CSE.key)}` +
    //   `&cx=${encodeURIComponent(GOOGLE_CSE.cx)}` +
    //   `&num=10`;
    // const res = await fetch(url);
    // if (!res.ok) return results;
    // const data: any = await res.json();
    const data: any = DUMMY_RESPONSE_DATA;
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
