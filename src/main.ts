import { createApp } from 'vue'
import { router } from './router'
import { pinia } from './store'
import App from './App.vue'
import './assets/styles/main.css'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
