# Changelog

All notable changes to WebRTC Nullifier are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

> Release dates below marked `YYYY-MM-DD` are placeholders — fill in the actual dates,
> and early pre-1.1 history is summarized approximately.

## [1.1.0] — YYYY-MM-DD

The published, always-on release.

### Changed
- Reverted to an **always-on architecture**: protection is applied unconditionally on
  install and on startup. (Removed the enable/disable toggle that was trialled in 1.0.3.)
- Split policy application into separate, independently-guarded `try/catch` blocks for
  the Chromium and Gecko code paths.
- Raised Firefox `strict_min_version` to `128.0`.

### Added
- Raster icons at **16/32/48/128 px**; the manifest and popup now reference PNG icons
  (the SVG is retained as the source asset).
- Proper localization layout under `_locales/en/` and `_locales/es/`.
- `browser_specific_settings.gecko.data_collection_permissions` set to `none`.
- `gecko_android` entry so the add-on installs on Firefox for Android.
- `background.scripts` fallback alongside `service_worker` for Firefox MV3 event pages.
- `author` metadata in the manifest.
- Explanatory comments in `background.js` and `inject.js`, plus a popup note and a README
  section documenting that WebRTC calling is fully disabled on Firefox while active.

### Fixed
- English locale description previously contained Spanish text; corrected.
- Icon references previously pointed at a path that did not resolve; icons now load
  reliably across browsers.

## [1.0.3] — YYYY-MM-DD

### Added
- Popup enable/disable toggle (later reverted in 1.1.0 in favour of always-on behaviour).

### Fixed
- Firefox `strict_min_version` compatibility adjustments.

## [1.0.1] — YYYY-MM-DD

### Added
- Initial public release: dual-layer design combining a network-stack privacy policy
  (`webRTCIPHandlingPolicy` / `peerConnectionEnabled`) with best-effort API hiding,
  built on Manifest V3.
