import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from "./router";
import store from "./store/index.module";

/**
 * Loading Module
 */
import {Loading} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

/**
 * SweetAlert Module
 */
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

/**
 * Vuetify Module
 */
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as icon from '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    icon,
    ssr: true,
})

const app = createApp(App);

app.use(PrimeVue);
app.use(VueSweetalert2);
app.use(
    Loading,
    {
        // props
        color: "#074887",
        height: 70,
        zIndex: 999999999,
    },
    {
        // slots
    }
);

createApp(App)
    .use(store)
    .use(router)
    .use(vuetify)
    .mount('#app')
