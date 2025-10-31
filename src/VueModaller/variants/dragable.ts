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
    translateY.value = positions[config.initialPosition as keyof typeof positions]
    lastTranslate = positions[config.initialPosition as keyof typeof positions]
  }

  const openPanel = () => {
    open.value = true
    translateY.value = positions.half
    lastTranslate = positions.half
  }

  const closePanel = () => {
    translateY.value = positions.closed
    setTimeout(() => {
      open.value = false
      closeCallback()
    }, 300)
  }

  const startDrag = (e: PointerEvent | TouchEvent) => {
    isDragging.value = true
    dragging = true
    startY = e instanceof PointerEvent ? e.clientY : e.touches?.[0]?.clientY || 0
    lastY = startY
    lastTime = Date.now()

    document.addEventListener("pointermove", drag)
    document.addEventListener("pointerup", endDrag)
    document.addEventListener("touchmove", drag)
    document.addEventListener("touchend", endDrag)
  }

  const drag = (e: Event) => {
    if (!dragging) return

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

  const endDrag = () => {
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

    // Downward motion logic
    if (velocity > 0.5) {
      if (lastTranslate === positions.full) {
        // from full → go to half
        translateY.value = positions.half
      } else {
        // from half → close
        closePanel()
        return
      }
    }
    // Upward motion logic
    else if (velocity < -0.5) {
      translateY.value = positions.full
    } else {
      // Snap to closest position if slow drag
      if (minDiff === diffToFull) translateY.value = positions.full
      else if (minDiff === diffToHalf) translateY.value = positions.half
      else {
        closePanel()
        return
      }
    }

    lastTranslate = translateY.value
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
    panel,
    openPanel,
    closePanel,
    startDrag,
    handleBackdropClick,
    initPositions
  }
}
