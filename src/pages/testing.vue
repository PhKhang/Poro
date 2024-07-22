<template>
  <div id="app">
    <div id="video-background" :class="{ before: notPlay }" :data-vbg="youtubeURL"></div>
    <SoundMix v-show="elementsVisibility.soundmix" @close="toggleVisibility('soundmix')" />
    <DraggablePomodoro :isVisible="elementsVisibility.pomodoro" @close="toggleVisibility('pomodoro')" />
    <DraggableNote :isVisible="elementsVisibility.note" @close="toggleVisibility('note')" />
    <BackGroundChange :isVisible="elementsVisibility.backgroundChange" @close="toggleVisibility('backgroundChange')" />
    <DraggableSound :isVisible="elementsVisibility.music" @close="toggleVisibility('music')" />
    <DraggableTask :isVisible="elementsVisibility.task" @close="toggleVisibility('Task')" />
    <div class="taskbar">
      <button @click="toggleVisibility('backgroundChange')">Background</button>
      <button @click="toggleVisibility('soundmix')">Soundmix</button>
      <button @click="toggleVisibility('pomodoro')">Pomodoro</button>
      <button @click="toggleVisibility('music')">Music</button>
      <button @click="toggleVisibility('note')">Note</button>
      <button @click="toggleVisibility('task')">Task</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import './assets/base.css'

const elementsVisibility = ref({
  note: false,
  pomodoro: false,
  music: false,
  backgroundChange: true,
  soundmix: false,
  task: false
});

const toggleVisibility = (element) => {
  elementsVisibility.value[element] = !elementsVisibility.value[element];
};

// Mock data and methods for video background
let youtubeURL = ref("https://www.youtube.com/watch?v=yoY81oAiwD0");
let notPlay = ref(true);
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
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
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  /* Adjust this percentage as needed */
  max-width: 600px;
  /* Ensure it doesn't get too wide on large screens */
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border-radius: 8px;
  /* Optional: add rounded corners */
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
