<script setup>
    import { useStore } from 'vuex'

    import AudioControls from './components/AudioControls.vue'
    import AudioVisualizer from './components/AudioVisualizer.vue'
    import ErrorVisualizer from './components/ErrorVisualizer.vue'

    const errors = useStore().state.Error.errors


</script>


<template>
    <div class="container mt-5">
        <!-- Render Audio Controls and Visualizer if there are no errors -->
        <div v-if="errors.length == 0" class="text-center">
            <h1>Visualizer</h1>
            <AudioControls/>
            <AudioVisualizer/>
        </div>
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
