import './style.css'
import type { App } from 'vue'
import * as components from './components'
import ModalRoot from './components/modalRoot.vue'

const createPlugin = (options?: any): any => {
  return (app: App) => {
    console.log('installing the plugin with the options(?):', app)
    // globally register directives / components / properties here
    for (const key in components) {
      app.component(key, components[key as keyof typeof components])
    }
    
    // Register ModalRoot globally so it can be used anywhere
    app.component('ModalRoot', ModalRoot)
  }
}

export * from './components'
export * from './useModal'
export { createPlugin, ModalRoot }
