function startVisuals4() {
  if (currVisualizer !== 4) {
    deleteScene(currVisualizer);
    drawVisual4();
  }
  currVisualizer = 4;
}

function getRandomColor() {
  var colors = ["aqua", "red", "skyblue", "springgreen", "turquoise", "violet", "yellow", "aquamarine", "blue", "blueviolet", "greenyellow", "hotpink", "lawngreen", "lime", "cornflowerblue", "cyan", "deeppink", "deepskyblue", "dodgerblue", "fuchsia", "limegreen", "magenta", "orange", "orchid", "plum", "powderblue"];

  return colors[getRandomInt(0, colors.length)];
}

var numSpirals = 20;

function drawVisual4() {

  var offset = 0.3;
  for (var s = 0; s < numSpirals; s++) {
    var randomInt = getRandomInt(0, 2);
    var noise = getRandomInt(1, 3);
    var geometry;
    if (randomInt === 0) {
      geometry = createSpiralGeometry(0.5);
    } else {
      geometry = createSpiralGeometry(noise);
    }
    geometry.scale(offset, offset, offset);
    offset += 0.5;

    var obj = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: getRandomColor()}));
    obj.name = "spiral" + s;

    count++;
    scene.add(obj);
  }

  maxCount = count;
  count = 0;
}

function animateVis4() {

  setTimeout(function () {
    for (var i = 0; i < numSpirals; i++) {
      var spiral = scene.getObjectByName("spiral" + i);

      var value = (dataArray[i * 2] / 4);
      value = value < 1 ? 1 : value;

      if (spiral !== undefined) {
        spiral.rotateZ(value / 10000);
        spiral.geometry.verticesNeedUpdate = true;

        if (i % getRandomInt(2, 7) === 0) {
          var scale = (getRandomInt(2, 6)) / 2;
          var volume = getAverageVolume();
          if (volume > 50) {
            scale = value / 10;
          }
          spiral.scale.set(scale, scale, scale);
        }
      }
    }
  }, 1000 / 60);
}

function getAverageVolume() {
  var values = 0;
  var average;

  var length = dataArray.length;

  for (var i = 0; i < length; i++) {
    values += dataArray[i];
  }

  average = values / length;
  return average;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Geometry Function from https://github.com/gracexu94/FinalProject
function createSpiralGeometry(noiseLevel) {
  var geometry = new THREE.Geometry();
  var sz = 20, cxy = 200, cz = cxy * sz;
  var hxy = Math.PI / cxy, hz = Math.PI / cz;
  var radius = 25;
  for (var i = -cz; i < cz; i++) {
    var lxy = i * hxy;
    var lz = i * hz;
    var rxy = radius / Math.cosh(lz);
    var x = rxy * Math.cos(lxy);
    var y = rxy * Math.sin(lxy) + getRandomInt(0, noiseLevel);
    var z = radius * Math.tanh(lz) + getRandomInt(0, noiseLevel);
    geometry.vertices.push(new THREE.Vector3(x, y, z));
  }
  return geometry;
}