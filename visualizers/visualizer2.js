function startVisuals2() {
  if (currVisualizer !== 2) {
    deleteScene(currVisualizer);
    camera.position.set(0, 800, 1000);
    cameraControls.target.set(0, 0, 50);
    render();

    drawVisual2();
  }
  currVisualizer = 2;
}

function drawVisual2() {
  var cube, cap;

  var maxWidth = 25;

  var capMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0x01FF00,
    shininess: 20,
    reflectivity: 5.5
  });

  for (var i = 0; i < maxWidth; i++) {
    cube = new THREE.Mesh(new THREE.BoxGeometry(55, 50, 30), createObjectMaterial());
    cube.position.y = 20;
    cube.position.x = -950 + i * 80;
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
      var currCube = scene.getObjectByName('cubes' + i, true);
      var currCap = scene.getObjectByName('cap' + i, true);

      var currData = dataArray[i * 4];

      if (currData === 0) {
        currData = 1;
      }

      if (currCube !== undefined) {
        currCube.scale.y = (currData / 25);
        currCube.position.y = currData;

        currCube.geometry.computeBoundingBox();
        var height = (currCube.geometry.boundingBox.max.y - currCube.geometry.boundingBox.min.y) * (currData / 4);

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
