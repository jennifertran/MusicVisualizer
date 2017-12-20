function startVisuals3() {
    if (currVisualizer !== 3) {
        deleteScene(currVisualizer);
        drawVisual3();
    }
    currVisualizer = 3;
}

function drawVisual3() {
    var sphereGeometry = new THREE.SphereGeometry(500, 20, 20);
    var particleBlock = new THREE.ParticleSystemMaterial({
        color: Math.floor(Math.random() * (1 << 24)),
        size: 40.0,
        transparent: true
    });
    particleBlock.blending = THREE.AdditiveBlending;
    var partSystem = new THREE.ParticleSystem(sphereGeometry, particleBlock);
    partSystem.softParticles = true;
    partSystem.name = 'sphere';
    partSystem.position.x = 0;
    partSystem.position.y = 0;
    partSystem.position.z = 0;
    scene.add(partSystem);
    document.body.appendChild(renderer.domElement);

    render();
}

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

        var currData = dataArray[i] + 100;

        if(sphere !== undefined) {
            sphere.scale.x = currData;
            sphere.scale.y = currData;
            sphere.scale.z = currData;
        }
    }, 1000 / 45);
}