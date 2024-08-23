<template>
  <div id="app">
    <div id="video-background" :class="{ before: notPlay }" :data-vbg="youtubeURL"></div>
    <SoundMix v-show="elementsVisibility.soundmix" @close="toggleVisibility('soundmix')" />
    <DraggablePomodoro :isVisible="elementsVisibility.pomodoro" @close="toggleVisibility('pomodoro')" />
    <DraggableNote :isVisible="elementsVisibility.note" @close="toggleVisibility('note')" />
    <BackGroundChange :isVisible="elementsVisibility.backgroundChange" @close="toggleVisibility('backgroundChange')" />
    <DraggableSound :isVisible="elementsVisibility.music" @close="toggleVisibility('music')" />
    <DraggableTask :isVisible="elementsVisibility.task" @close="toggleVisibility('task')" @task-selected="handleTaskSelected" />
    <DraggableSettingTask :isVisible="elementsVisibility.tasksetting" v-if="selectedTask" :task="selectedTask" />
    
    <div class="manager-user">
      <div class="btn" @click="toggleVisibility('soundmix')">
        <div v-html="icons.chart"></div>
        <span class="tooltip">Sound</span>
      </div>
      <div class="btn" @click="toggleVisibility('pomodoro')">
        <div v-html="icons.fullscreen"></div>
        <span class="tooltip">Timer</span>
      </div>
      <div class="btn" @click="toggleVisibility('pomodoro')">
        <div v-html="icons.pomodoro"></div>
        <span class="tooltip">Timer</span>
      </div>
    </div>

    <div class="taskbar-user">
      <div class="background-change-wrapper">
        <img class="background-change-icon" @click="toggleVisibility('backgroundChange')" src="../assets/icon/themes.svg" alt="Background Change">
        <span class="tooltip">Themes</span>
      </div>
      <div class="button-container" @click="toggleVisibility('soundmix')">
        <div>
          <svg width="23" height="23" viewBox="0 0 23 23" :fill="elementsVisibility.soundmix ? '#ffd800' : '#EDEDED'" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1233 11.1862C12.6754 11.1862 12.2722 10.9398 12.0818 10.5366L10.458 7.30012L9.98764 8.17364C9.73006 8.65519 9.21491 8.95756 8.66617 8.95756H7.84865C7.38949 8.95756 7.00873 8.5768 7.00873 8.11764C7.00873 7.65849 7.38949 7.27773 7.84865 7.27773H8.56538L9.45009 5.64268C9.66287 5.26192 10.0884 5.00435 10.4916 5.02674C10.9283 5.02674 11.3203 5.28432 11.5219 5.66508L13.1233 8.86797L13.5041 8.09525C13.7617 7.5801 14.2656 7.26653 14.848 7.26653H15.7551C16.2142 7.26653 16.595 7.64729 16.595 8.10645C16.595 8.5656 16.2142 8.94636 15.7551 8.94636H14.96L14.1648 10.5254C13.9632 10.9398 13.5713 11.1862 13.1233 11.1862Z"/>
            <path d="M1.44188 18.7904C0.982722 18.7904 0.601959 18.4096 0.601959 17.9505V11.5671C0.545965 8.53218 1.67705 5.66526 3.78245 3.51507C5.88784 1.37608 8.70997 0.200195 11.7449 0.200195C17.949 0.200195 22.9998 5.2509 22.9998 11.4551V17.8385C22.9998 18.2977 22.619 18.6784 22.1598 18.6784C21.7007 18.6784 21.3199 18.2977 21.3199 17.8385V11.4551C21.3199 6.18041 17.0307 1.88003 11.7449 1.88003C9.15793 1.88003 6.76136 2.87673 4.98073 4.69096C3.18891 6.51638 2.237 8.94654 2.2818 11.5447V17.9393C2.2818 18.4096 1.91223 18.7904 1.44188 18.7904Z"/>
            <path d="M5.01448 11.8452H4.8689C2.51713 11.8452 0.602112 13.7602 0.602112 16.112V18.2174C0.602112 20.5692 2.51713 22.4842 4.8689 22.4842H5.01448C7.36625 22.4842 9.28127 20.5692 9.28127 18.2174V16.112C9.28127 13.7602 7.36625 11.8452 5.01448 11.8452Z"/>
            <path d="M18.7332 11.8452H18.5876C16.2359 11.8452 14.3209 13.7602 14.3209 16.112V18.2174C14.3209 20.5692 16.2359 22.4842 18.5876 22.4842H18.7332C21.085 22.4842 23 20.5692 23 18.2174V16.112C23 13.7602 21.085 11.8452 18.7332 11.8452Z"/>
          </svg>
        </div>
        <span class="tooltip">Sound</span>
      </div>
      <div class="button-container" @click="toggleVisibility('pomodoro')">
        <div>
          <svg width="26" height="24" viewBox="0 0 26 24" fill="none" :stroke="elementsVisibility.pomodoro ? '#ffd800' : '#EDEDED'" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.2 21.7001C18.0601 21.7001 22 17.7602 22 12.9001C22 8.03999 18.0601 4.1001 13.2 4.1001C8.33992 4.1001 4.40002 8.03999 4.40002 12.9001C4.40002 17.7602 8.33992 21.7001 13.2 21.7001Z" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.2 8.50024V12.9002L15.4 15.1002" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.50001 1.90015L2.20001 5.20015" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24.2 5.20015L20.9 1.90015" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.60002 19.5002L4.40002 21.7002" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.8 19.5002L22 21.7002" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="tooltip">Timer</span>
      </div>
      <div class="button-container" @click="toggleVisibility('music')">
        <div>
          <svg width="24" height="25" viewBox="0 0 25 25" fill="none" :stroke="elementsVisibility.music ? '#ffd800' : '#EDEDED'" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.8 15.4001V9.40015C22.8 4.40015 20.8 2.40015 15.8 2.40015H9.79999C4.79999 2.40015 2.79999 4.40015 2.79999 9.40015V15.4001C2.79999 20.4001 4.79999 22.4001 9.79999 22.4001H15.8C20.8 22.4001 22.8 20.4001 22.8 15.4001Z" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.32001 7.51025H22.28" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.32001 2.51025V7.37025" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.28 2.51025V6.92025" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.55 14.123V12.923C10.55 11.383 11.64 10.753 12.97 11.523L14.01 12.123L15.05 12.723C16.38 13.493 16.38 14.753 15.05 15.523L14.01 16.123L12.97 16.723C11.64 17.493 10.55 16.863 10.55 15.323V14.123Z" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="tooltip">Music</span>
      </div>
      <div class="button-container" @click="toggleVisibility('note')">
        <div>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" :stroke="elementsVisibility.note ? '#ffd800' : '#EDEDED'" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.0667 17.2667V8.63335C25.0667 6.5899 23.4102 4.93335 21.3667 4.93335H9.03337C6.98993 4.93335 5.33337 6.5899 5.33337 8.63335V20.9667C5.33337 23.0102 6.98993 24.6667 9.03337 24.6667H17.05M25.0667 17.2667L17.05 24.6667M25.0667 17.2667H19.5167C18.1544 17.2667 17.05 18.371 17.05 19.7333V24.6667" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.2667 9.8667H20.1334" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.2667 14.8H15.2001" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="tooltip">Note</span>
      </div>
      <div class="button-container" @click="toggleVisibility('task')">
        <div>
          <svg width="29" height="28" viewBox="0 0 29 28" :fill="elementsVisibility.task ? '#ffd800' : '#EDEDED'" :stroke="elementsVisibility.task ? '#ffd800' : '#EDEDED'" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.26 4.815C11.26 5.14913 10.9891 5.42 10.655 5.42C10.3209 5.42 10.05 5.14913 10.05 4.815C10.05 3.8126 10.8626 3 11.865 3H15.495C16.4974 3 17.31 3.8126 17.31 4.815C17.31 5.14913 17.0391 5.42 16.705 5.42C16.3709 5.42 16.1 5.14913 16.1 4.815C16.1 4.48087 15.8291 4.21 15.495 4.21H11.865C11.5309 4.21 11.26 4.48087 11.26 4.815ZM7.025 4.21C7.35913 4.21 7.63 4.48087 7.63 4.815C7.63 5.14913 7.35913 5.42 7.025 5.42C6.0226 5.42 5.21 6.2326 5.21 7.235V21.755C5.21 22.7574 6.0226 23.57 7.025 23.57H20.335C21.3374 23.57 22.15 22.7574 22.15 21.755V7.235C22.15 6.2326 21.3374 5.42 20.335 5.42C20.0009 5.42 19.73 5.14913 19.73 4.815C19.73 4.48087 20.0009 4.21 20.335 4.21C22.0057 4.21 23.36 5.56434 23.36 7.235V21.755C23.36 23.4257 22.0057 24.78 20.335 24.78H7.025C5.35434 24.78 4 23.4257 4 21.755V7.235C4 5.56434 5.35434 4.21 7.025 4.21Z" stroke-width="1.24125"/>
            <path d="M16.8945 11.5452C17.0938 11.3459 17.4169 11.3459 17.6162 11.5452C17.8155 11.7445 17.8155 12.0677 17.6162 12.267L12.5126 17.3706C12.3133 17.5699 11.9902 17.5699 11.7909 17.3706L9.74946 15.3291C9.55015 15.1298 9.55015 14.8067 9.74946 14.6074C9.94876 14.4081 10.2719 14.4081 10.4712 14.6074L12.1518 16.2879L16.8945 11.5452Z" stroke-width="1.04708"/>
          </svg>
        </div>
        <span class="tooltip">Task</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import './assets/base.css';

