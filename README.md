# VueModaller 🎭

A flexible and powerful modal system for Vue 3 applications with TypeScript support. Create beautiful modals with draggable functionality, side panels, and smooth animations.

![Version](https://img.shields.io/npm/v/vue-modaller)
![License](https://img.shields.io/npm/l/vue-modaller)
![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-Support-blue)

## ✨ Features

🎯 **Multiple Modal Types**
- **Standard Modal** - Classic centered modals
- **Side Panel** - Slide-in panels from the side 
- **Panel Modal** - Bottom-aligned panels with rounded top corners
- **Draggable Modal** - Instagram-style draggable bottom sheets

📱 **Responsive Design**
- **Device Detection** - Automatic mobile/desktop detection
- **Adaptive Types** - Different modal types for mobile vs desktop
- **Touch Gestures** - Smooth drag and swipe interactions
- **Velocity-based** - Smart animations based on gesture speed

🎨 **Highly Customizable**
- **CSS Variables** - Easy theming with CSS custom properties
- **BEM Methodology** - Clean, maintainable CSS architecture
- **Custom Animations** - Smooth CSS and JavaScript animations
- **Handle Styling** - Fully customizable drag handles

🚀 **Developer Experience**
- **TypeScript** - Full TypeScript support with detailed types
- **Vue 3** - Built for Vue 3 Composition API
- **Easy Integration** - Simple composable-based API
- **Global Components** - Auto-registered components
- **Slot Support** - Dynamic slot content with props

## 📦 Installation

```bash
npm install vue-modaller
```

```bash
yarn add vue-modaller
```

```bash
pnpm add vue-modaller
```

## 🚀 Quick Start

### 1. Install the Plugin

```typescript
import { createApp } from 'vue'
import VueModaller from 'vue-modaller'
import 'vue-modaller/dist/style.css' // Import styles
import App from './App.vue'

const app = createApp(App)
app.use(VueModaller)
app.mount('#app')
```

### 2. Add ModalRoot to Your App

```vue
<template>
  <div id="app">
    <!-- Your app content -->
    <ModalRoot />
  </div>
</template>
```

### 3. Create Your First Modal

```vue
<script setup lang="ts">
import { useModal } from 'vue-modaller'
import MyModalContent from './MyModalContent.vue'

const openStandardModal = async () => {
  const result = await useModal(MyModalContent, {
    title: 'Welcome!',
    config: {
      type: 'modal',
      width: 500,
      blur: true,
      closeable: true
    },
    props: {
      message: 'Hello from VueModaller!'
    }
  })
  console.log('Modal result:', result)
}
</script>

<template>
  <button @click="openStandardModal">
    Open Modal
  </button>
</template>
```

## 🎭 Modal Types

### Standard Modal
Perfect for confirmations, forms, and general content display.

```typescript
const result = await useModal(Component, {
  config: {
    type: 'modal',
    width: 500,
    height: 400,
    blur: true,
    corner: '12px'
  }
})
```

### Side Panel
Great for navigation menus, filters, and side content.

```typescript
const result = await useModal(Component, {
  config: {
    type: 'side',
    blur: true,
    margin: 20 // Top margin
  }
})
```

### Panel Modal
Bottom-aligned panels with rounded corners, perfect for mobile interfaces.

```typescript
const result = await useModal(Component, {
  config: {
    type: 'panel',
    height: '60vh',
    corner: '16px'
  }
})
```

### Draggable Modal (Instagram-style)
Interactive bottom sheets with smooth drag gestures.

```typescript
const result = await useModal(Component, {
  config: {
    type: 'draggable',
    draggableConfig: {
      initialPosition: 'half', // 'full' | 'half'
      hideHandle: false,
      shadow: '0 -8px 24px rgba(0,0,0,0.15)',
      handle: {
        color: '#e0e0e0',
        hoverColor: '#bdbdbd',
        activeColor: '#9e9e9e',
        width: '48px',
        height: '4px',
        radius: '2px'
      }
    }
  }
})
```

## 📱 Responsive Modals

Automatically adapt modal types based on device:

```typescript
const result = await useModal(Component, {
  config: {
    type: 'modal',        // Desktop type
    mobileType: 'draggable', // Mobile type
    width: 600,
    draggableConfig: {
      initialPosition: 'half'
    }
  }
})
```

When viewed on mobile, this will show a draggable modal instead of a standard modal!

## ⚙️ Configuration API

### ModalConfig Interface

```typescript
interface ModalConfig {
  // Modal type
  type?: 'modal' | 'side' | 'panel' | 'draggable'
  mobileType?: 'modal' | 'side' | 'panel' | 'draggable'
  
  // Dimensions
  width?: number
  height?: number | string
  
  // Appearance
  blur?: boolean           // Backdrop blur effect
  closeable?: boolean      // Allow closing by clicking outside
  corner?: string          // Border radius
  margin?: number          // Top margin (side panels)
  padding?: string         // Internal padding
  background?: string      // Background color class
  
  // Animation
  anim?: boolean          // Enable/disable animations
  
  // Draggable specific
  draggableConfig?: DraggableConfig
  
  // Lifecycle
  onClosed?: () => void   // Callback when modal closes
}
```

### DraggableConfig Interface

```typescript
interface DraggableConfig {
  initialPosition?: 'full' | 'half'
  hideHandle?: boolean
  shadow?: string
  handle?: {
    color?: string
    hoverColor?: string  
    activeColor?: string
    height?: string
    width?: string
    radius?: string | number
    marginTop?: string | number
    marginBottom?: string | number
  }
}
```

## 🎨 Styling & Theming

VueModaller uses CSS custom properties for easy theming:

```css
:root {
  /* Backdrop */
  --modal-backdrop: rgba(0, 0, 0, 0.2);
  
  /* Modal */
  --white: #ffffff;
  --modal-border-radius: 0.75rem;
  --modal-padding: 1rem;
  --modal-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --modal-z-index: 9999;
  
  /* Draggable Handle */
  --modal-draggable-handle-color: #ccc;
  --modal-draggable-handle-hover-color: #999;
  --modal-draggable-handle-active-color: #666;
  --modal-draggable-handle-height: 5px;
  --modal-draggable-handle-width: 45px;
  --modal-draggable-handle-radius: 4px;
}
```

### Custom Themes

```css
/* Dark theme example */
:root {
  --white: #1a1a1a;
  --modal-backdrop: rgba(0, 0, 0, 0.8);
  --modal-draggable-handle-color: #444;
  --modal-draggable-handle-hover-color: #666;
}
```

## 🔧 Advanced Usage

### Dynamic Slot Content

```typescript
const result = await useModal(Component, {
  config: { type: 'modal' },
  slots: {
    header: {
      component: MyHeaderComponent,
      props: { title: 'Custom Header' }
    },
    footer: {
      component: MyFooterComponent,
      props: { showActions: true }
    }
  }
})
```

### Multiple Modals

```typescript
// Stack multiple modals
const modal1 = useModal(Component1, { config: { type: 'modal' } })
const modal2 = useModal(Component2, { config: { type: 'side' } })

// Close all modals
import { closeAllModal } from 'vue-modaller'
closeAllModal()
```

### Modal Results

```typescript
// In your modal component
<script setup>
const emit = defineEmits(['close'])

const handleSubmit = () => {
  emit('close', { success: true, data: formData })
}

const handleCancel = () => {
  emit('close', { success: false })
}
</script>

// Usage
const result = await useModal(MyForm, { config: { type: 'modal' } })
if (result.success) {
  console.log('Form data:', result.data)
}
```

## 📱 Device Detection

VueModaller includes a powerful device detection composable:

```typescript
import { useDeviceDetection } from 'vue-modaller'

export default {
  setup() {
    const { isMobile, isTablet, isDesktop, detectDevice } = useDeviceDetection()
    
    return {
      isMobile,
      isTablet, 
      isDesktop
    }
  }
}
```

## 🎯 Best Practices

### Mobile-First Design
```typescript
// Recommended pattern for responsive modals
const openModal = async () => {
  await useModal(Component, {
    config: {
      type: 'modal',
      mobileType: 'draggable', // Better UX on mobile
      width: 600,
      draggableConfig: {
        initialPosition: 'half'
      }
    }
  })
}
```

### Performance Optimization
```typescript
// Use markRaw for large components
import { markRaw } from 'vue'
const HeavyComponent = markRaw(MyHeavyComponent)

await useModal(HeavyComponent, {
  config: { type: 'modal' }
})
```

## 🔍 Examples

Check out our [live examples](https://classyrazy.github.io/vue-modaller/) to see VueModaller in action!

## 📄 API Reference

### Functions

#### `useModal(component, options)`
Opens a modal and returns a promise.

**Parameters:**
- `component` - Vue component to render
- `options` - Configuration object

**Returns:** `Promise<any>` - Resolves with modal result

#### `closeModal(data, index)`
Programmatically close a specific modal.

#### `closeAllModal(data)`
Close all open modals.

### Components

#### `<ModalRoot />`
Global modal container. Must be included in your app.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

MIT © [Classydev](https://github.com/classyrazy)

## 🙋‍♂️ Support

- 📚 [Documentation](https://classyrazy.github.io/vue-modaller/)
- 🐛 [Report Issues](https://github.com/classyrazy/vue-modaller/issues)
- 💬 [Discussions](https://github.com/classyrazy/vue-modaller/discussions)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/classyrazy">Classydev</a></p>
  
  <p>
    <a href="https://github.com/classyrazy/vue-modaller/stargazers">⭐ Star on GitHub</a> • 
    <a href="https://www.npmjs.com/package/vue-modaller">📦 NPM Package</a>
  </p>
</div>
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
