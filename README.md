# VueModaller

A flexible and powerful modal system for Vue 3 applications with TypeScript support, featuring draggable modals, side panels, and smooth animations.

## Features

✨ **Multiple Modal Types**
- Standard modals
- Side panels 
- Panel modals
- Draggable modals (Instagram-style)

🎨 **Customizable**
- CSS variables for easy theming
- BEM methodology for styling
- Configurable animations
- Custom handle styles for draggable modals

🚀 **Developer Experience**
- TypeScript support
- Vue 3 Composition API
- Easy to use composable
- Global component registration

📱 **Mobile-Friendly**
- Touch gesture support
- Smooth animations
- Responsive design

## Installation

```bash
npm install vue-modaller
```

## Quick Start

### 1. Install the plugin

```javascript
import { createApp } from 'vue'
import VueModaller from 'vue-modaller'
import App from './App.vue'

const app = createApp(App)
app.use(VueModaller)
app.mount('#app')
```

### 2. Add ModalRoot to your app

```vue
<template>
  <div id="app">
    <!-- Your app content -->
    <ModalRoot />
  </div>
</template>
```

### 3. Use the useModal composable

```vue
<script setup>
import { useModal } from 'vue-modaller'
import MyModalContent from './MyModalContent.vue'

const openModal = async () => {
  const result = await useModal(MyModalContent, {
    title: 'My Modal',
    config: {
      type: 'modal', // 'modal' | 'side' | 'panel' | 'draggable'
      blur: true,
      closeable: true
    },
    props: {
      message: 'Hello from modal!'
    }
  })
  console.log('Modal result:', result)
}
</script>

<template>
  <button @click="openModal">Open Modal</button>
</template>
```

## Modal Types

### Standard Modal
```javascript
const result = await useModal(Component, {
  config: {
    type: 'modal',
    width: 500,
    blur: true,
    closeable: true
  }
})
```

### Side Panel
```javascript
const result = await useModal(Component, {
  config: {
    type: 'side',
    blur: true,
    closeable: true
  }
})
```

### Draggable Modal (Instagram-style)
```javascript
const result = await useModal(Component, {
  config: {
    type: 'draggable',
    blur: true,
    closeable: true,
    draggableConfig: {
      initialPosition: 'half', // 'full' | 'half'
      handle: {
        color: '#ddd',
        hoverColor: '#bbb',
        activeColor: '#999'
      }
    }
  }
})
```

## Configuration Options

```typescript
interface ModalConfig {
  type?: 'modal' | 'side' | 'panel' | 'draggable'
  width?: number
  height?: number | string
  blur?: boolean
  closeable?: boolean
  corner?: string
  margin?: number
  padding?: number
  background?: string
  anim?: boolean
  draggableConfig?: {
    initialPosition?: 'full' | 'half'
    hideHandle?: boolean
    handle?: {
      color?: string
      hoverColor?: string
      activeColor?: string
      height?: string
      width?: string
      radius?: string
      marginTop?: string
      marginBottom?: string
    }
  }
}
```

## API

### useModal(component, options)

Opens a modal and returns a promise that resolves with the modal result.

**Parameters:**
- `component`: Vue component to render in the modal
- `options`: Modal configuration object

**Returns:** `Promise<any>` - Resolves when modal is closed

### ModalRoot

Global component that manages modal rendering. Must be added to your app template.

## Styling

VueModaller uses CSS variables for easy customization:

```css
:root {
  --modal-backdrop-color: rgba(0, 0, 0, 0.5);
  --modal-background-color: #ffffff;
  --modal-border-radius: 0.75rem;
  --modal-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  --modal-draggable-handle-color: #ddd;
  /* ... more variables */
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
