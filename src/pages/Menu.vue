<template>
    <div class="button-panel">
      <button @click="selectElement(1)">Element 1</button>
      <button @click="selectElement(2)">Timer</button>
      <button @click="selectElement(3)">Element 3</button>
      <button @click="selectElement(4)">Element 4</button>
      <button @click="selectElement(5)">Element 5</button>
  
      <PomodoroTimer v-if="selectedElement === 2" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import PomodoroTimer from './PomodoroTimer.vue';
  
  export default {
    components: {
      PomodoroTimer
    },
    setup() {
      const selectedElement = ref(null);
  
      const selectElement = (element) => {
        selectedElement.value = element;
      };
  
      return {
        selectedElement,
        selectElement
      };
    }
  };
  </script>
  
  <style>
  .button-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .button-panel button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  </style>
  