# WebRTC Nullifier

A dual-layer privacy shield that blocks WebRTC from leaking your local IP address at the browser's network-stack level. Zero data collection, zero telemetry, zero external servers.

- **Version:** 1.1.0
- **License:** MIT (see [LICENSE](LICENSE))
- **Author:** skuscribe — [github.com/skuscribe](https://github.com/skuscribe) · [skuscribe@tuta.io](mailto:skuscribe@tuta.io)

---

## Install

**Firefox (recommended):** install from Firefox Add-ons (AMO) →
[addons.mozilla.org/firefox/addon/webrtc-nullifier](https://addons.mozilla.org/en-US/firefox/addon/webrtc-nullifier/)

**Load unpacked (any browser, for development):**
1. Clone or download this repository.
2. Open your browser's extensions page:
   - Chromium (Chrome/Edge/Brave/Vivaldi/Opera): `chrome://extensions/`
   - Firefox: `about:debugging#/runtime/this-firefox`
3. Enable **Developer mode** (Chromium) or use **Load Temporary Add-on** (Firefox).
4. Point it at the **`src/`** folder — that folder *is* the extension. Load `src/manifest.json` on Firefox, or "Load unpacked" → select `src/` on Chromium.

To produce a store-ready package, zip the **contents** of `src/` (not the folder itself). See [CONTRIBUTING.md](CONTRIBUTING.md#building-a-release).

---

## How it works

### 1. The network stack (the "kitchen")
Using the official `chrome.privacy` / `browser.privacy` APIs, the extension tells the browser's network engine to stop exposing local network interfaces. This is what actually guarantees **zero IP leaks**.

### 2. The JavaScript layer (the "menu")
A content script attempts to hide the WebRTC constructors (`RTCPeerConnection` and friends) from page scripts. On engines where these properties are configurable, this removes the API surface; where they are not (see below), it is a harmless best-effort layer. The real guarantee always comes from layer 1.

---

## Radical transparency: "menu vs. kitchen"

If you test this extension on a site like [browserleaks.com](https://browserleaks.com), you may still see:

- `RTCPeerConnection: True` (or `function`)
- `WebRTC Leak Test: ✔ No Leak`
- `Local IP Address: -`

**This is the expected, correct, and secure outcome.** Modern Chromium (V8) hard-codes native constructors like `RTCPeerConnection` as *non-configurable* — a browser-level security feature. It is effectively impossible for any JavaScript extension to turn `typeof RTCPeerConnection` into `undefined` without modifying the browser's C++ source and compiling a custom build.

Any extension claiming to make the API report "False" on modern Chrome is over-promising. WebRTC Nullifier does not: the value that matters for your privacy is that the **actual network leak is blocked** (proven by the "No Leak" result). The `True` label is a read-only detection artifact left by the browser.

---

## Important: effect on video/voice calls

The two engines enforce privacy differently, and the trade-off is different on each:

- **Chromium (Chrome, Edge, Brave, etc.):** WebRTC keeps working. Calls are routed through relay (TURN) servers instead of direct peer connections, so your local IP is never exposed — Google Meet, Zoom Web, Discord, etc. continue to function.
- **Firefox / Gecko:** the extension fully disables the WebRTC API (`media.peerconnection.enabled = false`). This is the strongest possible guarantee against leaks, but it also means **browser-based WebRTC calling will not work at all** while the extension is enabled. If you need to place a call in Firefox, disable the extension first.

This is disclosed in the popup and the store listing so there are no surprises.

---

## Cross-browser compatibility

- **Chromium:** Chrome, Edge, Yandex, Brave, Helium, Opera, Vivaldi
- **Gecko:** Firefox, LibreWolf, Waterfox, Tor Browser

---

## Project structure

```
webrtc-nullifier/
├── src/                     # The extension (this folder is what ships to the stores)
│   ├── manifest.json        # MV3, v1.1.0
│   ├── background.js        # Network-stack policy (the "kitchen")
│   ├── inject.js            # Best-effort API hider (the "menu")
│   ├── popup.html / .css    # Toolbar popup
│   ├── _locales/            # en, es
│   │   ├── en/messages.json
│   │   └── es/messages.json
│   └── icons/               # logo.svg + 16/32/48/128 PNG
├── docs/                    # Supporting material (not shipped in the add-on)
│   ├── compliance-and-store-listings.txt
│   └── screenshots/
├── index.html               # Landing page (GitHub Pages friendly)
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── COPYRIGHT
```

---

## Privacy

WebRTC Nullifier collects **zero** user data. No analytics, no tracking pixels, no cookies, no external telemetry. Every operation happens locally in your browser. The only permission it requests is the native `privacy` API. See [docs/compliance-and-store-listings.txt](docs/compliance-and-store-listings.txt) for the full compliance notes.

---

## Contributing

Issues and pull requests are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first — the short version is: standard ES6+ JavaScript, no telemetry or analytics, and keep the "radical transparency" philosophy intact.

## License

Released under the MIT License. Copyright © 2026 skuscribe. See [LICENSE](LICENSE) and [COPYRIGHT](COPYRIGHT).
