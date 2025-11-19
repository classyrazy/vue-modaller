# Modal Types

VueModaller provides four distinct modal types, each designed for specific use cases and user experiences.

## Standard Modal

The classic modal dialog, perfect for confirmations, forms, and content display.

### Usage

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

### Characteristics

- **Position**: Centered on screen
- **Backdrop**: Semi-transparent overlay
- **Animation**: Zoom in/out effect
- **Best for**: Forms, confirmations, content display

### Example

```vue
<script setup>
import { useModal } from 'vue-modaller'
import ContactForm from './ContactForm.vue'

const openContactForm = async () => {
  const result = await useModal(ContactForm, {
    title: 'Contact Us',
    config: {
      type: 'modal',
      width: 600,
      height: 500,
      blur: true,
      closeable: true,
      corner: '16px'
    }
  })
}
</script>
```

## Side Panel

Slide-in panels from the side, ideal for navigation, filters, and secondary content.

### Usage

```typescript
const result = await useModal(Component, {
  config: {
    type: 'side',
    blur: true,
    margin: 20 // Top margin from viewport
  }
})
```

### Characteristics

- **Position**: Right side of screen
- **Animation**: Slide in from right
- **Height**: Full viewport height
- **Best for**: Navigation menus, filters, settings

### Example

```vue
<script setup>
import { useModal } from 'vue-modaller'
import NavigationMenu from './NavigationMenu.vue'

const openNavigation = async () => {
  await useModal(NavigationMenu, {
    config: {
      type: 'side',
      blur: true,
      margin: 0,
      width: 320
    }
  })
}
</script>
```

## Panel Modal

Bottom-aligned panels with rounded top corners, great for mobile-first designs.

### Usage

```typescript
const result = await useModal(Component, {
  config: {
    type: 'panel',
    height: '60vh',
    corner: '16px'
  }
})
```

### Characteristics

- **Position**: Bottom of screen
- **Animation**: Slide up from bottom
- **Shape**: Rounded top corners
- **Best for**: Mobile interfaces, quick actions, content preview

### Example

```vue
<script setup>
import { useModal } from 'vue-modaller'
import ShareOptions from './ShareOptions.vue'

const openSharePanel = async () => {
  await useModal(ShareOptions, {
    title: 'Share',
    config: {
      type: 'panel',
      height: '50vh',
      corner: '20px',
      blur: true
    }
  })
}
</script>
```

## Draggable Modal

Instagram-style draggable bottom sheets with smooth gesture interactions.

### Usage

```typescript
const result = await useModal(Component, {
  config: {
    type: 'draggable',
    draggableConfig: {
      initialPosition: 'half',
      hideHandle: false,
      shadow: '0 -8px 24px rgba(0,0,0,0.15)',
      handle: {
        color: '#e0e0e0',
        hoverColor: '#bdbdbd',
        activeColor: '#9e9e9e'
      }
    }
  }
})
```

### Characteristics

- **Position**: Bottom of screen
- **Interaction**: Drag to resize/close
- **Positions**: Full, half, closed
- **Handle**: Visual drag indicator
- **Best for**: Interactive content, media viewers, detailed forms

### Drag Positions

```typescript
// Initial positions
'full'  // Covers entire viewport
'half'  // Covers ~60% of viewport height
```

### Handle Customization

```typescript
draggableConfig: {
  handle: {
    color: '#e0e0e0',       // Default color
    hoverColor: '#bdbdbd',   // Hover state
    activeColor: '#9e9e9e',  // Active/pressed state
    width: '48px',           // Handle width
    height: '4px',           // Handle thickness
    radius: '2px',           // Border radius
    marginTop: '12px',       // Top spacing
    marginBottom: '8px'      // Bottom spacing
  }
}
```

### Gesture Behavior

The draggable modal responds intelligently to user gestures:

- **Fast swipe down**: Closes immediately
- **Fast swipe up**: Expands to full height
- **Slow drag**: Snaps to nearest position
- **Velocity-based**: Animation speed matches gesture speed

### Example

```vue
<script setup>
import { useModal } from 'vue-modaller'
import ImageGallery from './ImageGallery.vue'

const openGallery = async () => {
  await useModal(ImageGallery, {
    config: {
      type: 'draggable',
      draggableConfig: {
        initialPosition: 'half',
        hideHandle: false,
        shadow: '0 -12px 40px rgba(0,0,0,0.25)',
        handle: {
          color: '#d1d5db',
          hoverColor: '#9ca3af',
          activeColor: '#6b7280',
          width: '56px',
          height: '4px',
          radius: '2px'
        }
      }
    }
  })
}
</script>
```

## Responsive Modal Types

You can specify different modal types for mobile and desktop:

```typescript
const result = await useModal(Component, {
  config: {
    type: 'modal',           // Desktop type
    mobileType: 'draggable', // Mobile type
    width: 600,
    draggableConfig: {
      initialPosition: 'half'
    }
  }
})
```

This will show:
- **Desktop**: Standard centered modal
- **Mobile**: Draggable bottom sheet

## Choosing the Right Type

| Use Case | Recommended Type | Why |
|----------|------------------|-----|
| **Forms & Dialogs** | `modal` | Focused interaction, clear boundaries |
| **Navigation** | `side` | Familiar pattern, doesn't block content |
| **Quick Actions** | `panel` | Easy access, mobile-friendly |
| **Content Viewing** | `draggable` | Interactive, engaging, flexible sizing |
| **Mobile-First** | `panel` or `draggable` | Touch-optimized, natural gestures |
| **Desktop-First** | `modal` or `side` | Mouse-optimized, precise positioning |

## Animation Timing

Each modal type has optimized animation timing:

- **Modal**: 300ms zoom with ease-out
- **Side**: 350ms slide with cubic-bezier easing
- **Panel**: 350ms slide-up with smooth easing  
- **Draggable**: Variable speed based on gesture velocity

## Next Steps

- 🎨 **[Styling Guide](/guide/styling)** - Customize appearance
- 📱 **[Responsive Design](/guide/responsive)** - Device-specific behavior
- ⚙️ **[Configuration](/guide/configuration)** - All options explained
