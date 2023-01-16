import {createApp} from 'vue';
import Vuex from "vuex";
import {auth} from "./auth.module";
import App from "@/App";

const app = createApp(App);

app.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
    },
});
