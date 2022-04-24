 /*
Audio.store.js
This file defines the store functions for the Audio module.

It stores all the data related to Audio.
*/

const state = () => ({
    // string[] - list of audio file paths
    audioFiles: [],
    // number - index of the active audio file
    activeAudioIndex: -1, 
    // AnalyserNode - the audio analyser node
    analyserNode: null,
    // boolean -  check if audio is playing
    playing: false 
});

const getters = {
    getAudioFiles: state => state.audioFiles,
    getSingleAudioById: state => (id) => state.audioFiles[id],
    getActiveAudio: state => state.audioFiles[state.activeAudioIndex],
    getActiveAudioIndex: state => state.activeAudioIndex,
    getAnalyserNode: state => state.analyserNode,
    isPlaying: state => state.playing
};

const mutations = {
    addAudioFile(state, fileName) {
        state.audioFiles.push(fileName);
    },
    // removes audio file from state
    // sets activeAudioIndex to -1 if the file was the active audio file
    // else check if the file was before the active audio file
    // if so, lower the activeAudioIndex by 1
    removeAudioFileById(state, id) {
        state.audioFiles.splice(id, 1);
        if(state.activeAudioIndex === id) {
            state.activeAudioIndex = -1;
        } else if(state.activeAudioIndex > id) {
            state.activeAudioIndex--;
        }
    },
    setActiveAudioById(state, id) {
        state.activeAudioIndex = id;
    },
    setActiveAudioByName(state, fileName) {
        state.activeAudioIndex = state.audioFiles.indexOf(fileName);
    },
    setAnalyserNode(state, node) {
        state.analyserNode = node;
    },
    play(state) {
        state.playing = true;
    },
    pause(state) {
        state.playing = false;
    }
};

export default { state, getters, mutations, namespaced: true, };
