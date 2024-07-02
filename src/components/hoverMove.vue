<template>
  <div class="draggable" @mousedown="onMouseDown" :class="{ dragging: isDragging }"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }">
    <slot></slot>
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
      isDragging,
      onMouseDown
    };
  }
};
</script>

<style>
.draggable {
  position: absolute;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/path/to/your/background-image.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  padding: 5px;
  box-sizing: border-box;
  transition: filter 0.2s;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}
</style>
