<script setup>
    import { watch } from 'vue';
    import { useStore } from "vuex";
    const store = useStore();

    // visualizer dimensions in px
    const visualizer = {width: 400, height: 400};
    // width of a single bar in px
    // must meet visualizer.width % spectrumBarWidth == 0 
    const spectrumBarWidth = 10;
    // maximum refresh rate
    const fps = 40;

    // computed spectrum bar count
    const spectrumBarCount = visualizer.width / spectrumBarWidth;
    // computed fps interval
    const fpsInterval = 1000 / fps;
    // dynamic css variables
    const _visualizerWidth = visualizer.width + 'px';
    const _visualizerHeight = visualizer.height + 'px';
    const _spectrumBarWidth = spectrumBarWidth + 'px';
    // component-global visualization loop variables
    let stop; // boolean - true if visualization loop is running
    let then; // timestamp - last loop iteration


    //
    // functions
    //

    // initialize visualizing loop
    const startVisualizing = () => {
        stop = false;
        then = window.performance.now();
        visualize();
    }
    // break visualizing loop
    const stopVisualizing = () => {
        stop = true;
    }
    // visualizing loop function (recursive)
    const visualize = (now) => {
        // stop
        if (stop) {
            return;
        }
        // request another frame
        window.requestAnimationFrame(visualize);
        // calc elapsed time since last loop
        const elapsed = now - then;
        // if enough time has elapsed, draw the next frame
        if (elapsed > fpsInterval) {
            // Get ready for next frame by setting then=now
            then = now - (elapsed % fpsInterval);
            console.log('visualizing');
            // draw stuff here

            // get audio context
            // get audio timestamp
            // visualize timestamp

        }
    }

    // sets the height of a single spectrum bar
    // eslint-disable-next-line no-unused-vars
    const changeSpectrumBarHeight = (id, height) => {
        // id: the id of the spectrum bar
        // height: the new height of the spectrum bar in percentage
        document.getElementById('spectrumBar-'+id).style.height = height + '%';
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
        <!-- Render spectrum bars with for loop -->
        <div 
            v-for="spectrumBar in spectrumBarCount" 
            :key="spectrumBar" 
            :id="'spectrumBar-'+spectrumBar" 
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
        height: 100%;
        width: v-bind('_spectrumBarWidth');
        border: 1px solid rgb(145, 145, 145);
    }
</style>
