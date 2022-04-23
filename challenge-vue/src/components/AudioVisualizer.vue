<script setup>
    // import { useStore } from 'vuex'
    // const store = useStore();

    // visualizer dimensions in px
    const visualizer = {width: 400, height: 400};
    // width of a single bar in px
    // must meet visualizer.width % spectrumBarWidth == 0 
    const spectrumBarWidth = 10;

    // computed spectrum bar count
    const spectrumBarCount = visualizer.width / spectrumBarWidth;

    // dynamic css variables
    const _visualizerWidth = visualizer.width + 'px';
    const _visualizerHeight = visualizer.height + 'px';
    const _spectrumBarWidth = spectrumBarWidth + 'px';
</script>


<template>
    <div class="visualizer border border-dark m-auto rounded mt-3">
        <!-- Render spectrum bars with for loop -->
        <div v-for="spectrumBar in spectrumBarCount" :key="spectrumBar" class="spectrum-bar"/>
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
