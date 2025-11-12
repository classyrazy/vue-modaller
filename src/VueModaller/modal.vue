<template>
  <div class="__modal-wrapper" v-if="config?.open" :class="classesBasedOnType.mainModalWrapperClass">
    <div class="__modal-backdrop" @click="handleCloseFromOutside" :class="config?.blur ? '__modal-backdrop--blur' : ''">
    </div>
    <div ref="modalElement"
      :class="[classesBasedOnType.mainModalClass, config?.background ? `bg-${config?.background}` : '__modal-content', anim_class]"
      @pointerdown="handleStartDrag" v-if="refedModalOpen" :style="{
        width: config?.type === 'side' || isMobile ? '100%' : computedWidth, 
        maxHeight: computedheight,
        borderRadius: computeCorner,
        marginTop: `${config?.margin && config.type == 'side' ? `${config.margin}px` : '0'}`,
        transform: config?.type === 'draggable' ? `translateY(${translateY}px)` : '',
        boxShadow: config?.type === 'draggable' ? config?.draggableConfig?.shadow : '',
      }">

      <div class="__modal-body">
        <!-- For Draggable -->
        <div class="__modal-drag-handle" v-if="config?.type === 'draggable'" :class="{ __hidden: config?.draggableConfig?.hideHandle }" :style="{
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
import { ref, computed, onMounted, type PropType, Ref } from 'vue';
import type { modalOptionsType } from './useModal';
import { useDraggable } from './variants/dragable';

const emit = defineEmits(['close']);
const props = defineProps({
  config: Object as PropType<modalOptionsType>,
  modalKeyIndex: Number
})

const refedModalOpen = ref(false)
const isMobile = computed(() => window.innerWidth <= 768)

const closeDialog = () => {
  if (props.config?.type === 'draggable') {
    closePanel(); 
  } else {
    emit('close');
  }
};

// Expose the closeDialog method so it can be called from parent components
defineExpose({
  closeDialog
});

const { isDragging, translateY, startDrag, openPanel, closePanel, isAnimating } = useDraggable(props.config?.draggableConfig, () => {
  emit('close'); // This gets called after the close animation completes
}, refedModalOpen)
const handleStartDrag = (event: PointerEvent) => {
  if (props.config?.type === 'draggable') {
    startDrag(event);
  }
};  
const handleCloseFromOutside = () => {
  if (props.config?.closeable) {
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
const computeCorner = computed(() => {
  // compute corner radius top bottom side based on type
  if (props.config?.type === 'side') {
    return `${props.config?.corner || '10px'} 0 0 ${props.config?.corner || '10px'}`;
  } else if (props.config?.type === 'panel' || props.config?.type === 'draggable') {
    return `${props.config?.corner || '10px'} ${props.config?.corner || '10px'} 0 0`;
  } else {
    return `${props.config?.corner || '10px'}`;
  }
});
const getActualValue = (value: string | number | undefined): string => {
  if (typeof value === 'number') {
    return `${value}px`;
  } else if (typeof value === 'string') {
    return value;
  } else {
    return '100%';
  }
}

let modal_class = ref({
  modal: { cls: "is-modal", anim_in: "zoomIn", anim_out: "zoomOut", style: `padding: ${getActualValue(props.config?.padding)};` },
  panel: { cls: "is-panel", anim_in: "slideInBottom", anim_out: "slideOutBottom", style: `padding: ${getActualValue(props.config?.padding)};` },
  draggable: { cls: "is-draggable", anim_in: "", anim_out: "", style: `padding: ${getActualValue(props.config?.padding)};` },
  side: { cls: "is-side", anim_in: "slideInRight", anim_out: "slideOutRight", style: `padding: ${getActualValue(props.config?.padding)};` }
}) as Ref<{ [key: string]: any }>;

const anim_class = computed(() => {

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
    tempModalClass = `__modal-content __modal-content--draggable ${isDragging.value ? '__modal-content--dragging' : ''} ${isAnimating.value ? '__modal-content--animating' : ''}`;
  }


  return {
    mainModalWrapperClass: tempWrapperClass,
    mainModalClass: tempModalClass
  };
});

onMounted(() => {
  setTimeout(() => {
    refedModalOpen.value = true;
    if(props.config?.type === 'draggable'){
      openPanel(); // This now uses the smooth JavaScript animation
    }
  }, 100);
});

</script>
<style src="./css/animation.css"></style>
