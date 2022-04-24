<script setup>
    import { watch, ref } from 'vue';
    import { useStore } from 'vuex'
    const store = useStore();

    // All audio files can be registered here
    const audioFiles = ["music.mp3"];
    // Set the active audio file
    const activeAudioFile = 0;

    // Add audio files to store
    audioFiles.forEach(file => {
        store.commit("Audio/addAudioFile", file);
    });

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
        store.commit('Audio/setActiveAudioById', activeAudioFile);
    }
    // handle audio element play
    const handlePlay = () => {
        store.commit("Audio/play");

        // // create audio context
        // const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // // create a mediaElementNode within audioContext by passing the HTML audio element
        // const audioElement = document.getElementById('audio-player');
        // const mediaElementNode = audioContext.createMediaElementSource(audioElement);

        // // create an analyserNode within audioContext and pass it the outputs 
        // // from the mediaElementNode by using the connect method
        // const analyserNode = audioContext.createAnalyser();
        // analyserNode.fftSize = 256;
        // mediaElementNode.connect(analyserNode);

        // // create buffer for capturing data from analyserNode 
        // const bufferLength = analyserNode.frequencyBinCount;
        // const dataArray = new Uint8Array(bufferLength);
        // // retrieve the frequency data from the analyserNode
        // analyserNode.getByteTimeDomainData(dataArray);

        // console.log(dataArray);
        
    }
    // handle audio element pause
    const handlePause = () => {
        store.commit("Audio/pause");
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
            @play="handlePlay"
            @pause="handlePause"
            id="audio-player"
            controls
            >Your browser does not support the audio element. Try using the latest version of Google Chrome or Firefox.
        </audio>
    </div>
</template>


<style lang="scss" scoped>
</style>
