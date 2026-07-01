// WebRTC API Hider
// NOTE: On modern Chromium, RTCPeerConnection and friends are non-configurable
// native constructors, so this will not actually make `typeof RTCPeerConnection`
// become "undefined" (see README "Menu vs. Kitchen" section). The real privacy
// guarantee comes from background.js. This script still helps on engines/sites
// where the property IS configurable.
(function() {
  const apis = ['RTCPeerConnection', 'webkitRTCPeerConnection', 'RTCDataChannel', 'RTCSessionDescription', 'RTCIceCandidate'];
  apis.forEach(api => {
    try {
      Object.defineProperty(window, api, {
        value: undefined,
        writable: false,
        configurable: false
      });
    } catch (e) {
      try { window[api] = undefined; } catch (err) {}
    }
  });
})();
