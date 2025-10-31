<template>
  <div class="__demo-content">
    <h2 class="__demo-content__title">Example Modal Content</h2>
    <p class="__demo-content__text">This is an example of content inside a modal using VueModaller!</p>
    <div class="__demo-content__actions">
      <button @click="handleClose('confirmed')" class="__demo-btn __demo-btn--primary">
        Confirm
      </button>
      <button @click="handleClose('cancelled')" class="__demo-btn __demo-btn--secondary">
        Cancel
      </button>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

const handleClose = (result: string) => {
  emit('close', result)
}
</script>
