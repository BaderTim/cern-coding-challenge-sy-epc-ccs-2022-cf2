<script setup>
    import { watch, ref } from 'vue';
    import { useStore } from "vuex";
    const store = useStore();

    // visualizer dimensions in px
    const visualizer = {width: 400, height: 400};
    // maximum refresh rate
    const fps = 40;

    // visualization loop variables
    const fpsInterval = 1000 / fps; // number - computed fps interval
    let spectrumBarCount = ref(0); // number - of bars in spectrum
    let spectrumBarWidth = ref(0); // number - width of each bar
    let analyserNode = ref(null); // analyserNode - audio analyser node
    let dataArray = ref(null); // Uint8Array - audio data array
    let stop = ref(true); // boolean - true if visualization loop should stop
    let then = ref(0); // timestamp - last loop iteration

    // css variables
    const _visualizerWidth = visualizer.width + 'px';
    const _visualizerHeight = visualizer.height + 'px';
    const _spectrumBarGradient = `linear-gradient(
        180deg, 
        rgba(24,234,16,1) 0px, 
        rgba(251,240,21,1) ${Math.round(1/4 * visualizer.height)}px,
        rgba(255,72,0,1) ${Math.round(3/4 * visualizer.height)}px
        )`;


    //
    // functions
    //

    // initialize visualizing loop
    const startVisualizing = () => {
        // get analyserNode and initialize empty dataArray
        analyserNode.value = store.getters['Audio/getAnalyserNode'];
        analyserNode.value.fftSize = 256;
        const bufferLength = analyserNode.value.frequencyBinCount;
        dataArray.value = new Uint8Array(bufferLength);
        // set spectrumBarCount and spectrumBarWidth according to bufferLength
        const newSpectrumBarCount = Math.round(bufferLength / 2.5);
        spectrumBarWidth.value = visualizer.width / newSpectrumBarCount;
        spectrumBarCount.value = newSpectrumBarCount;
        // start visualization loop
        stop.value = false;
        then.value = window.performance.now();
        visualize();
    }
    // break visualizing loop
    const stopVisualizing = () => {
        spectrumBarCount.value = 0;
        spectrumBarWidth.value = 0;
        stop.value = true;
    }
    // visualizing loop function (recursive)
    const visualize = (now) => {
        // check if visualization loop has been stopped
        if (stop.value) {
            // stop visualization loop and clear data
            analyserNode.value = null;
            dataArray.value = null;
            return;
        }
        // request another frame
        window.requestAnimationFrame(visualize);
        // calc elapsed time since last loop
        const elapsedTime = now - then.value;
        // if enough time has elapsed, draw the next frame
        if (elapsedTime > fpsInterval) {
            // get ready for next frame by setting then=now
            then.value = now - (elapsedTime % fpsInterval);
            // get current audio data
            analyserNode.value.getByteFrequencyData(dataArray.value);
            // update spectrum bars
            for(let i = 0; i < spectrumBarCount.value; i++) {
                // normalize new bar height
                const barHeight = visualizer.height * dataArray.value[i] / 255;
                // update bar height
                changeSpectrumBarHeight(i+1, barHeight);
            }
        }
    }
    // sets the height of a single spectrum bar
    const changeSpectrumBarHeight = (id, height) => {
        document.getElementById('spectrumBar-'+id).style.height = height + 'px';
    }


    //
    // watchers
    //

    // watch start/stop button from audio element
    watch(() => store.getters['Audio/isPlaying'], (newValue) => {
        if(newValue) {
            // start visualizer
            startVisualizing();
            return;
        } 
        // stop visualizer
        stopVisualizing();
    });

</script>


<template>
    <div class="visualizer border border-dark m-auto rounded mt-3">
        <!-- Render info if audio is not playing -->
        <p 
            v-if="stop"
            class="lead m-auto"
            >Currently there is no audio playing.
        </p>
        <!-- Render spectrum bars with for loop -->
        <div 
            v-else
            v-for="spectrumBar in spectrumBarCount" 
            :key="spectrumBar" 
            :id="'spectrumBar-'+spectrumBar" 
            :style="{width: spectrumBarWidth+'px'}"
            class="spectrum-bar"
        />
    </div>
</template>


<style lang="scss" scoped>
    .visualizer {
        display: flex;
        width: v-bind('_visualizerWidth');	
        height: v-bind('_visualizerHeight');
    }
    .spectrum-bar {
        display: block;
        border: 1px solid grey;
        background: v-bind('_spectrumBarGradient');
    }
</style>
