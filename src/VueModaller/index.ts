import './css/style.css'
import type { App } from 'vue'
import * as components from './components'
import Modal from './modal.vue'
import ModalRoot from './components/modalRoot.vue'

// Standard Vue plugin format
const VueModaller = {
  install(app: App, options?: any) {
    console.log('Installing VueModaller plugin with options:', options)
    
    // Register all components globally
    // for (const key in components) {
    //   app.component(key, components[key as keyof typeof components])
    // }
    app.component('Modal', Modal)
    app.component('ModalRoot', ModalRoot)
  }
}

// Alternative plugin creator function (for backward compatibility)
const createPlugin = (options?: any): any => {
  return (app: App) => {
    VueModaller.install(app, options)
  }
}

export * from './components'
export * from './useModal'
export { createPlugin, VueModaller }
export default VueModaller
