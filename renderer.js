// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const desktopCapturer = require('electron').desktopCapturer

let video = document.getElementById('display')
let mediaSources = null;

desktopCapturer.getSources({types: [ 'screen', 'window']}, (err, sources) => {
  mediaSources = sources
  console.log(mediaSources)
  /* 
  sources.forEach(souce => {
    source.id
    source.name
    source.thumbnail
  })
  */
});

navigator.mediaDevices.getUserMedia({
  video: {
    mandatory: {
      chromeMediaSource: 'desktop',
      // chromeMediaSourceId: mediaSources[0].id,
      // minWidth: 1280,
      // maxWidth: 1920,
      minHeight: 1080,
      // maxHeight: 1080
    }
  },
  audio: {
    mandatory: {
      chromeMediaSource: 'desktop'
    }
  },
}).then(stream => {
  video.srcObject = stream;
}).catch(err => {
  // error
});