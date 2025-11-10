import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import VueModaller from './VueModaller'

const app = createApp(App)

// Install the VueModaller plugin (simulating npm install vue-modaller)
app.use(VueModaller, {})
// Install the VueModaller plugin
// app.use(createPlugin())

app.mount('#app')
