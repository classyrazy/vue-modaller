<template>
    <div>
        <teleport to="body">
            <Modal @close="handleCloseModal($event,idx)" v-for="(item, idx) in compRef" :key="idx" :config="modalOptions[idx]"
                :modal-key-index="idx">
                <template v-if="modalOptions[idx].title" #header>
                    <h3 class="__modal-header__title" :class="modalOptions[idx].type == 'modal' ? '__modal-header__title--standard': '__modal-header__title--side'">{{ modalOptions[idx].title }}</h3>
                    <button type="button" class="__modal-header__close-btn" @click="(evt) => handleCloseModal(evt, idx)">
                        <span>&times;</span>
                    </button>
                </template>
                <component :is="item" :data="modalOptions" @close="closeModal($event, idx)" v-bind="modalProps[idx]" @close-all="closeAllModal">
                    <!-- Dynamic slots -->
                    <template v-for="(slotComponent, slotName) in modalSlots[idx]" :key="slotName" #[slotName]>
                        <component :is="markRaw(toRaw(slotComponent.component))" v-bind="slotComponent.props" />
                    </template>
                </component>
            </Modal>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { markRaw, toRaw } from 'vue';
import Modal from '../modal.vue'
import { closeModal, closeAllModal, compRef, modalTitle, modalOptions, modalProps, modalSlots } from '../useModal';

const handleCloseModal = (evt: any, index: number) => {
    closeModal(evt, index);
}
</script>

<style scoped></style>