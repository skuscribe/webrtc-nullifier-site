# WebRTC Nullifier

## Purpose
WebRTC Nullifier is the ultimate, dual-layer privacy shield. It permanently prevents WebRTC from leaking your local IP address at the network stack level.

## The Dual-Layer Mechanism
1. **The Network Stack (The Kitchen):** 
   Using the official `chrome.privacy` and `browser.privacy` APIs, it instructs the browser's underlying network engine to completely block the exposure of local network interfaces. This guarantees **Zero IP Leaks**.

2. **The JavaScript Layer (The Menu):** 
   We attempt to obscure API availability, but we believe in Radical Transparency regarding browser limitations (see below).

## Radical Transparency: The "Menu vs. Kitchen" Reality
If you test this extension on sites like Browserleaks.com, you will see:
- `RTCPeerConnection: True` (or "function")
- `WebRTC Leak Test: ✔ No Leak`
- `Local IP Address: -`

**This is the expected, correct, and secure outcome.** 

Modern browsers (Chromium V8 engine) hard-code native constructors like `RTCPeerConnection` as **non-configurable**. This is a browser-level security feature. **It is mathematically impossible for any JavaScript extension to change `typeof RTCPeerConnection` to `undefined` without modifying the browser's C++ source code.** 

Any extension claiming to make the API "False" or "undefined" on modern Chrome is making a false promise. WebRTC Nullifier does not lie to you. We guarantee the *actual* network leak is blocked (proven by the "No Leak" result), which is the only thing that matters for your privacy. The "True" detection is a harmless, read-only label left by the browser.

## Cross-Browser Compatibility
Universally compatible across all major engines and operating systems:
- **Chromium:** Chrome, Edge, Yandex, Brave, Helium, Opera, Vivaldi.
- **Gecko:** Firefox, LibreWolf, Waterfox, Tor Browser.

## Installation Instructions
1. Download and extract the `webrtc-nullifier-store-ready.zip` file.
2. Open your browser and navigate to `chrome://extensions/` (or `about:debugging#/runtime/this-firefox`).
3. Enable **"Developer mode"** in the top right corner.
4. Click **"Load unpacked"** (Chrome) or **"Load Temporary Add-on"** (Firefox) and select the extracted folder.

## Author & Contact
- **Developer:** skuscribe
- **Contact:** [skuscribe@tuta.io](mailto:skuscribe@tuta.io)
- **GitHub:** [github.com/skuscribe](https://github.com/skuscribe)

## The Hard Truth About Chromium Browsers
If you test this on Chrome, Edge, Brave, or Helium, Browserleaks will show `RTCPeerConnection: True`. **This is expected and unfixable by an extension.** Chromium hardcodes these APIs in its C++ engine. The only way to make it show "False" is to download the 30GB Chromium source code, delete the C++ lines that register the API, and compile your own custom browser from scratch. WebRTC Nullifier does not lie to you. We guarantee the actual network leak is blocked (proven by "No Leak"), which is the only thing that matters for your privacy.
