<template>
  <div class="app">
    <button class="open-btn" @click="openPanel">Show Comments</button>

    <div v-if="open" class="overlay" @click.self="closePanel">
      <div
        ref="panel"
        class="panel"
        :class="{ dragging: isDragging }"
        :style="{ transform: `translateY(${translateY}px)` }"
        @pointerdown="startDrag"
      >
        <div class="handle"></div>

        <div class="comments">
          <p v-for="n in 30" :key="n">Comment {{ n }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

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

const panel = ref(null)

onMounted(() => {
  viewportHeight = window.innerHeight
  positions = {
    full: 0,
    half: viewportHeight * 0.4,
    closed: viewportHeight,
  }
  translateY.value = positions.closed
})

const openPanel = () => {
  open.value = true
  translateY.value = positions.half
  lastTranslate = positions.half
}

const closePanel = () => {
  translateY.value = positions.closed
  setTimeout(() => (open.value = false), 300)
}

const startDrag = (e) => {
  isDragging.value = true
  dragging = true
  startY = e.clientY || e.touches?.[0]?.clientY
  lastY = startY
  lastTime = Date.now()

  document.addEventListener("pointermove", drag)
  document.addEventListener("pointerup", endDrag)
}

const drag = (e) => {
  if (!dragging) return

  currentY = e.clientY || e.touches?.[0]?.clientY
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
      translateY.value = positions.closed
      setTimeout(() => (open.value = false), 250)
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
      translateY.value = positions.closed
      setTimeout(() => (open.value = false), 250)
    }
  }

  lastTranslate = translateY.value
}
</script>

<style scoped>
.app {
  font-family: system-ui, sans-serif;
  text-align: center;
  height: 100vh;
  overflow: hidden;
  background: #fafafa;
}

.open-btn {
  margin-top: 40vh;
  padding: 10px 20px;
  background: #0095f6;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 10;
}

.panel {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
  touch-action: none;
  overflow: hidden;
}

.panel.dragging {
  transition: none;
}

.handle {
  width: 45px;
  height: 5px;
  background: #ccc;
  border-radius: 4px;
  margin: 10px auto;
}

.comments {
  height: calc(100% - 25px);
  overflow-y: auto;
  padding: 10px 20px;
  text-align: left;
}
</style>
