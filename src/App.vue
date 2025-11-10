<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
// Import from the global plugin (simulating: import { useModal } from 'vue-modaller')
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
    },
    props: {
      message: 'This is a draggable modal with smooth JavaScript animations!'
    }
  })
  console.log('Draggable modal result:', result)
}
</script>

<template>
  <!-- ModalRoot is now globally registered by the plugin -->
  <ModalRoot />

  <!-- Modal Demo Section -->
  <div class="demo-section">
    <h2>VueModaller Demo (Globally Installed Plugin)</h2>
    <p>Testing VueModaller as a globally installed npm package</p>
    
    <div class="demo-subsection">
      <h3>Using useModal Composable</h3>
      <div class="demo-buttons">
        <button @click="openModal" class="demo-btn">Open Modal</button>
        <button @click="openSidePanel" class="demo-btn">Open Side Panel</button>
        <button @click="openDraggableModal" class="demo-btn">Open Draggable Modal</button>
      </div>
    </div>

    <div class="demo-subsection">
      <h3>Using Modal Component Directly</h3>
      <div class="demo-buttons">
        <button @click="openDirectModal" class="demo-btn">Open Direct Modal</button>
      </div>
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

.demo-subsection {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.demo-subsection h3 {
  margin-bottom: 1rem;
  color: #374151;
}

.demo-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
  flex-wrap: wrap;
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
