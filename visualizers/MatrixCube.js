var count = 0;
var maxCount = 0;

function startVisuals(){

  if(currVisualizer !== 1) {
    deleteScene(currVisualizer);
    drawVisual1();
  }
}

function drawVisual1(){
  var cube;
  var maxCubes = 20;
  var maxWidth = 15;
  var maxHeight = 7;

  for (var i = 0; i < maxHeight; i++) {
    for (var j = 0; j < maxWidth; j++) {
      cube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), createObjectMaterial());
      cube.position.y = 25;
      cube.position.x = -500 + j * 100;
      cube.position.z = i * 100;
      cube.name = 'cube' + count;
      count++;
      scene.add(cube);
    }

  }

  currVisualizer = 1;
  maxCount = count;
  count = 0;
}

function animateVis1(){
  getFreq();

  for(var i = 0; i < maxCount; i++) {
    var meter = scene.getObjectByName('cube' + i, true);

    var currData = dataArray[i];

    if(currData === 0) {
      currData = 1;
    }

    meter.scale.y = (currData / 25);
    meter.position.y =  currData;

  }
}