const selectedTask = ref(null);

const handleTaskSelected = (task) => {
  selectedTask.value = task;
  toggleVisibility('tasksetting'); // Show task settings when a task is selected
};

const elementsVisibility = reactive({
  note: false,
  pomodoro: false,
  music: false,
  backgroundChange: true,
  soundmix: false,
  task: false,
  tasksetting: false, 
});

const toggleVisibility = (element) => {
  elementsVisibility[element] = !elementsVisibility[element];
};

const youtubeURL = ref("https://www.youtube.com/watch?v=yoY81oAiwD0");
const notPlay = ref(true);

const icons = {
  chart:  `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 26.5H26.5" stroke="#EDEDED" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M2.75 26.5V17.125C2.75 16.0895 3.5895 15.25 4.625 15.25H8.375C9.4105 15.25 10.25 16.0895 10.25 17.125V26.5" stroke="#EDEDED" stroke-width="2.5"/>
    <path d="M10.25 26.5V11.25M17.75 26.5V5.25C17.75 3.48224 17.75 2.59835 17.2008 2.04918C16.6517 1.5 15.7677 1.5 14 1.5C12.2323 1.5 11.3484 1.5 10.7991 2.04918C10.25 2.59835 10.25 3.48224 10.25 5.25" stroke="#EDEDED" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.75 26.5V10.875C17.75 9.83946 18.5895 9 19.625 9H23.375C24.4105 9 25.25 9.83946 25.25 10.875V18M25.25 26.5V23.6875" stroke="#EDEDED" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
    `,
  fullscreen:  `<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31 -3.05176e-05H0V31H31V-3.05176e-05Z" stroke="#EDEDED" stroke-width="0.000338182"/>
    <path d="M12.0125 17.1792L5.16667 24.025V19.4396C5.1725 19.1205 5.0656 18.8095 4.86478 18.5614C4.66396 18.3134 4.38209 18.1441 4.06875 18.0833C3.88363 18.0552 3.69461 18.0677 3.51479 18.1199C3.33497 18.1721 3.16865 18.2628 3.02735 18.3857C2.88606 18.5085 2.77317 18.6606 2.6965 18.8315C2.61983 19.0023 2.58121 19.1878 2.58333 19.375V27.125C2.58333 27.4676 2.71942 27.7961 2.96166 28.0383C3.20389 28.2806 3.53243 28.4167 3.875 28.4167H11.5604C11.8795 28.4225 12.1905 28.3156 12.4386 28.1148C12.6866 27.9139 12.8559 27.6321 12.9167 27.3187C12.9448 27.1336 12.9323 26.9446 12.8801 26.7648C12.8279 26.585 12.7372 26.4186 12.6143 26.2773C12.4915 26.136 12.3393 26.0231 12.1685 25.9465C11.9977 25.8698 11.8122 25.8312 11.625 25.8333H6.975L13.7563 19.0521C13.9899 18.8315 14.1376 18.5351 14.1731 18.2157C14.2085 17.8964 14.1295 17.5748 13.95 17.3083C13.8455 17.1527 13.7066 17.023 13.5442 16.9294C13.3818 16.8357 13.2 16.7806 13.013 16.7681C12.8259 16.7556 12.6384 16.7862 12.465 16.8574C12.2916 16.9287 12.1368 17.0388 12.0125 17.1792Z" fill="#EDEDED" stroke="#EDEDED" stroke-width="0.000338182"/>
    <path d="M19.375 2.58333C19.1877 2.58121 19.0023 2.61983 18.8315 2.6965C18.6606 2.77317 18.5085 2.88606 18.3856 3.02735C18.2628 3.16865 18.1721 3.33497 18.1199 3.51479C18.0677 3.69461 18.0552 3.88363 18.0833 4.06875C18.144 4.38209 18.3133 4.66396 18.5614 4.86478C18.8095 5.0656 19.1204 5.1725 19.4396 5.16667H24.025L17.2437 11.9479C16.9891 12.172 16.8328 12.4873 16.8086 12.8256C16.7844 13.164 16.8943 13.4983 17.1146 13.7563C17.2281 13.9036 17.3753 14.0216 17.5439 14.1003C17.7124 14.1789 17.8974 14.216 18.0833 14.2083C18.424 14.2035 18.749 14.0642 18.9875 13.8208L25.8333 6.975V11.5604C25.8275 11.8795 25.9344 12.1905 26.1352 12.4386C26.336 12.6866 26.6179 12.8559 26.9312 12.9167C27.1163 12.9448 27.3054 12.9323 27.4852 12.8801C27.665 12.8279 27.8313 12.7372 27.9726 12.6143C28.1139 12.4915 28.2268 12.3393 28.3035 12.1685C28.3801 11.9977 28.4188 11.8122 28.4166 11.625V3.875C28.4166 3.53243 28.2805 3.20389 28.0383 2.96166C27.7961 2.71942 27.4675 2.58333 27.125 2.58333H19.375Z" fill="#EDEDED" stroke="#EDEDED" stroke-width="0.000338182"/>
    </svg>
    `,

};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet');

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

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(34, 34, 34, 0.7);
  border-radius: 8.8px; 
  border: 1.2px solid #7a7a7a; 
  margin-left: 5px;
  cursor: pointer;
  position: relative;
  overflow: visible;
}

