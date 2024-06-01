<template>
    <div
      class="draggable"
      @mousedown="onMouseDown"
      :style="{ top: `${position.y}px`, left: `${position.x}px` }"
    >
      Kéo tôi
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  export default {
    setup() {
      const position = ref({ x: 0, y: 0 });
      const isDragging = ref(false);
      const offset = ref({ x: 0, y: 0 });
  
      const onMouseDown = (event) => {
        isDragging.value = true;
        offset.value = {
          x: event.clientX - position.value.x,
          y: event.clientY - position.value.y
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };
  
      const onMouseMove = (event) => {
        if (isDragging.value) {
          position.value = {
            x: event.clientX - offset.value.x,
            y: event.clientY - offset.value.y
          };
        }
      };
  
      const onMouseUp = () => {
        isDragging.value = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
  
      onMounted(() => {
        // Clean up when component is destroyed
        onBeforeUnmount(() => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        });
      });
  
      return {
        position,
        onMouseDown
      };
    }
  };
  </script>
  
  <style>
  .draggable {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  }
  </style>
  