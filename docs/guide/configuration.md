# Configuration

VueModaller provides extensive configuration options to customize the behavior and appearance of your modals.

## ModalConfig Interface

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

## Basic Configuration

### Type & Responsive Types

```typescript
{
  type: 'modal',           // Desktop modal type
  mobileType: 'draggable'  // Mobile modal type (optional)
}
```

Available types: `'modal'`, `'side'`, `'panel'`, `'draggable'`

### Dimensions

```typescript
{
  width: 600,              // Width in pixels (number)
  height: '80vh'           // Height (number in px or string)
}
```

**Width**: 
- Default: `450px` for modal, `100%` for others
- Only applies to `modal` type
- Ignored on mobile devices

**Height**:
- Default: `100%` for draggable, auto for others
- Can be number (pixels) or string (`'80vh'`, `'500px'`)
- Not applicable to draggable modals

### Appearance

```typescript
{
  blur: true,              // Backdrop blur effect
  closeable: true,         // Allow clicking outside to close
  corner: '16px',          // Border radius
  margin: 20,              // Top margin (side panels only)
  padding: '24px',         // Internal padding
  background: 'dark'       // Background color class
}
```

**Blur**: Applies backdrop-filter blur to the modal backdrop

**Closeable**: When `true`, clicking outside the modal will close it

**Corner**: Border radius applied based on modal type:
- `modal`: All corners
- `side`: Left side corners only  
- `panel/draggable`: Top corners only

**Margin**: Top margin for side panels (creates space from viewport top)

**Background**: CSS class name for custom backgrounds

### Animation

```typescript
{
  anim: true  // Enable/disable CSS animations
}
```

When `false`, disables entry/exit animations for the modal.

## Draggable Configuration

### DraggableConfig Interface

```typescript
interface DraggableConfig {
  initialPosition?: 'full' | 'half'
  hideHandle?: boolean
  shadow?: string
  handle?: HandleConfig
}
```

### Initial Position

```typescript
{
  draggableConfig: {
    initialPosition: 'half'  // 'full' | 'half'
  }
}
```

- **`'half'`**: Opens at ~60% of viewport height
- **`'full'`**: Opens at full viewport height

### Handle Configuration

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

#### Complete Handle Example

```typescript
{
  draggableConfig: {
    hideHandle: false,
    handle: {
      color: '#e5e7eb',           // Default state
      hoverColor: '#d1d5db',      // Mouse hover
      activeColor: '#9ca3af',     // Pressed/dragging
      width: '48px',              // Handle width
      height: '4px',              // Handle thickness
      radius: '2px',              // Border radius
      marginTop: '12px',          // Space above handle
      marginBottom: '8px'         // Space below handle
    }
  }
}
```

### Shadow Customization

```typescript
{
  draggableConfig: {
    shadow: '0 -8px 32px rgba(0, 0, 0, 0.2)'
  }
}
```

Custom box-shadow for the draggable modal. Applied only to draggable type.

## Complete Examples

### Standard Modal

```typescript
const result = await useModal(Component, {
  title: 'Settings',
  config: {
    type: 'modal',
    width: 700,
    height: 600,
    blur: true,
    closeable: true,
    corner: '12px',
    padding: '32px',
    anim: true
  },
  props: {
    userId: 123
  }
})
```

### Responsive Draggable

```typescript
const result = await useModal(Component, {
  config: {
    type: 'modal',
    mobileType: 'draggable',
    width: 600,
    blur: true,
    closeable: true,
    draggableConfig: {
      initialPosition: 'half',
      hideHandle: false,
      shadow: '0 -12px 48px rgba(0, 0, 0, 0.15)',
      handle: {
        color: '#cbd5e1',
        hoverColor: '#94a3b8',
        activeColor: '#64748b',
        width: '56px',
        height: '5px',
        radius: '2.5px',
        marginTop: '16px',
        marginBottom: '12px'
      }
    }
  }
})
```

### Side Panel with Custom Styling

```typescript
const result = await useModal(Component, {
  config: {
    type: 'side',
    margin: 24,
    corner: '16px',
    blur: true,
    background: 'glass',
    padding: '0', // Custom padding via CSS
    anim: true
  }
})
```

## UseModal Options

The complete options object for `useModal`:

```typescript
interface UseModalOptions {
  title?: string
  config: ModalConfig
  props?: Record<string, any>
  slots?: Record<string, SlotConfig>
}

interface SlotConfig {
  component: Component
  props: Record<string, any>
}
```

### Complete Example

```typescript
const result = await useModal(MyComponent, {
  title: 'User Profile',
  config: {
    type: 'modal',
    mobileType: 'panel',
    width: 800,
    blur: true,
    closeable: true,
    corner: '16px',
    onClosed: () => console.log('Modal closed')
  },
  props: {
    userId: 42,
    readonly: false
  },
  slots: {
    header: {
      component: CustomHeader,
      props: { showBack: true }
    },
    footer: {
      component: ActionButtons,
      props: { 
        showSave: true,
        showCancel: true 
      }
    }
  }
})
```

## Default Values

VueModaller provides sensible defaults for all configuration options:

```typescript
const defaultConfig = {
  type: 'modal',
  width: 450,
  background: 'white',
  padding: '20px',
  closeable: true,
  blur: true,
  corner: '10px',
  margin: 0,
  height: 'auto',
  anim: true,
  draggableConfig: {
    initialPosition: 'half',
    hideHandle: false,
    handle: {
      color: '#ccc',
      hoverColor: '#999',
      activeColor: '#666',
      height: '5px',
      width: '45px',
      radius: '4px',
      marginTop: '10px',
      marginBottom: '10px'
    }
  }
}
```

## Validation

VueModaller validates configuration options and provides helpful warnings:

- Invalid modal types fallback to `'modal'`
- Negative dimensions are ignored
- Invalid colors fallback to defaults
- Missing required draggable config uses defaults

## Next Steps

- 🎨 **[Styling Guide](/guide/styling)** - CSS customization
- 📱 **[Responsive Design](/guide/responsive)** - Device adaptation
- 🔧 **[Advanced Usage](/guide/advanced)** - Complex scenarios
