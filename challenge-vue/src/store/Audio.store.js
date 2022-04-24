/**
 * Do not feel like you have to use this store. Only use it if you want to.
 * The skeleton is here to help you get started in case you want to use it.
 */

const state = () => ({
    audioFiles: [],
    activeAudioIndex: -1,
    analyserNode: null,
    playing: false,
    _startingTime: -1,
    _passedTime: 0,
});

const getters = {
    getAudioFiles: state => state.audioFiles,
    getSingleAudioById: state => (id) => state.audioFiles[id],
    getActiveAudio: state => state.audioFiles[state.activeAudioIndex],
    getActiveAudioIndex: state => state.activeAudioIndex,
    getAnalyserNode: state => state.analyserNode,
    isPlaying: state => state.playing,
    getPlayingTime: state => {
        if (state._startingTime === -1) {
            return 0;
        }
        if(state.playing) {
            return state._passedTime + (Date.now() - state._startingTime);
        }
        return state._passedTime;
    }
};

const mutations = {
    addAudioFile(state, fileName) {
        state.audioFiles.push(fileName);
    },
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
        state._startingTime = Date.now();
    },
    pause(state) {
        state.playing = false;
        state._passedTime += Date.now() - state._startingTime;
    }
};

export default { state, getters, mutations, namespaced: true, };
