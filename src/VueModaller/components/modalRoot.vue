<template>
    <div>
        <teleport to="body">
            <Modal @close="handleCloseModal($event, idx)" v-for="(item, idx) in compRef" :key="idx"
                :config="modalOptions[idx]" ref="modalRefs" :modal-key-index="idx">
                <template v-if="modalOptions[idx].title" #header>
                    <h3 class="__modal-header__title"
                        :class="modalOptions[idx].type == 'modal' ? '__modal-header__title--standard' : '__modal-header__title--side'">
                        {{ modalOptions[idx].title }}</h3>
                    <button type="button" class="__modal-header__close-btn"
                        @click="(evt) => handleCloseModal(evt, idx)">
                        <span>&times;</span>
                    </button>
                </template>
                <component :is="item" :data="modalOptions" @close="handleExternalCloseModal($event, idx)"
                    v-bind="modalProps[idx]" @close-all="closeAllModal">
                    <!-- Dynamic slots -->
                    <template v-for="(slotComponent, slotName) in modalSlots[idx]" :key="slotName" #[slotName]>
                        <component :is="slotComponent.component" v-bind="slotComponent.props" />
                    </template>
                </component>
            </Modal>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { markRaw, ref, toRaw } from 'vue';
import Modal from '../modal.vue'
import { closeModal, closeAllModal, compRef, modalTitle, modalOptions, modalProps, modalSlots } from '../useModal';

const handleCloseModal = (evt: any, index: number) => {
    closeModal(evt, index);
}
const modalRefs = ref<InstanceType<typeof Modal>[]>([]);
const handleExternalCloseModal = (evt: any, index: number) => {
    const { type } = modalOptions.value[index];
    if (type == 'draggable') {
        const modalInstance = modalRefs.value[index];
        if (modalInstance && modalInstance.closeDialog) {
            modalInstance.closeDialog();
        }
    }else{
        closeModal(evt, index);
    }
}
</script>
<style src="../css/style.css"></style>

<style scoped></style>