// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const desktopCapturer = require('electron').desktopCapturer
global.localPeer
global.remotePeer

desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sources[0].id,
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720
        }
      }
    })
    handleStream(stream)
  } catch (e) {
    handleError(e)
  }
  return
})

function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
  createPeerConnection(stream)
}

function createPeerConnection(stream) {
  localPeer = new RTCPeerConnection()
  localPeer.addStream(stream)
  localPeer.createOffer(
    (success) => {
      localPeer.setLocalDescription(success, () => { console.log(success) }, handleError )
    }, (fail) => {
      handleError(fail)
    }, { offerToReceiveAudio: 1, offerToReceiveVideo: 1} )
}


function handleError (e) {
  console.log(e)
}

