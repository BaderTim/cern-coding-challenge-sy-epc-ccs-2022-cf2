# challenge
This application visualizes the frequency spectrum of a sound file.
## How to use
- Click the start button to load the given sound file.
- Use the audio controls to start/stop the music or skip to a certain position. The visualizer will automatically update.

<br>

## Code Structure
The application follows a component orientated approach. It mainly uses SFC (Single File Components) and Vuex modules to manage the state.  

### SFC structure
- Script setup
    - Imports
    - Variables
    - General functions
    - Watcher functions
    - Handler functions
- Template
- Style
### Entry point
```
src/main.js
```
### Root Component
```
src/App.vue
```
### Visualization functionality
When a new audio file gets loaded by the `<audio/>` tag inside `src/components/AudioControls.vue`, a `loadedData` event is emitted. This event is handled by a function that creates a new `AnalyserNode` which then gets commited to `Audio.store.js`'s state. 

Inside `src/components/AudioVisualizer.vue` the `AnalyserNode` from the store is used to get the frequency data and visualize it in a `window.requestAnimationFrame` loop. The loop starts/stops by clicking play/pause on the `<audio/>` tag, which also makes use of the audio store. 

The spectrum bars are single HTML elements that are dynamically created inside `src/components/AudioVisualizer.vue`'s template by using a for loop on the `spectrumBarCount` variable. Their individual heights can be set with the function `changeSpectrumBarHeight(id, height)`.  
The visualization loop normalizes the frequencies in respect to the height of the visualizer and the constant `255` and then passes the normalized values to the `changeSpectrumBarHeight` function for each spectrum bar.

<br>

## Modifying the code
Potential cases:
- Adding more audio files by expanding the `audioFiles` string array in `src/components/AudioControls.vue` with the other audio file paths and then changing the `activeAudioFile` variable accordingly.
- Implementing a selection element in `src/components/AudioControls.vue` to select the audio file to be played. The `selectAudioFile` function can be used for its `onChange` event.
- Adding more visualiation gradients by changing the `_spectrumBarGradient` string to an array in `src/components/AudioVisualizer.vue` and adding a `activeGradient` variable.
- Changing the frequencies that should be visualized by modifying  the `newSpectrumBarCount` variable inside the `startVisualizing` functions.

<br>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
