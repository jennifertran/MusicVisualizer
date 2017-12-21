var count = 0;
var maxCount = 0;

function startVisuals() {

  if (currVisualizer !== 1) {
    deleteScene(currVisualizer);
    changeBackground();
    drawVisual1();
  }
  currVisualizer = 1;
}

var cameraAngle = 90;
var orbitRange = 700;
var orbitSpeed = Math.PI / 180;
var desiredAngle = 90 * Math.PI / 180;

function drawVisual1() {
  var cube;
  var maxWidth = 11;
  var maxHeight = 10;

  for (var i = 0; i < maxHeight; i++) {
    for (var j = 0; j < maxWidth; j++) {
      cube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), createObjectMaterial());
      cube.position.y = 25;
      cube.position.x = -500 + j * 100;
      cube.position.z = -500 + i * 100;
      cube.name = 'cube' + count;
      count++;
      scene.add(cube);
    }

  }

  camera.position.set(orbitRange, 1000, 200);
  camera.lookAt(0, 800, 0);

  maxCount = count;
  count = 0;
}

function animateVis1() {
  getFreq();

  if (cameraAngle === desiredAngle) {
    orbitSpeed = 0;
  }
  else {
    cameraAngle += orbitSpeed;
    camera.position.x = Math.cos(cameraAngle) * orbitRange;
  }

  setTimeout(function () {
    for (var i = 0; i < maxCount; i++) {
      var meter = scene.getObjectByName('cube' + i, true);

      var currData = dataArray[i];

      if (currData < 25) {
        currData = 25;
      }

      if (meter !== undefined) {
        meter.scale.y = (currData / 25);
        meter.position.y = currData;
      }

    }
  }, 1000 / 45);
}
