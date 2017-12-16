function startVisuals2() {
  if (currVisualizer !== 2) {
    deleteScene(currVisualizer);
    drawVisual2();
  }
  currVisualizer = 2;
}

function drawVisual2() {
  var cube;

  var maxWidth = 20;

  for (var i = 0; i < maxWidth; i++) {
    cube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), createObjectMaterial());
    cube.position.y = 25;
    cube.position.x = -1000 + i * 100;
    cube.name = 'cubes' + count;
    count++;
    scene.add(cube);
  }

maxCount = count;
count = 0;
}

function animateVis2() {
  getFreq();

  for (var i = 0; i < maxCount; i++) {
    var meter = scene.getObjectByName('cubes' + i, true);

    var currData = dataArray[i];

    if (currData === 0) {
      currData = 1;
    }

    if(meter !== undefined) {
      meter.position.y = currData * 1.5;
    }

  }
}
