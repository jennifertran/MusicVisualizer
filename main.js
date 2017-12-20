var camera, scene, renderer, stats;
var cameraControls;

var clock = new THREE.Clock();
var currVisualizer = 1; // Figures out the current Visualizer


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

  renderer.setClearColor(0x000000, 1.0);

  // Camera
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 2000);
  cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 800, 0);
  // cameraControls.target.set(4, 301, 92);

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '0px';
  document.body.appendChild(stats.domElement);


}

// Auto resizes the screen
function onWindowResize() {
  if (camera) {
    camera.aspect = (window.innerWidth) / (window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.setSize((window.innerWidth), (window.innerHeight));
  }
}

function fillScene() {
  scene = new THREE.Scene();

  var light = new THREE.HemisphereLight(0x9b9da0, 0x080820, 0.2);
  scene.add(light);

  var ambient = new THREE.AmbientLight(0x000611, 0.1);
  scene.add(ambient);


  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 100, 50);
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

  drawVisual1();
}

function createObjectMaterial() {

  var c = Math.floor(Math.random() * (1 << 24));
  var material = new THREE.MeshPhongMaterial({
    color: c,
    shininess: 50
  });
  return material;
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

  stats.begin();

  if (analyser) {
    switch (currVisualizer) {
      case 1:
        animateVis1();
        break;
      case 2:
        animateVis2();
        break;
      case 3:
        animateVis3();
        break;
      case 4:
        animateVis4();
        break;
      case 5:
        animateVis5();
        break;
    }
  }

  window.requestAnimationFrame(animate);
  render();

  stats.end();

}

// getDelta comes from THREE.js - this tells how much time passed since this was last called
// This might be useful if time is needed to make things appear smooth, in any animation, or calculation
// The following function stores this, and also renders the scene cubed on the defined scene and camera
function render() {
  var delta = clock.getDelta();
  cameraControls.update(delta);

  renderer.render(scene, camera);
}

// Deletes all the objects in the scene to set up for the new one
function deleteScene(number) {
  if (scene) {
    switch (number) {
      case 1:
        for (var i = 0; i < maxCount; i++) {
          scene.remove(scene.getObjectByName('cube' + i));
        }
        break;
      case 2:
        for (var i = 0; i < maxCount; i++) {
          scene.remove(scene.getObjectByName('cubes' + i));
          scene.remove(scene.getObjectByName('cap' + i));
        }
        break;
      case 3:
          scene.remove(scene.getObjectByName('sphere'));
        break;
      case 4:
        for (var i = 0; i < maxCount; i++) {
          scene.remove(scene.getObjectByName('spiral' + i));
        }
        break;
    }
  }

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

window.addEventListener('resize', onWindowResize, false);
