import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import AudioStore from './store/Audio.store';
import ErrorStore from './store/Error.store';


createApp(App)
    .use(createStore({
        modules: {
            Audio: AudioStore,
            Error: ErrorStore
        }
    }))
    .mount('#app');