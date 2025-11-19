# API Reference

Complete API documentation for VueModaller functions, components, and composables.

## Functions

### useModal()

Opens a modal and returns a promise that resolves when the modal is closed.

```typescript
useModal<T = any>(
  component: Component,
  options?: UseModalOptions
): Promise<T>
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `component` | `Component` | Yes | Vue component to render in the modal |
| `options` | `UseModalOptions` | No | Modal configuration and props |

#### Returns

`Promise<T>` - Resolves with the value passed to the modal's `close` event, rejects if modal is dismissed.

#### Example

```typescript
import { useModal } from 'vue-modaller'
import MyModal from './MyModal.vue'

const result = await useModal(MyModal, {
  title: 'My Modal',
  config: {
    type: 'modal',
    width: 500
  },
  props: {
    message: 'Hello!'
  }
})

console.log('Modal result:', result)
```

### closeModal()

Programmatically close a specific modal by index.

```typescript
closeModal(data: any, modalIndex: number): any
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `any` | Data to resolve the modal promise with |
| `modalIndex` | `number` | Index of the modal to close (0-based) |

#### Example

```typescript
import { closeModal } from 'vue-modaller'

// Close the first modal with result data
closeModal({ success: true }, 0)
```

### closeAllModal()

Close all open modals at once.

```typescript
closeAllModal(data?: any): void
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `any` | Optional data to resolve all modal promises with |

#### Example

```typescript
import { closeAllModal } from 'vue-modaller'

// Close all modals
closeAllModal()

// Close all modals with data
closeAllModal({ reason: 'navigation' })
```

## Composables

### useDeviceDetection()

Provides reactive device type detection for responsive modal behavior.

```typescript
useDeviceDetection(): DeviceDetection
```

#### Returns

```typescript
interface DeviceDetection {
  isMobile: Ref<boolean>
  isTablet: Ref<boolean>
  isDesktop: Ref<boolean>
  detectDevice: () => void
}
```

#### Example

```typescript
import { useDeviceDetection } from 'vue-modaller'

export default {
  setup() {
    const { isMobile, isDesktop, detectDevice } = useDeviceDetection()
    
    // Manually trigger detection
    detectDevice()
    
    return {
      isMobile,
      isDesktop
    }
  }
}
```

## Components

### ModalRoot

Global modal container that manages modal rendering. Must be included in your application.

```vue
<ModalRoot />
```

#### Props

None. This component is automatically managed by the VueModaller plugin.

#### Events

None. All modal interactions are handled through the composable API.

#### Example

```vue
<template>
  <div id="app">
    <router-view />
    
    <!-- Required for modal functionality -->
    <ModalRoot />
  </div>
</template>
```

## Types

### UseModalOptions

Configuration object for the `useModal` function.

```typescript
interface UseModalOptions {
  title?: string
  config: ModalConfig
  props?: Record<string, any>
  slots?: Record<string, SlotConfig>
}
```

### ModalConfig

Main configuration interface for modal behavior and appearance.

```typescript
interface ModalConfig {
  // Modal Type
  type?: 'modal' | 'side' | 'panel' | 'draggable'
  mobileType?: 'modal' | 'side' | 'panel' | 'draggable'
  
  // Dimensions
  width?: number
  height?: number | string
  
  // Appearance
  blur?: boolean
  closeable?: boolean
  corner?: string
  margin?: number
  padding?: string
  background?: string
  
  // Animation
  anim?: boolean
  
  // Draggable Specific
  draggableConfig?: DraggableConfig
  
  // Lifecycle
  onClosed?: () => void
}
```

### DraggableConfig

Configuration specific to draggable modals.

```typescript
interface DraggableConfig {
  initialPosition?: 'full' | 'half'
  hideHandle?: boolean
  shadow?: string
  handle?: HandleConfig
}
```

### HandleConfig

Configuration for the draggable modal handle.

```typescript
interface HandleConfig {
  color?: string
  hoverColor?: string
  activeColor?: string
  height?: string
  width?: string
  radius?: string | number
  marginTop?: string | number
  marginBottom?: string | number
}
```

### SlotConfig

Configuration for dynamic slot content.

```typescript
interface SlotConfig {
  component: Component
  props: Record<string, any>
}
```

## Reactive State

VueModaller exposes several reactive refs for advanced use cases:

### modalOpen

Global modal open state.

```typescript
import { modalOpen } from 'vue-modaller'

console.log(modalOpen.value) // boolean
```

### modalOptions

Array of all active modal configurations.

```typescript
import { modalOptions } from 'vue-modaller'

console.log(modalOptions.value) // ModalConfig[]
```

### compRef

Array of active modal component references.

```typescript
import { compRef } from 'vue-modaller'

console.log(compRef.value) // Component[]
```

## Plugin Installation

### VueModaller

Main plugin object for Vue application installation.

```typescript
import VueModaller from 'vue-modaller'

app.use(VueModaller, options?)
```

#### Options

```typescript
interface PluginOptions {
  // Future configuration options
}
```

### createPlugin()

Alternative plugin creator function for backward compatibility.

```typescript
import { createPlugin } from 'vue-modaller'

const plugin = createPlugin(options)
app.use(plugin)
```

## Error Handling

### Modal Rejection

Modals reject their promise when dismissed (clicking outside, ESC key, etc.):

```typescript
try {
  const result = await useModal(Component, options)
  // Modal was closed normally
} catch (error) {
  // Modal was dismissed
  console.log('Modal dismissed')
}
```

### Validation Errors

VueModaller validates configuration and logs warnings for invalid options:

```typescript
// Invalid type - logs warning, falls back to 'modal'
useModal(Component, {
  config: {
    type: 'invalid-type' as any
  }
})
```

## Performance

### Component Optimization

For large components, use `markRaw` for better performance:

```typescript
import { markRaw } from 'vue'

const HeavyComponent = markRaw(MyHeavyComponent)

await useModal(HeavyComponent, options)
```

### Modal Cleanup

Modals are automatically cleaned up when closed. For manual cleanup:

```typescript
import { closeAllModal } from 'vue-modaller'

// Clean up all modals before navigation
closeAllModal()
```

## Browser Compatibility

VueModaller supports all modern browsers:

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

Features used:
- CSS Custom Properties
- ES6+ JavaScript
- Pointer Events
- Backdrop Filter (with fallback)

## Next Steps

- 🎨 **[Styling Guide](/guide/styling)** - Customize appearance
- 🔧 **[Advanced Usage](/guide/advanced)** - Complex scenarios
- 📚 **[Examples](/examples/)** - Live code examples
