# Music Visualizer

A Music Visualizer that dynamically displays a visual effect that is responsive to an audio track with dynamic interfaces. 

**Link to the Visualizer:** https://jennifertran.github.io/MusicVisualizer/

**By [Jennifer Tran](https://github.com/jennifertran), [Justin Gouge](https://github.com/SyntaxOverflow), [Chenxi Fan](https://github.com/cici8888)**

## Features
* 5 Different Music Visualizers
* Default Music
* User can upload their own custom music
* Play, stop, and pause the audio

## Visualizers

<img src="https://raw.githubusercontent.com/jennifertran/MusicVisualizer/master/screenshots/visual1.png" width="80%">
<img src="https://raw.githubusercontent.com/jennifertran/MusicVisualizer/master/screenshots/visual2.png" width="80%">
<img src="https://raw.githubusercontent.com/jennifertran/MusicVisualizer/master/screenshots/visual3.png" width="80%">
<img src="https://raw.githubusercontent.com/jennifertran/MusicVisualizer/master/screenshots/visual4.png" width="80%">
<img src="https://raw.githubusercontent.com/jennifertran/MusicVisualizer/master/screenshots/visual5.png" width="80%">

<img src="image" width="40%">

## Challanges Faced
* Catching every detail in the audio track.
* Figuring out how the audio properties worked.
* Implementing the visualizers along with animating it with the music
* The default music was not working as intended. 
  * We wanted to be able to stop the default music and choose a new song to play.  We partially did it by a routine of clicking the ”stop” bottom to stop the default music first, then selecting a new song and clicking the ”play” button.  
  * We then have to follow this every time when we change the song, we need to click the ”stop” button first before we change the song and click the ”play” button after we changed. 
  * After we load another file, the page must be refreshed before we can use the default music again.
  
## How to run our Project

Local Server is required. You can run a python server using the command: 
~~~
python -m SimpleHTTPServer
~~~

## Future Works

Due to time restrictions, we were not able to get all the features that we wanted to implemented including a controller interface where the user can customize the visualizations and wanted to add several more visualizers with different animations.

## References
[1] https://threejs.org/examples/#misc_controls_trackball

[2] https://wayou.github.io/3D_Audio_Spectrum_VIsualizer/

[3] https://codepen.io/mnovosel2/pen/reXoez

[4] https://github.com/gracexu94/FinalProject

[5] https://www.w3schools.com/

[6] https://jsfiddle.net/1jp6x3eh/

[7] https://threejs.org/

