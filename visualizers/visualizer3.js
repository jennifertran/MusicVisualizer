function startVisuals3() {
    if (currVisualizer !== 3) {
        deleteScene(currVisualizer);
        drawVisual3();
    }
    currVisualizer = 3;
}

function drawVisual3() {
    var sphereGeometry = new THREE.SphereGeometry(500, 20, 20);
    var particleBlock = new THREE.PointsMaterial({
        color: Math.floor(Math.random() * (1 << 24)),
        size: 40.0,
        transparent: true
    });
    particleBlock.blending = THREE.AdditiveBlending;
    var partSystem = new THREE.Points(sphereGeometry, particleBlock);
    partSystem.softParticles = true;
    partSystem.name = 'sphere';
    partSystem.position.x = 0;
    partSystem.position.y = 0;
    partSystem.position.z = 0;
    scene.add(partSystem);

    render();
}

var tempTimer = 0;

function animateVis3() {
    getFreq();

    if (cameraAngle === desiredAngle) {
        orbitSpeed = 0;
    }
    else {
        cameraAngle += orbitSpeed;
        camera.position.x = Math.cos(cameraAngle) * orbitRange;
    }

    setTimeout(function () {
      var sphere = scene.getObjectByName('sphere');

      var average = getAverageVolume();
      if (audioBuffer) {
        tempTimer++;
        if ((tempTimer / 50) === parseInt((audioBuffer.duration / 4), 10)) {
          sphere.material.color.setHex(0x2dd88e);
        }
        if ((tempTimer / 50) === parseInt((audioBuffer.duration / 3), 10)) {
          sphere.material.color.setHex(0xc42b2b);
        }
      }

      if (sphere) {
        sphere.scale.y = average / 70;
        sphere.scale.z = average / 60
      }

    }, 1000 / 45);
}