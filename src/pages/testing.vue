<template>
  <div id="app">
    <div id="video-background" :class="{ before: notPlay }" :data-vbg="youtubeURL"></div>

    <DraggablePomodoro :isVisible="elementsVisibility.pomodoro" @close="toggleVisibility('pomodoro')" />
    <DraggableNote :isVisible="elementsVisibility.note" @close="toggleVisibility('note')" />
    <BackGroundChange :isVisible="elementsVisibility.backgroundChange" @close="toggleVisibility('backgroundChange')" />
    <DraggableSound :isVisible="elementsVisibility.sound" @close="toggleVisibility('sound')" />

    <div class="taskbar">
      <button @click="toggleVisibility('backgroundChange')">Background</button>
      <button @click="toggleVisibility('pomodoro')">Pomodoro</button>
      <button @click="toggleVisibility('sound')">Sound</button>
      <button @click="toggleVisibility('note')">Note</button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const elementsVisibility = ref({
  note: true,
  pomodoro: true,
  sound: true,
  backgroundChange: true
});

const toggleVisibility = (element) => {
  elementsVisibility.value[element] = !elementsVisibility.value[element];
};

// Mock data and methods for video background
let youtubeURL = ref("https://www.youtube.com/watch?v=yoY81oAiwD0");
let notPlay = ref(true);

</script>

<style scoped>
#app {
  position: relative;
  height: 100vh;
}

#video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.taskbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 10px;
}

.taskbar button {
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
}

.close-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
