function startVisuals5() {
  if (currVisualizer !== 5) {
    deleteScene(currVisualizer);
    changeBackground();
    drawVisual5();
  }
  currVisualizer = 5;
}

var randomInt;

function drawVisual5() {
  var material, geometry;

  for (var i = 0; i < 200; i++) {
    randomInt = getRandomInt(0, 2);

    if (randomInt === 0) {
      material = new THREE.MeshPhongMaterial({
        color: getRandomColor(),
        wireframe: true
      });
    } else {
      material = new THREE.MeshPhongMaterial({
        color: getRandomColor()
      });
    }

    randomInt = getRandomInt(0, 2);

    if (randomInt === 0) {
      geometry = new THREE.IcosahedronGeometry(40, 0);
    } else {
      geometry = new THREE.OctahedronGeometry(50, 0);
    }

    randomInt = getRandomInt(1, 3);

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 2000;
    mesh.position.y = (Math.random() - 0.5) * 2000;
    mesh.position.z = (Math.random() - 0.5) * 2000;
    mesh.name = 'mesh' + i;
    mesh.scale.set(randomInt, randomInt, randomInt);
    count++;
    scene.add(mesh);
  }

  maxCount = count;
  count = 0;
}

cameraAngle = 0;
orbitRange = 1000;
desiredAngle = 90 * Math.PI / 180;

function animateVis5() {
  getFreq();


  if (cameraAngle === desiredAngle) {
    orbitSpeed = 0;
  }
  else {
    cameraAngle += orbitSpeed;
    camera.position.x = Math.cos(cameraAngle) * orbitRange;
    camera.position.y = Math.sin(cameraAngle) * orbitRange;
  }

  setTimeout(function () {
    for (var i = 0; i < maxCount; i++) {
      var currShape = scene.getObjectByName('mesh' + i, true);

      var currData = dataArray[i];

      randomInt = getRandomInt(0, 2);

      var newScale = randomInt = getRandomInt(1, 5);

      if (currShape !== undefined) {

        if (randomInt === 0) {
          currShape.scale.set(newScale, newScale, newScale);
        }
        else {
          currShape.rotateZ(currData / 100);
        }
      }

    }
  }, 1000 / 45);

}