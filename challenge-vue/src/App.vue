<script setup>
    import { useStore } from 'vuex'

    import AudioControls from './components/AudioControls.vue'
    import AudioVisualizer from './components/AudioVisualizer.vue'
    import ErrorVisualizer from './components/ErrorVisualizer.vue'

    const errors = useStore().getters["Error/getErrors"];


</script>


<template>
    <div class="container mt-5">
        <!-- Render AudioControls and AudioVisualizer if there are no errors/warnings -->
        <div v-if="errors.length == 0" class="text-center">
            <h1>Visualizer</h1>
            <AudioControls/>
            <AudioVisualizer/>
        </div>
        <!-- Render ErrorVisualizer if there are any warnings or errors -->
        <ErrorVisualizer 
            v-else 
            v-for="error in errors" 
            :key="error.title" 
            :error="error"
            :errorNumber="errors.indexOf(error) + 1"
        />
    </div>
</template>


<style lang="scss" scoped>
</style>
