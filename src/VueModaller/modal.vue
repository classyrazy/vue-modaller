<template>
  <div class="__modal-wrapper" v-if="config?.open" :class="classesBasedOnType.mainModalWrapperClass">
    <div class="__modal-backdrop" @click="handleCloseFromOutside" :class="config?.blur ? '__modal-backdrop--blur' : ''">
    </div>
    <div ref="modalElement"
      :class="[classesBasedOnType.mainModalClass, config?.background ? `bg-${config?.background}` : '__modal-content', anim_class]"
      @pointerdown="startDrag" v-if="refedModalOpen" :style="{
        width: computedWidth, maxHeight: computedheight,
        borderRadius: `${config?.type !== 'side' && config?.type !== 'panel' && config?.type !== 'draggable' ? config?.corner ?? '0.75rem' : '0'}`,
        marginTop: `${config?.margin && config.type == 'side' ? `${config.margin}px` : '0'}`,
        transform: `translateY(${translateY}px)`
      }">

      <div class="__modal-body">
        <!-- For Draggable -->
        <div class="__modal-drag-handle" :class="{ __hidden: config?.draggableConfig?.hideHandle }" :style="{
          '--modal-draggable-handle-color': config?.draggableConfig?.handle?.color,
          '--modal-draggable-handle-hover-color': config?.draggableConfig?.handle?.hoverColor,
          '--modal-draggable-handle-active-color': config?.draggableConfig?.handle?.activeColor,
          '--modal-draggable-handle-height': config?.draggableConfig?.handle?.height || '5px',
          '--modal-draggable-handle-width': config?.draggableConfig?.handle?.width || '45px',
          '--modal-draggable-handle-radius': config?.draggableConfig?.handle?.radius || '4px',
          '--modal-draggable-handle-margin-top': config?.draggableConfig?.handle?.marginTop || '10px',
          '--modal-draggable-handle-margin-bottom': config?.draggableConfig?.handle?.marginBottom || '10px',
        }"></div>
        <div class="__modal-header">
          <slot name="header" />
        </div>
        <div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, type PropType, nextTick, Ref } from 'vue';
import type { modalOptionsType } from './useModal';
import { useDraggable } from './variants/dragable';

const emit = defineEmits(['close']);
const props = defineProps({
  config: Object as PropType<modalOptionsType>,
  modalKeyIndex: Number
})
const closeDialog = () => {
  emit('close');
};
const { isDragging, translateY, startDrag, openPanel } = useDraggable(props.config?.draggableConfig, closeDialog)
const handleCloseFromOutside = () => {
  if (props.config?.closeable) {
    console.log('Modal closed from outside', props.config?.closeable);
    closeDialog();
  }
}
const computedWidth = computed(() => {
  if (props.config?.type == 'side') {
    return '100%';
  }
  if (props.config?.width) {
    return `${props.config?.width}px`;
  } else {
    return '480px';
  }
});
const computedheight = computed(() => {
  if (props.config?.height && props.config.type !== 'draggable') {
    if (typeof props.config?.height == 'number') {
      return `${props.config?.height}px`;
    } else {
      return props.config?.height
    }
  } else {
    return '100%';
  }
});

let modal_class = ref({
  modal: { cls: "is-modal", anim_in: "zoomIn", anim_out: "zoomOut", style: `padding: ${props.config?.padding}px;` },
  panel: { cls: "is-panel", anim_in: "slideInBottom", anim_out: "slideOutBottom", style: 'padding: 0' },
  draggable: { cls: "is-draggable", anim_in: "slideInUp", anim_out: "slideOutDown", style: 'padding: 0' },
  side: { cls: "is-side", anim_in: "slideInRight", anim_out: "slideOutRight", style: 'padding: 0' }
}) as Ref<{ [key: string]: any }>;

const anim_class = computed(() => {
  // For draggable type, we rely on the draggable system for animations
  // if (props.config?.type === 'draggable') {
  //   return ''; // No CSS animation classes - draggable handles its own animations
  // }
  
  // For other types, apply animations normally
  return props.config?.anim
    ? modal_class.value[props.config?.type || 'modal'].anim_in
    : modal_class.value[props.config?.type || 'modal'].anim_out;
})

const classesBasedOnType = computed(() => {
  let tempWrapperClass = '__modal-wrapper--centered';
  let tempModalClass = '__modal-content __modal-content--standard';

  if (props.config?.type == 'modal') {
    tempWrapperClass = '__modal-wrapper--centered';
    tempModalClass = '__modal-content __modal-content--standard';
  } else if (props.config?.type == 'side') {
    tempWrapperClass = '__modal-wrapper--side';
    tempModalClass = '__modal-content __modal-content--side';
  } else if (props.config?.type == 'panel') {
    tempWrapperClass = '__modal-wrapper--panel';
    tempModalClass = '__modal-content __modal-content--panel';
  } else if (props.config?.type == 'draggable') {
    tempWrapperClass = '__modal-wrapper--draggable';
    tempModalClass = `__modal-content __modal-content--draggable ${isDragging.value ? '__modal-content--dragging' : ''}`;
  }
  //  else if (props.config?.type == 'dragable') {
  //   tempWrapperClass = '__modal-wrapper--dragable';
  //   tempModalClass = `__modal-content __modal-content--dragable ${dragState.value}`;
  // }

  return {
    mainModalWrapperClass: tempWrapperClass,
    mainModalClass: tempModalClass
  };
});

const refedModalOpen = ref(false)

onMounted(() => {
  setTimeout(() => {
    refedModalOpen.value = true;
    if(props.config?.type === 'draggable'){
      openPanel()
      console.log('opened draggable', translateY.value)
    }
  }, 100);
});
</script>
<style scss>
@import url('./modal.css');

.blur-bg {
  backdrop-filter: blur(2.5px);
}
</style>