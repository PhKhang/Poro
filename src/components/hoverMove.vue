<template>
  <div v-show="isVisible" class="draggable" ref="draggable" :style="{ left: position.x + 'px', top: position.y + 'px' }"
    @mousedown="startDrag">
    <button class="close-btn" @click="hideElement">-</button>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isVisible: Boolean
});

const emit = defineEmits(['close']); // Define emits

const position = reactive({ x: 0, y: 0 });
const isDragging = ref(false);
const offset = reactive({ x: 0, y: 0 });
const draggable = ref(null);

const startDrag = (event) => {
  isDragging.value = true;
  offset.x = event.clientX - position.x;
  offset.y = event.clientY - position.y;
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDrag);
};

const drag = (event) => {
  if (isDragging.value) {
    const newX = event.clientX - offset.x;
    const newY = event.clientY - offset.y;

    const rect = draggable.value.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    position.x = Math.max(0, Math.min(newX, maxX));
    position.y = Math.max(0, Math.min(newY, maxY));
  }
};

const stopDrag = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', stopDrag);
};

onMounted(() => {
  if (!props.isVisible) {
    draggable.value.style.display = 'none';
  }
});

onUnmounted(() => {
  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', stopDrag);
});

const hideElement = () => {
  emit('close'); // Emit event to parent
};
</script>

<style scoped>
.draggable {
  position: fixed;
  border-radius: 20px;
  background-color: rgba(34, 34, 34, 0.5);
  border: 1px solid #7a7a7a;
  background-size: cover;
  background-position: center;
  color: white;
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
