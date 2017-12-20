var musicFiles = [];
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audio;
var audioSrc;
var analyser;
var bufferLength;
var dataArray; // frequency data

function selectMusic(e) {
  musicFiles = e.target.files;
  var num = Math.floor(Math.random() * musicFiles.length);
  var musicFile = URL.createObjectURL(musicFiles[num]);
  $("#music").attr("src", musicFile);
}

function getFreq() {
  requestAnimationFrame(getFreq);
  analyser.getByteFrequencyData(dataArray);
}

function play() {

  if((document.getElementById('music').paused)){

    document.getElementById('music').play();

    if (!audio) {
      audio = document.getElementById('music');
      audio.crossOrigin = "anonymous";
      audioSrc = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      audioSrc.connect(analyser);
      audioSrc.connect(audioCtx.destination);
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
    }
  }

}

function stop() {
  document.getElementById('music').pause();
  var num = Math.floor(Math.random() * musicFiles.length);
  var musicFile = URL.createObjectURL(musicFiles[num]);
  $("#music").attr("src", musicFile);
}

function pause(){
  document.getElementById('music').pause();
}

window.onload = function (e) {
  document.getElementById('music-files').addEventListener('change', selectMusic, false);
  
}
