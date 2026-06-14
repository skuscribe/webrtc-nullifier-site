// Universal WebRTC Network Kill Switch
const applyPolicy = () => {
  try {
    if (typeof chrome !== 'undefined' && chrome.privacy && chrome.privacy.network && chrome.privacy.network.webRTCIPHandlingPolicy) {
      chrome.privacy.network.webRTCIPHandlingPolicy.set({ value: 'disable_non_proxied_udp' });
      console.info("WebRTC Nullifier: Chromium policy applied successfully.");
    }
    if (typeof browser !== 'undefined' && browser.privacy && browser.privacy.network && browser.privacy.network.peerConnectionEnabled) {
      browser.privacy.network.peerConnectionEnabled.set({ value: false });
      console.info("WebRTC Nullifier: Firefox policy applied successfully.");
    }
  } catch (error) {
    console.error("WebRTC Nullifier: Failed to apply privacy policy.", error);
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
