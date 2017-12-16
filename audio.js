var musicFiles = [];
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audio;
var audioSrc;
var analyser;
var bufferLength;
var dataArray; // frequency data
var state = 2; //0 for playing, 1 for paused, 2 for stopped

function selectMusic(e) {
  musicFiles = e.target.files;
}

function getFreq() {
  requestAnimationFrame(getFreq);
  analyser.getByteFrequencyData(dataArray);
}

function play() {

  if(state != 0){
    var num = Math.floor(Math.random() * musicFiles.length);
    var musicFile = URL.createObjectURL(musicFiles[num]);
    $("#music").attr("src", musicFile);
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
    state = 0;
  }

}

function stop() {
  document.getElementById('music').pause();
  state = 2;
}

function pause(){
  document.getElementById('music').pause();
  state = 1;
}

window.onload = function (e) {
  document.getElementById('music-files').addEventListener('change', selectMusic, false);
}