.button-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(122, 122, 122, 0.4); 
  opacity: 0;
  transition: opacity 0.1s ease;
  border-radius: 8px;
}

.button-container:hover::after {
  opacity: 1;
}

.button-container > div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 1; 
}

.button-container svg {
  opacity: 1;
}

.tooltip {
  visibility: hidden;
  background-color: rgb(34, 34, 34);
  color: #ededed;
  border-radius: 5px;
  padding: 5px 10px; 
  position: absolute;
  z-index: 2;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-style: normal;
  white-space: nowrap; 
}

.button-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.background-change-icon {
  position: relative;
  z-index: 2; /* Đảm bảo icon nằm trên lớp overlay */
  width: 72px;
  height: 72px;
  cursor: pointer;
  opacity: 1;
  position: relative;
  padding: 2px;
}

.background-change-wrapper {
  position: relative;
  display: inline-block;
  align-items: center;
  justify-content: center;
  display: flex;
}

.background-change-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(122, 122, 122, 0.4); 
  opacity: 0;
  transition: opacity 0.1s ease;
  border-radius: 8px;
  z-index: 1;
  pointer-events: none; 

}

.background-change-wrapper:hover::after {
  opacity: 1;
}

.background-change-wrapper:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.taskbar-user {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 403px;
  height: 72px; 
  background: rgba(34, 34, 34, 0.5);
  border-radius: 8.8px; 
  border: 1.2px solid #7a7a7a; 
  backdrop-filter: blur(4.8px); /* Thêm hiệu ứng blur */
  -webkit-backdrop-filter: blur(4.8px); /* Cho Safari */
  display: flex;
  justify-content: center;
  align-items: center; 
  padding: 10px; 
  gap: 10px; 
  border-radius: 9.6px;
}

.manager-user {
  width: 188px;
  height: 64px;
  position: fixed; 
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: row; 
  gap: 8px; 
}

.btn {
  width: 100%;
  width: 50px;
  height: 50px;
  background-color: rgba(34, 34, 34, 0.7); 
  color: #fff;
  border: none;
  border-radius: 8.8px;
  border: 1.2px solid #7a7a7a; 
  cursor: pointer;
  display: flex; 
  align-items: center; 
  justify-content: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.btn:first-child {
  margin-top: 0;
}

.btn:last-child {
  margin-bottom: 0;
}

.close-button {
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
