<script setup>
    import { watch, ref } from 'vue';
    import { useStore } from 'vuex'
    const store = useStore();

    // All existing audio files can be registered here
    const audioFiles = ["music.mp3"];
    // Set the default active audio file
    const activeAudioFile = 0;

    // Add audio files to store
    audioFiles.forEach(file => {
        store.commit("Audio/addAudioFile", file);
    });


    //
    // functions
    //

    // select new audio file
    const selectAudioFile = (index) => {
        store.commit("Audio/setActiveAudioById", index);
    }


    //
    // watchers
    //

    // watch active audio file index
    let activeAudioFileIndex = ref(store.getters['Audio/getActiveAudioIndex']);
    watch(() => store.getters['Audio/getActiveAudioIndex'], (newValue) => {
        activeAudioFileIndex.value = newValue;
    });
    // watch active audio file name
    let activeAudioFileName = ref(store.getters['Audio/getActiveAudio']);
    watch(() => store.getters['Audio/getActiveAudio'], (newValue) => {
        activeAudioFileName.value = newValue;
    });


    //
    // handlers
    //

    // Set the active audio file on start button click
    const handleStart = () => {
        selectAudioFile(activeAudioFile);
    }
    // handle audio element play
    const handlePlay = () => {
        store.commit("Audio/play");
    }
    // handle audio element pause
    const handlePause = () => {
        store.commit("Audio/pause");
    }
    // handle audio element load
    const handleLoadedData = (event) => {
        // create audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // create a mediaElementNode within audioContext by passing the HTML audio element
        const mediaElementNode = audioContext.createMediaElementSource(event.target);
        // create an analyserNode within audioContext and pass it the outputs 
        // from the mediaElementNode by using the connect method
        const analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 256;
        mediaElementNode.connect(analyserNode);
        // save the analyserNode to the store
        store.commit("Audio/setAnalyserNode", analyserNode);
    }
</script>


<template>
    <div>
        <!-- 
        Here could be a select element to choose the audio file 
        that should get activated on button click in case more
        than one are registered.
        -->
        <button 
            v-if="activeAudioFileIndex == -1" 
            class="btn btn-primary mt-2"
            @click="handleStart"
            >start
        </button>

        <audio 
            v-else 
            :src="activeAudioFileName" 
            @loadeddata="handleLoadedData"
            @play="handlePlay"
            @pause="handlePause"
            id="audio-player"
            controls
            >Your browser does not support the audio element. Try using the latest version of Google Chrome or Firefox.
        </audio>
        <button
            class="btn btn-secondary mt-2"
            @click="selectAudioFile(1)"
        >change</button>
    </div>
</template>


<style lang="scss" scoped>
</style>
