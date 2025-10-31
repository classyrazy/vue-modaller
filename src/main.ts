import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPlugin } from './VueModaller'

const app = createApp(App)

// Install the VueModaller plugin
app.use(createPlugin())

app.mount('#app')
