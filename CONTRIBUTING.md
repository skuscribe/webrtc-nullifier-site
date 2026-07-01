# Contributing to WebRTC Nullifier

Thanks for your interest in improving WebRTC Nullifier. This is a small, deliberately minimal privacy extension — contributions that keep it that way are the most welcome.

## Ground rules

- Use standard JavaScript (ES6+). No build step, no framework, no bundler.
- **No telemetry, analytics, tracking, cookies, or external network calls.** Ever.
- Preserve the "radical transparency" philosophy: never claim a guarantee the browser can't actually deliver (see the README's "menu vs. kitchen" section).
- Keep the permission surface minimal. Today the extension requests only the native `privacy` API — adding a permission needs a very good reason.

## Repository layout

- `src/` — the extension itself. **This folder is what gets packaged for the stores.**
- `docs/` — store-listing text, compliance notes, and screenshots. Not shipped in the add-on.
- `index.html` — the landing page (served via GitHub Pages).

## Development workflow

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-change`.
3. Make your change inside `src/` (or `docs/` / root for non-code changes).
4. Load the unpacked extension to test:
   - **Firefox:** `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on** → select `src/manifest.json`.
   - **Chromium:** `chrome://extensions/` → enable **Developer mode** → **Load unpacked** → select the `src/` folder.
5. Verify against [browserleaks.com](https://browserleaks.com): the **WebRTC Leak Test** should report **No Leak** and **Local IP Address** should be empty. (Remember: `RTCPeerConnection: True` on Chromium is expected — see the README.)
6. Commit (`git commit -m "Describe your change"`), push, and open a Pull Request.

## Building a release

The `src/` directory is the extension. A store package is simply a zip of the **contents** of `src/` — the `manifest.json` must sit at the root of the zip, not inside a `src/` folder.

```bash
cd src
zip -r -X ../webrtc-nullifier-<version>.zip . -x '.*'
```

Or, using Mozilla's official tooling (recommended for Firefox, also runs the same validation AMO uses):

```bash
# from the repo root
npx web-ext build --source-dir src --artifacts-dir web-ext-artifacts
npx web-ext lint  --source-dir src
```

Packaged zips/xpi files are git-ignored on purpose — attach them to a GitHub Release rather than committing them.

## Versioning

This project follows semantic versioning. When you bump the version, update it in **both** `src/manifest.json` and `CHANGELOG.md` in the same commit.
