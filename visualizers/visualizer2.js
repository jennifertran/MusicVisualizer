function startVisuals2() {
  if (currVisualizer !== 2) {
    deleteScene(currVisualizer);

    camera.position.set(0, 900, 1000);
    render();

    drawVisual2();
  }
  currVisualizer = 2;
}

function drawVisual2() {
  var cube, cap;

  var maxWidth = 18;

  var capMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0x01FF00,
    shininess: 20,
    reflectivity: 5.5
  });

  for (var i = 0; i < maxWidth; i++) {
    cube = new THREE.Mesh(new THREE.BoxGeometry(55, 50, 30), createObjectMaterial());
    cube.position.y = 20;
    cube.position.x = -850 + i * 100;
    cube.name = 'cubes' + count;

    cap = new THREE.Mesh(new THREE.BoxGeometry(55, 20, 30), capMaterial);
    cap.position.y = cube.position.y + 35;
    cap.position.x = cube.position.x;
    cap.name = 'cap' + count;

    count++;
    scene.add(cube);
    scene.add(cap);
  }

  maxCount = count;
  count = 0;
}

function animateVis2() {
  getFreq();

  setTimeout(function () {
    for (var i = 0; i < maxCount; i++) {
      var meter = scene.getObjectByName('cubes' + i, true);
      var currCap = scene.getObjectByName('cap' + i, true);

      var currData = dataArray[i * 4];

      if (currData === 0) {
        currData = 1;
      }

      if (meter !== undefined) {
        meter.scale.y = (currData / 25);
        meter.position.y = currData;

        meter.geometry.computeBoundingBox();
        var height = (meter.geometry.boundingBox.max.y - meter.geometry.boundingBox.min.y) * (currData / 4);

        if (height / 2 <= 5) {
          currCap.position.y = 0;
        }
        else {
          if (height / 2 > currCap.position.y) {
            currCap.position.y = height / 5;
          }
          else {
            currCap.position.y -= 4;
          }
        }
      }

    }
  }, 1000 / 45);
}
