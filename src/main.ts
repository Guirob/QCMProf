import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VTooltip from "v-tooltip";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "./App.scss";
import "vue-toastification/dist/index.css";

createApp(App).use(router).use(VTooltip).use(Toast, {}).mount("#app");
