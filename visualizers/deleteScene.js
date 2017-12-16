// Deletes all the objects in the scene to set up for the new one
function deleteScene(number) {
  if (scene) {
    switch (number) {
      case 1:
      case 2:
        for (var i = 0; i < maxCount; i++) {
          scene.remove(scene.getObjectByName('cube' + i));
        }
        break;
    }
  }

}