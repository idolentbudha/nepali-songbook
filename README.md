# Digital SongBook App (Phase 1 MVP)

A simple, cross-platform mobile application built with **Expo and React Native** to help musicians quickly access and organize song lyrics with chords.

## 📈 User-Assisted Data Augmentation (Smart Cache)

This app can grow its library on-demand via a "user-assisted smart cache" model. When a user searches for a song that isn’t in the local database, the app can consult approved online sources, let the user pick a result, show a preview, and (if licensed) import it into the shared catalog, or otherwise store it locally on-device only.

Below are the key challenges we agree to track, with recommended mitigations. We’ll use the checklist to mark progress over time.

### I. Technical & Anti-Scraping Challenges (Backend)

| #   | Challenge                        | Description & Impact                                                           | Mitigation Strategy                                                                                  |
| --- | -------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| 1   | Dynamic Content & JavaScript     | Many sites render lyrics/chords client-side; raw HTML may not contain content. | Use a headless browser (Playwright/Puppeteer) to fully render before extraction.                     |
| 2   | Anti-Bot Detection (IP Blocking) | Repeated requests from one IP get flagged; bans possible.                      | Use a reputable rotating proxy; randomize fingerprints; respect robots/ToS and rate limits.          |
| 3   | Website Structure Changes        | Minor DOM/CSS changes break brittle scrapers.                                  | Build resilient adapters with multiple selectors, change detection, and automated health checks.     |
| 4   | Rate Limiting & CAPTCHAs         | Throttling and CAPTCHAs can block scrapes.                                     | Exponential backoff, graceful failure, surface “Source unavailable” to user; avoid CAPTCHA-breaking. |

### II. Data & Operational Challenges (Quality & Standardization)

| #   | Challenge                           | Description & Impact                                      | Mitigation Strategy                                                                              |
| --- | ----------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 5   | Data Inconsistency (Chord Notation) | Variations like Am7 vs “A minor 7”; inconsistent formats. | Standardization pipeline: map/normalize to a canonical chord set; reject/flag unparseable input. |
| 6   | Chord/Lyric Alignment               | White-space and format differences break alignment.       | User confirmation/edit screen; or quick admin pass on first lines before publishing.             |
| 7   | Duplicate Entries                   | Variants like “Song (Live)” vs “Song”.                    | Fuzzy matching (e.g., Levenshtein) to warn/merge before triggering expensive scrape.             |
| 8   | Moderation Overhead                 | Many user imports need review.                            | UNVERIFIED/VERIFIED flags; show only VERIFIED broadly; schedule weekly moderation.               |

### III. Legal & Intellectual Property Challenges (Highest Risk)

| #   | Challenge                        | Description & Impact                                                          | Mitigation Strategy                                                                                                            |
| --- | -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 9   | Copyright Infringement (Lyrics)  | Lyrics are copyrighted; storing/distributing without license risks liability. | Prefer chords-only or user-owned content for shared catalog; obtain licenses if storing lyrics server-side; get legal counsel. |
| 10  | Terms of Service (ToS) Violation | Most sites forbid scraping; backend can violate ToS even if user-triggered.   | Use only public, permitted sources; whitelist/licensing; exclude hostile sources; respect robots/ToS.                          |

### ✅ Tracking Checklist

- [ ] Design headless rendering adapter (Playwright) with timeouts and size limits.
- [ ] Add rotating proxy integration and request fingerprint randomization.
- [ ] Implement adapter health checks and change alerts per source.
- [ ] Add exponential backoff and user-facing “Source unavailable” messaging.
- [ ] Build chord normalization pipeline (map to canonical notation; tests).
- [ ] Implement alignment review UI in import preview (user/admin).
- [ ] Add fuzzy duplicate detection before scrape (title/artist/lines hash).
- [ ] Introduce moderation workflow (UNVERIFIED → VERIFIED).
- [ ] Define legal posture: chords-only vs licensed lyrics; obtain counsel and, if needed, licensing.
- [ ] Maintain a whitelist of permitted sources and enforce ToS/robots compliance.

## 🌟 Phase 1 Core Features (MVP)

The primary goal of this initial phase is to establish the core song display and personal organization features:

1.  **Song List:** A complete, scrollable list of all songs in the library.
2.  **Filter by Artist:** Easily filter the main list to show songs only by a selected artist.
3.  **Chord Display:** Display chords clearly formatted **above** the corresponding lyrics for easy reading while playing.
4.  **Favorites Section:** Users can mark songs as favorites for quick access in a dedicated, separate view.

## 🛠️ Technology Stack

| Component            | Technology                | Purpose                                             |
| :------------------- | :------------------------ | :-------------------------------------------------- |
| **Framework**        | Expo & React Native       | Cross-platform mobile development (iOS & Android).  |
| **Language**         | JavaScript/TypeScript     | Core application logic.                             |
| **Navigation**       | React Navigation          | Handling screen routing (Home, Details, Favorites). |
| **Data Persistence** | AsyncStorage (or similar) | Storing the user's favorite songs list state.       |

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

You must have **Node.js**, **npm/yarn**, and the **Expo CLI** installed on your machine.

````bash
npm install -g expo-cli
```

# # Welcome to your Expo app 👋

# This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

# ## Get started

# 1. Install dependencies

#    ```bash
#    npm install
#    ```

# 2. Start the app

#    ```bash
#    npx expo start
#    ```

# In the output, you'll find options to open the app in a

# - [development build](https://docs.expo.dev/develop/development-builds/introduction/)
# - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
# - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
# - [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

# You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

# ## Get a fresh project

# When you're ready, run:

# ```bash
# npm run reset-project
# ```

# This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

# ## Learn more

# To learn more about developing your project with Expo, look at the following resources:

# - [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
# - [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

# ## Join the community

# Join our community of developers creating universal apps.

# - [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
# - [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

````
