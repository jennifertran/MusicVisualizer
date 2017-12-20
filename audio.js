var musicFiles = [];
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audio;
var audioSrc;
var analyser;
var bufferLength;
var dataArray; // frequency data
var audioBuffer;
var defaultMusic = true; //used to tell if we are currently running default music or not

function selectMusic(e) {
  audio = null;
  musicFiles = e.target.files;
  var num = Math.floor(Math.random() * musicFiles.length);
  var musicFile = URL.createObjectURL(musicFiles[num]);
  $("#music").attr("src", musicFile);
  defaultMusic = false;
}

function getFreq() {
  requestAnimationFrame(getFreq);
  analyser.getByteFrequencyData(dataArray);
}

function play() {

  if((document.getElementById('music').paused && !defaultMusic && document.getElementById('autoplay').paused)){

    document.getElementById('music').play();

    if (!audio) {
      audio = document.getElementById('music');
      audio.crossOrigin = "anonymous";
      audioSrc = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      audioBuffer = audioCtx.createBufferSource();
      analyser.fftSize = 256;
      audioSrc.connect(analyser);
      audioSrc.connect(audioCtx.destination);
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
    }
  }
  else if(audio && defaultMusic && document.getElementById('music').paused && document.getElementById('autoplay').paused){
    document.getElementById('autoplay').play();
  }

}

function stop() {
  if(!defaultMusic)
    document.getElementById('music').pause();
  else
    document.getElementById('autoplay').pause();

  audio.currentTime = 0;
}

function pause(){
  if(!defaultMusic)
    document.getElementById('music').pause();
  else
    document.getElementById('autoplay').pause();
}

function playDefault(){

  if(!audio){
    audio = document.getElementById('autoplay');
    audio.crossOrigin = "anonymous";
    audioSrc = audioCtx.createMediaElementSource(document.getElementById('autoplay'));
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    defaultMusic = true;
  }
}

window.onload = function (e) {
  document.getElementById('music-files').addEventListener('change', selectMusic, false);

}
