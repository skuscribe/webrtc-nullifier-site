// WebRTC Network Privacy Switch
//
// NOTE ON CROSS-BROWSER BEHAVIOR (please read before changing):
// - Chromium (Chrome/Edge/Brave/etc.): 'disable_non_proxied_udp' restricts ICE
//   candidate gathering so the local IP is never exposed. WebRTC itself still
//   works (it falls back to relayed/TURN candidates), so video/voice chat
//   sites continue to function with no IP leak.
// - Firefox/Gecko: peerConnectionEnabled=false fully disables the WebRTC API
//   (media.peerconnection.enabled). This guarantees zero leakage but also
//   means WebRTC-based calling (Meet, Zoom web, Discord, WhatsApp Web, etc.)
//   will NOT work at all on Firefox while this extension is active. This is
//   disclosed to users in the popup and store listing.
const applyPolicy = () => {
  try {
    if (
      typeof chrome !== 'undefined' &&
      chrome.privacy &&
      chrome.privacy.network &&
      chrome.privacy.network.webRTCIPHandlingPolicy
    ) {
      chrome.privacy.network.webRTCIPHandlingPolicy.set({ value: 'disable_non_proxied_udp' });
    }
  } catch (e) {
    console.error('WebRTC Nullifier: failed to set Chrome WebRTC IP handling policy', e);
  }

  try {
    if (
      typeof browser !== 'undefined' &&
      browser.privacy &&
      browser.privacy.network &&
      browser.privacy.network.peerConnectionEnabled
    ) {
      browser.privacy.network.peerConnectionEnabled.set({ value: false });
    }
  } catch (e) {
    console.error('WebRTC Nullifier: failed to set Firefox peerConnectionEnabled policy', e);
  }
};

if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onInstalled.addListener(applyPolicy);
  chrome.runtime.onStartup.addListener(applyPolicy);
}
if (typeof browser !== 'undefined' && browser.runtime) {
  browser.runtime.onInstalled.addListener(applyPolicy);
  browser.runtime.onStartup.addListener(applyPolicy);
}
