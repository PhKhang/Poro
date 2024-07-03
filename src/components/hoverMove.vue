<template>
  <div v-show="isVisible" class="draggable" @mousedown="onMouseDown" :class="{ dragging: isDragging }"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }">
    <button class="close-btn" @click="hideElement">-</button>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean // Define props
});

const emit = defineEmits(['close']); // Define emits

const position = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });

const onMouseDown = (event) => {
  isDragging.value = true;
  offset.value = {
    x: event.clientX - position.value.x,
    y: event.clientY - position.value.y,
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event) => {
  if (isDragging.value) {
    position.value = {
      x: event.clientX - offset.value.x,
      y: event.clientY - offset.value.y,
    };
  }
};

const onMouseUp = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

const hideElement = () => {
  emit('close'); // Emit event to parent
};


onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
});
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
  padding: 10px;
  box-sizing: border-box;
  transition: filter 0.2s;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
</style>
