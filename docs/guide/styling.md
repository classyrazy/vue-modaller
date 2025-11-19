# Styling Guide

VueModaller is built with customization in mind. Learn how to style and theme your modals to match your application's design.

## CSS Architecture

VueModaller uses **BEM methodology** for clean, maintainable CSS:

```css
/* Block */
.__modal-wrapper { }

/* Element */
.__modal-content { }

/* Modifier */
.__modal-content--draggable { }
```

## CSS Custom Properties

The easiest way to customize VueModaller is through CSS custom properties (variables):

### Core Variables

```css
:root {
  /* Backdrop */
  --modal-backdrop: rgba(0, 0, 0, 0.2);
  
  /* Modal Container */
  --white: #ffffff;
  --modal-border-radius: 0.75rem;
  --modal-padding: 1rem;
  --modal-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --modal-z-index: 9999;
  --modal-content-z-index: 99;
}
```

### Draggable Handle Variables

```css
:root {
  /* Handle Appearance */
  --modal-draggable-handle-color: #ccc;
  --modal-draggable-handle-hover-color: #999;
  --modal-draggable-handle-active-color: #666;
  
  /* Handle Dimensions */
  --modal-draggable-handle-height: 5px;
  --modal-draggable-handle-width: 45px;
  --modal-draggable-handle-radius: 4px;
  
  /* Handle Spacing */
  --modal-draggable-handle-margin-top: 10px;
  --modal-draggable-handle-margin-bottom: 10px;
}
```

## Theme Examples

### Dark Theme

```css
:root {
  --white: #1f2937;
  --modal-backdrop: rgba(0, 0, 0, 0.8);
  --modal-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
  
  /* Dark handle */
  --modal-draggable-handle-color: #374151;
  --modal-draggable-handle-hover-color: #4b5563;
  --modal-draggable-handle-active-color: #6b7280;
}
```

### Glassmorphism Theme

```css
:root {
  --white: rgba(255, 255, 255, 0.1);
  --modal-backdrop: rgba(255, 255, 255, 0.1);
  --modal-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  --modal-border-radius: 1rem;
}

.__modal-content {
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
```

### Minimal Theme

```css
:root {
  --modal-backdrop: rgba(0, 0, 0, 0.05);
  --modal-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --modal-border-radius: 0.5rem;
  
  /* Minimal handle */
  --modal-draggable-handle-color: #e5e7eb;
  --modal-draggable-handle-width: 32px;
  --modal-draggable-handle-height: 3px;
}
```

## BEM Classes Reference

### Wrapper Classes

```css
/* Main modal wrapper */
.__modal-wrapper { }

/* Wrapper modifiers */
.__modal-wrapper--centered { }    /* Standard modal */
.__modal-wrapper--side { }        /* Side panel */
.__modal-wrapper--panel { }       /* Panel modal */
.__modal-wrapper--draggable { }   /* Draggable modal */
```

### Content Classes

```css
/* Modal content container */
.__modal-content { }

/* Content modifiers */
.__modal-content--standard { }    /* Standard modal */
.__modal-content--side { }        /* Side panel */
.__modal-content--panel { }       /* Panel modal */
.__modal-content--draggable { }   /* Draggable modal */

/* Draggable states */
.__modal-content--dragging { }    /* While dragging */
.__modal-content--animating { }   /* During animation */
```

### Element Classes

```css
/* Backdrop */
.__modal-backdrop { }
.__modal-backdrop--blur { }

/* Modal body */
.__modal-body { }

/* Drag handle */
.__modal-drag-handle { }

/* Header */
.__modal-header { }
.__modal-header__title { }
.__modal-header__title--standard { }
.__modal-header__title--side { }
.__modal-header__close-btn { }
```

## Custom Styling Examples

### Custom Modal Sizes

```css
/* Large modal */
.__modal-content--large {
  max-width: 1200px;
  min-height: 600px;
}

/* Small modal */
.__modal-content--small {
  max-width: 400px;
}

/* Full screen modal */
.__modal-content--fullscreen {
  width: 100vw !important;
  height: 100vh !important;
  max-width: none;
  border-radius: 0;
}
```

