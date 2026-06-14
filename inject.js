// Universal WebRTC API Hider
(function() {
  try {
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
    console.info("WebRTC Nullifier: API hiding script executed.");
  } catch (error) {
    console.error("WebRTC Nullifier: Failed to hide APIs.", error);
  }
})();
