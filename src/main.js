import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";


const app = createApp(App);
app.use(store).use(router);
app.component('HeaderComponent', HeaderComponent);
app.component('FooterComponent', FooterComponent);
app.mount('#app');