### Custom Animations

```css
/* Custom slide animation */
@keyframes slideInCustom {
  from {
    transform: translate3d(-100%, 0, 0) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
}

.slideInCustom {
  animation-name: slideInCustom;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Custom Drag Handle

```css
/* Pill-shaped handle */
.__modal-drag-handle {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border-radius: 50px;
  width: 60px;
  height: 6px;
  position: relative;
  overflow: hidden;
}

.__modal-drag-handle::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

### Backdrop Variations

```css
/* Gradient backdrop */
.__modal-backdrop--gradient {
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
}

/* Dotted backdrop */
.__modal-backdrop--dotted {
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
}
```

## Responsive Styling

### Mobile-First Approach

```css
/* Mobile styles */
.__modal-content {
  padding: 1rem;
  margin: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .__modal-content {
    padding: 2rem;
    margin: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .__modal-content {
    padding: 3rem;
    max-width: 1200px;
  }
}
```

### Touch-Specific Styles

```css
/* Touch devices */
@media (pointer: coarse) {
  .__modal-drag-handle {
    height: 8px; /* Larger for touch */
    margin-top: 16px;
  }
  
  .__modal-header__close-btn {
    min-width: 44px; /* Touch target size */
    min-height: 44px;
  }
}

/* Precise pointer devices */
@media (pointer: fine) {
  .__modal-drag-handle {
    height: 4px; /* Smaller for mouse */
  }
  
  .__modal-content:hover {
    box-shadow: var(--modal-shadow), 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
}
```

## Advanced Customization

### CSS-in-JS Integration

With styled-components or similar:

```typescript
import styled from 'styled-components'

const CustomModalWrapper = styled.div`
  &.__modal-wrapper {
    backdrop-filter: blur(10px);
  }
  
  .__modal-content {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
  }
  
  .__modal-drag-handle {
    background: rgba(255, 255, 255, 0.3);
  }
`
```

### Dynamic Theming

```typescript
// Theme switching
const applyTheme = (theme: 'light' | 'dark' | 'colorful') => {
  const root = document.documentElement
  
  switch (theme) {
    case 'dark':
      root.style.setProperty('--white', '#1f2937')
      root.style.setProperty('--modal-backdrop', 'rgba(0, 0, 0, 0.8)')
      break
    case 'colorful':
      root.style.setProperty('--white', '#f3f4f6')
      root.style.setProperty('--modal-backdrop', 'rgba(139, 69, 19, 0.3)')
      break
    default:
      // Reset to light theme
      root.style.setProperty('--white', '#ffffff')
      root.style.setProperty('--modal-backdrop', 'rgba(0, 0, 0, 0.2)')
  }
}
```

## Performance Considerations

### GPU Acceleration

```css
/* Force GPU acceleration for smooth animations */
.__modal-content--draggable {
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

/* Optimize backdrop blur */
.__modal-backdrop--blur {
  backdrop-filter: blur(4px);
  transform: translateZ(0); /* Force GPU layer */
}
```

### Reduced Motion

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .__modal-content {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .__modal-drag-handle {
    transition: none !important;
  }
}
```

## Troubleshooting

### Common Issues

**Styles not applying:**
- Ensure CSS is imported: `import 'vue-modaller/dist/style.css'`
- Check CSS specificity - use `!important` if needed
- Verify BEM class names are correct

**Z-index conflicts:**
- Increase `--modal-z-index` variable
- Check for conflicting elements with higher z-index

**Animation glitches:**
- Add `transform: translate3d(0, 0, 0)` for GPU acceleration
- Reduce animation complexity for better performance

### Debug Mode

```css
/* Temporary debug styles */
.__modal-wrapper * {
  outline: 1px solid red !important;
}

.__modal-content * {
  background: rgba(255, 0, 0, 0.1) !important;
}
```

## Next Steps

- 📱 **[Responsive Design](/guide/responsive)** - Device-specific styling
- 🔧 **[Advanced Usage](/guide/advanced)** - Complex scenarios  
- 📚 **[Examples](/examples/)** - Live styling examples
