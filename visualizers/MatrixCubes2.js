function startVisuals2() {
  if (currVisualizer !== 2) {
    deleteScene(currVisualizer);
    drawVisual2();
  }
}

function drawVisual2() {
  var cube;

  var maxWidth = 20;

  for (var i = 0; i < maxWidth; i++) {
    cube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), createObjectMaterial());
    cube.position.y = 25;
    cube.position.x = -1000 + i * 100;
    cube.position.z = 100;
    cube.name = 'cube' + count;
    count++;
    scene.add(cube);
  }

currVisualizer = 2;
maxCount = count;
count = 0;
}

function animateVis2() {
  getFreq();

  for (var i = 0; i < maxCount; i++) {
    var meter = scene.getObjectByName('cube' + i, true);

    var currData = dataArray[i];

    if (currData === 0) {
      currData = 1;
    }

    // meter.scale.y = (currData / 25);
    // meter.position.y =  currData;

    meter.position.y = currData * 1.5;

  }
}
