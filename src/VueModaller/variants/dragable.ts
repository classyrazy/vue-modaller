import { ref, onMounted, onUnmounted } from 'vue'
import { DraggableConfig } from '~/types/global'

export interface DragableState {
  open: boolean
  translateY: number
  isDragging: boolean
  positions: {
    full: number
    half: number
    closed: number
  }
}
const defaultConfig: DraggableConfig = {
  initialPosition: "half",
  hideHandle: false,
  handle: {
    color: "#ccc",
    height: "5px",
    width: "45px",
    hoverColor: "#999",
    activeColor: "#666"
  }
}
export const useDraggable = (config: DraggableConfig = defaultConfig, closeCallback: () => void) => {
  const open = ref(false)
  const translateY = ref(0)
  const isDragging = ref(false)
  const isAnimating = ref(false)
  
  let startY = 0
  let currentY = 0
  let dragging = false
  let viewportHeight = 0
  let positions = { full: 0, half: 0, closed: 0 }
  let lastTranslate = 0
  let velocity = 0
  let lastTime = 0
  let lastY = 0

  const panel = ref<HTMLElement | null>(null)

  const initPositions = () => {
    viewportHeight = window.innerHeight
    positions = {
      full: 0,
      half: viewportHeight * 0.4,
      closed: viewportHeight,
    }
    // Start with modal off-screen (closed position)
    translateY.value = positions.closed
    lastTranslate = positions.closed
  }

  // Smooth animation function using requestAnimationFrame
  const animateToPosition = (targetPosition: number, duration: number = 300): Promise<void> => {
    return new Promise((resolve) => {
      if (isAnimating.value) return resolve()
      
      isAnimating.value = true
      const startPosition = translateY.value
      const distance = targetPosition - startPosition
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Use easeOutCubic for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        
        translateY.value = startPosition + (distance * easeOutCubic)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          isAnimating.value = false
          lastTranslate = translateY.value
          resolve()
        }
      }
      
      requestAnimationFrame(animate)
    })
  }

  // Open panel with smooth animation
  const openPanel = async () => {
    await animateToPosition(positions[config.initialPosition as keyof typeof positions], 400)
  }

  // Close panel with smooth animation
  const closePanel = async () => {
    await animateToPosition(positions.closed, 300)
    // Call the close callback after animation completes
    if (closeCallback) {
      setTimeout(() => closeCallback(), 50)
    }
  }

  const startDrag = (e: Event) => {
    // Don't start drag if currently animating
    if (isAnimating.value) return
    
    isDragging.value = true
    dragging = true
    const pointerEvent = e as PointerEvent | TouchEvent
    startY = pointerEvent instanceof PointerEvent ? pointerEvent.clientY : (pointerEvent as TouchEvent).touches?.[0]?.clientY || 0
    lastY = startY
    lastTime = Date.now()

    document.addEventListener("pointermove", drag)
    document.addEventListener("pointerup", endDrag)
    document.addEventListener("touchmove", drag, { passive: false })
    document.addEventListener("touchend", endDrag)
  }

  const drag = (e: Event) => {
    if (!dragging || isAnimating.value) return

    const pointerEvent = e as PointerEvent | TouchEvent
    currentY = pointerEvent instanceof PointerEvent ? pointerEvent.clientY : (pointerEvent as TouchEvent).touches?.[0]?.clientY || 0
    const delta = currentY - startY
    const next = lastTranslate + delta

    // velocity calculation
    const now = Date.now()
    const dy = currentY - lastY
    const dt = now - lastTime
    velocity = dy / dt
    lastY = currentY
    lastTime = now

    // Clamp
    if (next < positions.full) translateY.value = positions.full
    else if (next > positions.closed) translateY.value = positions.closed
    else translateY.value = next
  }

  const endDrag = async () => {
    isDragging.value = false
    dragging = false
    document.removeEventListener("pointermove", drag)
    document.removeEventListener("pointerup", endDrag)
    document.removeEventListener("touchmove", drag)
    document.removeEventListener("touchend", endDrag)

    const current = translateY.value
    const diffToFull = Math.abs(current - positions.full)
    const diffToHalf = Math.abs(current - positions.half)
    const diffToClosed = Math.abs(current - positions.closed)

    const minDiff = Math.min(diffToFull, diffToHalf, diffToClosed)

    // Determine target position based on velocity and proximity
    let targetPosition = positions.half

    // Downward motion logic
    if (velocity > 0.5) {
      if (lastTranslate === positions.full) {
        targetPosition = positions.half
      } else {
        targetPosition = positions.closed
      }
    }
    // Upward motion logic
    else if (velocity < -0.5) {
      targetPosition = positions.full
    } else {
      // Snap to closest position if slow drag
      if (minDiff === diffToFull) targetPosition = positions.full
      else if (minDiff === diffToHalf) targetPosition = positions.half
      else targetPosition = positions.closed
    }

    // Animate to target position
    if (targetPosition === positions.closed) {
      await closePanel()
    } else {
      await animateToPosition(targetPosition, 250)
    }
  }

  const handleBackdropClick = () => {
    closePanel()
  }

  onMounted(() => {
    initPositions()
  })

  onUnmounted(() => {
    document.removeEventListener("pointermove", drag)
    document.removeEventListener("pointerup", endDrag)
    document.removeEventListener("touchmove", drag)
    document.removeEventListener("touchend", endDrag)
  })

  return {
    open,
    translateY,
    isDragging,
    isAnimating,
    panel,
    openPanel,
    closePanel,
    startDrag,
    handleBackdropClick,
    initPositions,
    animateToPosition
  }
}
