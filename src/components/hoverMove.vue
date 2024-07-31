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
const parentRect = ref({ width: 0, height: 0, top: 0, left: 0 });

const onMouseDown = (event) => {
  isDragging.value = true;
  offset.value = {
    x: event.clientX - position.value.x,
    y: event.clientY - position.value.y,
  };

  const parentElement = event.target.closest('.draggable').parentElement;
  parentRect.value = parentElement.getBoundingClientRect();

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event) => {
  if (isDragging.value) {
    const newPos = {
      x: event.clientX - offset.value.x,
      y: event.clientY - offset.value.y,
    };

    // Prevent the element from being dragged out of the parent element
    const element = document.querySelector('.draggable');
    const elementRect = element.getBoundingClientRect();

    // Adjust the new position to keep the element within the parent
    newPos.x = Math.max(parentRect.value.left, Math.min(newPos.x, parentRect.value.left + parentRect.value.width - elementRect.width));
    newPos.y = Math.max(parentRect.value.top, Math.min(newPos.y, parentRect.value.top + parentRect.value.height - elementRect.height));

    position.value = newPos;
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
  position: fixed;
  border-radius: 20px;
  background-color: rgba(34, 34, 34, 0.5);
  border: 1px solid #7a7a7a;
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  padding: 0px;
  box-sizing: border-box;
  transition: filter 0.2s;
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
