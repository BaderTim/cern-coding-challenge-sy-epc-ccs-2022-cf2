import { createApp } from 'vue';
import { createStore, useStore } from 'vuex';
import App from './App.vue';
import AudioStore from './store/Audio.store';
import ErrorStore from './store/Error.store';


// create the app
const app = createApp(App)
    // create vuex store and register all modules
    .use(createStore({
        modules: {
            Audio: AudioStore,
            Error: ErrorStore
        }
    }));

// error handler
// handles exceptions and visualizes them in the UI and console
app.config.errorHandler = (err, _, info) => {
    // first log error to console, in case the error store is not working
    console.error(err, info);
    // then try to add error to error store, which also shows it in the UI
    useStore().commit('Error/addError', {title: err.message, message: err.stack, subMessage: `@ ${info}`});
}
// warning handler
// handles warnings and visualizes them in the UI and console
app.config.warnHandler = (msg, _, trace) => {
    // first log warning to console in case the error store is not working
    console.warn(msg, trace);
    // then try to add warning to error store, which also shows it in the UI
    useStore().commit('Error/addError', {title: msg, message: trace, type: "Warning"});
}

// mount the app
app.mount('#app');
