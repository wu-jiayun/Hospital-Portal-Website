import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/theme.css'
import { initAuth } from './stores/auth'

initAuth()
createApp(App).use(router).mount('#app')
