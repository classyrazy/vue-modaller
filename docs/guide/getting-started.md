# Getting Started

Welcome to VueModaller! This guide will help you get up and running with beautiful modals in your Vue 3 application.

## What is VueModaller?

VueModaller is a powerful and flexible modal system for Vue 3 that provides:

- 🎭 **Multiple Modal Types** - Standard, side panels, bottom panels, and draggable sheets
- 📱 **Responsive Design** - Automatic adaptation between mobile and desktop
- 🎨 **Customizable** - CSS variables, themes, and custom styling
- 🚀 **TypeScript Support** - Full type safety and excellent DX
- ✨ **Smooth Animations** - CSS and JavaScript-powered animations

## Installation

Choose your preferred package manager:

::: code-group

```bash [npm]
npm install vue-modaller
```

```bash [yarn]
yarn add vue-modaller
```

```bash [pnpm]
pnpm add vue-modaller
```

:::

## Basic Setup

### 1. Install the Plugin

Add VueModaller to your Vue application:

```typescript
import { createApp } from 'vue'
import VueModaller from 'vue-modaller'
import 'vue-modaller/dist/style.css' // Import styles
import App from './App.vue'

const app = createApp(App)
app.use(VueModaller)
app.mount('#app')
```

### 2. Add ModalRoot Component

Add the `ModalRoot` component to your main app template:

```vue
<template>
  <div id="app">
    <!-- Your application content -->
    <router-view />
    
    <!-- Modal container - must be included -->
    <ModalRoot />
  </div>
</template>
```

::: tip
The `ModalRoot` component should be placed at the root level of your application, typically in `App.vue`. It handles the rendering and management of all modals.
:::

## Your First Modal

### Create Modal Content

Create a simple modal component:

```vue
<!-- components/WelcomeModal.vue -->
<template>
  <div class="welcome-modal">
    <h2>Welcome to VueModaller!</h2>
    <p>{{ message }}</p>
    
    <div class="actions">
      <button @click="handleClose(false)">Cancel</button>
      <button @click="handleClose(true)" class="primary">
        Get Started
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string
}>()

const emit = defineEmits<{
  close: [result: boolean]
}>()

const handleClose = (result: boolean) => {
  emit('close', result)
}
</script>

<style scoped>
.welcome-modal {
  padding: 20px;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### Use the Modal

Now use the `useModal` composable to open your modal:

```vue
<!-- pages/HomePage.vue -->
<template>
  <div class="home">
    <h1>My App</h1>
    <button @click="openWelcomeModal">
      Open Welcome Modal
    </button>
    
    <p v-if="lastResult !== null">
      Last result: {{ lastResult ? 'Started' : 'Cancelled' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModal } from 'vue-modaller'
import WelcomeModal from '@/components/WelcomeModal.vue'

const lastResult = ref<boolean | null>(null)

const openWelcomeModal = async () => {
  try {
    const result = await useModal(WelcomeModal, {
      title: 'Welcome',
      config: {
        type: 'modal',
        width: 500,
        blur: true,
        closeable: true
      },
      props: {
        message: 'Thanks for trying VueModaller!'
      }
    })
    
    lastResult.value = result
    console.log('Modal closed with result:', result)
  } catch (error) {
    console.log('Modal was dismissed')
  }
}
</script>
```

## Understanding the Result

The `useModal` function returns a Promise that resolves when the modal is closed:

```typescript
const result = await useModal(Component, options)
```

- **Resolves** with the value passed to `emit('close', value)`
- **Rejects** if the modal is dismissed (clicking outside, ESC key, etc.)

## Next Steps

Congratulations! You now have a working modal system. Here's what to explore next:

- 📖 **[Modal Types](/guide/modal-types)** - Learn about different modal types
- 🎨 **[Styling](/guide/styling)** - Customize the appearance
- 📱 **[Responsive Design](/guide/responsive)** - Adaptive mobile/desktop layouts
- ⚙️ **[Configuration](/guide/configuration)** - All available options
- 🔧 **[Advanced Usage](/guide/advanced)** - Slots, stacking, and more

## Common Issues

### Styles Not Loading

Make sure to import the CSS:

```typescript
import 'vue-modaller/dist/style.css'
```

### ModalRoot Not Found

Ensure you've added `<ModalRoot />` to your app template and the plugin is installed.

### TypeScript Errors

The package includes full TypeScript definitions. If you're getting errors, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```
