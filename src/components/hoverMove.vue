<template>
  <div v-show="isVisible" class="draggable" ref="draggable" :style="{ left: position.x + 'px', top: position.y + 'px' }"
    @mousedown="startDrag">
    <div class="close-btn" @click="hideElement">
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_1163)">
          <path d="M13.7328 5.7334H3.06607C1.59541 5.7334 0.399414 6.9294 0.399414 8.40005C0.399414 9.87071 1.59541 11.0667 3.06607 11.0667H13.7327C15.2034 11.0667 16.3994 9.87071 16.3994 8.40005C16.3994 6.9294 15.2034 5.7334 13.7328 5.7334Z" fill="#EDEDED" stroke="#EDEDED" stroke-width="0.03125"/>
        </g>
        <defs>
          <clipPath id="clip0_1_1163">
            <rect width="16" height="16" fill="white" transform="translate(0.399414 0.399902)"/>
          </clipPath>
        </defs>
      </svg>
    </div>
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
  border-radius: 15px;
  background-color: rgba(34, 34, 34, 0.70);
  border: 0.8px solid #7a7a7a;
  background-size: cover;
  background-position: center;
  color: white;
  align-items: center;
  justify-content: center;
  /* cursor: pointer; */
  user-select: none;
  padding: 0px;
  box-sizing: border-box;
  transition: filter 0.2s;
  backdrop-filter: blur(4.8px);
  -webkit-backdrop-filter: blur(4.8px);
}

.close-btn {
  position: absolute;
  top: 12.8px;
  right: 16.8px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  z-index: 2;
}
</style>
