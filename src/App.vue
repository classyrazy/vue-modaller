<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import ModalRoot from './VueModaller/components/modalRoot.vue'
import { useModal } from './VueModaller/useModal'
import ExampleModalContent from './components/ExampleModalContent.vue'

const openModal = async () => {
  const result = await useModal(ExampleModalContent, {
    title: 'Demo Modal',
    config: {
      // width: 1000,
      type: 'side',
      blur: true,
      closeable: false,
      draggableConfig:{
      handle: {
        color: 'blue',
         hoverColor: 'red',
        activeColor: 'blue'
       }
      }
    },
    props:{
      message: 'Hello from App.vue!'
    },
    slots:{
      "footer": {
        component: HelloWorld,
        props: {
          msg: 'This is a footer slot from App.vue'
        }
      }
    }
  })
  console.log('Modal result:', result)
}

const openSidePanel = async () => {
  const result = await useModal(ExampleModalContent, {
    title: 'Side Panel Demo',
    config: {
      type: 'side',
      closeable: true,
      blur: true,
       draggableConfig:{
      handle: {
         hoverColor: 'red',
        activeColor: 'blue'
       }
      }
    },
    props:{
      message: 'Hello from App.vue!'
    },
    slots:{
      "footer": {
        component: HelloWorld,
        props: {
          msg: 'This is a footer slot from App.vue'
        }
      }
    }
  })
  console.log('Side panel result:', result)
}

const openDraggableModal = async () => {
  const result = await useModal(ExampleModalContent, {
    title: 'Draggable Modal',
    config: {
      type: 'draggable',
      blur: true,
      closeable: true,
      
    }
  })
  console.log('Draggable modal result:', result)
}
</script>

<template>
  <ModalRoot />

  <!-- Modal Demo Section -->
  <div class="demo-section">
    <h2>VueModaller Demo</h2>
    <div class="demo-buttons">
      <button @click="openModal" class="demo-btn">Open Modal</button>
      <button @click="openSidePanel" class="demo-btn">Open Side Panel</button>
      <button @click="openDraggableModal" class="demo-btn">Open Draggable Modal</button>
    </div>
  </div>
  
</template>

<style scoped>


.demo-section {
  margin: 2rem 0;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

.demo-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.demo-btn {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.demo-btn:hover {
  background-color: #3f36d1;
}
</style>
