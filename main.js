var camera, scene, renderer;
var cameraControls;

var clock = new THREE.Clock();

function fillScene() {
  scene = new THREE.Scene();

  //Visualize the Axes - Useful for debugging, can turn this off if desired
  var axes = new THREE.AxisHelper(1500);
  scene.add(axes);

}

// Initialization

function init() {
  var canvasWidth = window.innerWidth - 18;
  var canvasHeight = window.innerHeight - 20;
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
  camera.position.set(800, 600, 500);
  cameraControls.target.set(4, 301, 92);

}

// Auto resizes the screen
function onWindowResize() {
  camera.aspect = (window.innerWidth) / (window.innerHeight);
  camera.updateProjectionMatrix();
  renderer.setSize( (window.innerWidth - 18), (window.innerHeight - 20) );
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
  render();
}

// getDelta comes from THREE.js - this tells how much time passed since this was last called
// This might be useful if time is needed to make things appear smooth, in any animation, or calculation
// The following function stores this, and also renders the scene based on the defined scene and camera
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

window.addEventListener( 'resize', onWindowResize, false );
