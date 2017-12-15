var musicFiles = [];
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audio;
var audioSrc;
var analyser;
var bufferLength;
var dataArray; // frequency data

var camera, scene, renderer;
var cameraControls;

var clock = new THREE.Clock();

function selectMusic(e) {
  musicFiles = e.target.files;
}

function getFreq(){
  requestAnimationFrame(getFreq);
  analyser.getByteFrequencyData(dataArray);
}

function play(){
  var num = Math.floor(Math.random()*musicFiles.length);
  var musicFile = URL.createObjectURL(musicFiles[num]);
  $("#music").attr("src", musicFile);
  document.getElementById('music').play();

  audio = document.getElementById('music');
  audioSrc = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  getFreq();

}

function stop(){
  document.getElementById('music').pause();
}

function fillScene() {
  scene = new THREE.Scene();

  var light = new THREE.HemisphereLight(0x9b9da0, 0x080820, 0.2);
  scene.add(light);

  var ambient = new THREE.AmbientLight(0x1c1d1e, 0.1);
  scene.add(ambient);


  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 100, 100, 50 );
  light.castShadow = true;
  var dLight = 200;
  var sLight = dLight * 0.25;
  light.shadow.camera.left = -sLight;
  light.shadow.camera.right = sLight;
  light.shadow.camera.top = sLight;
  light.shadow.camera.bottom = -sLight;
  light.shadow.camera.near = dLight / 30;
  light.shadow.camera.far = dLight;
  light.shadow.mapSize.x = 1024 * 2;
  light.shadow.mapSize.y = 1024 * 2;
  scene.add(light);


  //Visualize the Axes - Useful for debugging, can turn this off if desired
  var axes = new THREE.AxisHelper(1500);
  scene.add(axes);

  startVisuals();

}

function createObjectMaterial() {
  var c = Math.floor( Math.random() * ( 1 << 24 ) );
  return new THREE.MeshPhongMaterial( { color: c } );
}

var cube, material;

var maxCubes = 20;

function startVisuals(){

  for(var i = 0; i < maxCubes; i++)
  {
    cube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), createObjectMaterial());
    cube.position.y = 25;
    cube.position.x = -1000 + i*100;
    cube.name = 'cube' + i;
    scene.add(cube);
  }

}

// Initialization

function init() {
  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;
  var canvasRatio = canvasWidth / canvasHeight;

  // Set up a renderer. This will allow WebGL to make your scene appear
  renderer = new THREE.WebGLRenderer({antialias: true});

  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.setSize(canvasWidth, canvasHeight);

  renderer.setClearColor(0xAAAAAA, 1.0);

  // Camera
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.2, 2000 );
  cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 800, 700);
  // cameraControls.target.set(4, 301, 92);
}

// Auto resizes the screen
function onWindowResize() {
  camera.aspect = (window.innerWidth)/(window.innerHeight);
  camera.updateProjectionMatrix();
  renderer.setSize((window.innerWidth), (window.innerHeight));
}

// We want our document object model (a javascript / HTML construct) to include our canvas
// These allow for easy integration of webGL and HTML
function addToDOM() {
  var canvas = document.getElementById('canvas');
  canvas.appendChild(renderer.domElement);
}

// This is a browser callback for repainting
// Since you might change view, or move things
// We cant to update what appears
function animate() {
  window.requestAnimationFrame(animate);
  if(analyser){
    getFreq();

    for(var i = 0; i < maxCubes; i++) {
      var meter = scene.getObjectByName('cube' + i, true);
      meter.scale.y = (dataArray[i] / 25);
      meter.position.y =  (dataArray[i]);
    }

  }
  render();

}

// getDelta comes from THREE.js - this tells how much time passed since this was last called
// This might be useful if time is needed to make things appear smooth, in any animation, or calculation
// The following function stores this, and also renders the scene cubed on the defined scene and camera
function render() {
  var delta = clock.getDelta();
  cameraControls.update(delta);

  renderer.render(scene, camera);
}

// Since we're such talented programmers, we include some exception handeling in case we break something
// a try and catch accomplished this as it often does
// The sequence below includes initialization, filling up the scene, adding this to the DOM, and animating (updating what appears)
try {
  init();
  fillScene();
  addToDOM();
  animate();
} catch (error) {
  console.log("You did something bordering on utter madness. Error was:");
  console.log(error);
}

window.onload = function(e) {
  document.getElementById('music-files').addEventListener('change', selectMusic, false);
}

window.addEventListener( 'resize', onWindowResize, false );
