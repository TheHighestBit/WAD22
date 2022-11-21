import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HeaderComponent from "@/components/HeaderComponent";

const app = createApp(App);
app.use(store).use(router);
app.component('HeaderComponent', HeaderComponent);
app.mount('#app');
