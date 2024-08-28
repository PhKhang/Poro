<template>
  <div id="app">
    <div id="video-background" :class="{ before: notPlay }" :data-vbg="youtubeURL"></div>
    <BackGroundChange :isVisible="elementsVisibility.backgroundChange" @close="toggleVisibility('backgroundChange')" />
    <SoundMix v-show="elementsVisibility.soundmix" @close="toggleVisibility('soundmix')" />
    <DraggablePomodoro :isVisible="elementsVisibility.pomodoro" @close="toggleVisibility('pomodoro')" />
    <DraggableNote :isVisible="elementsVisibility.note" @close="toggleVisibility('note')" />
    <DraggableSound :isVisible="elementsVisibility.music" @close="toggleVisibility('music')" />
    <DraggableTask :isVisible="elementsVisibility.task" @close="toggleVisibility('task')" @task-selected="handleTaskSelected" />
    <DraggableSettingTask :isVisible="elementsVisibility.tasksetting" v-if="selectedTask" :task="selectedTask" />
    
    <div class="manager-user">
      <NuxtLink to="/profile" class="btn">
        <svg width="22" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.999998 21.6001H21" stroke="#EDEDED" stroke-width="2" stroke-linecap="round"/>
          <path d="M2 21.6001V14.1001C2 13.2717 2.6716 12.6001 3.5 12.6001H6.5C7.3284 12.6001 8 13.2717 8 14.1001V21.6001" stroke="#EDEDED" stroke-width="2"/>
          <path d="M8 21.6001V9.4001M14 21.6001V4.6001C14 3.18589 14 2.47878 13.5607 2.03944C13.1213 1.6001 12.4142 1.6001 11 1.6001C9.5858 1.6001 8.8787 1.6001 8.4393 2.03944C8 2.47878 8 3.18589 8 4.6001" stroke="#EDEDED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 21.6001V9.1001C14 8.27167 14.6716 7.6001 15.5 7.6001H18.5C19.3284 7.6001 20 8.27167 20 9.1001V14.8001M20 21.6001V19.3501" stroke="#EDEDED" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span class="tooltip">Stats and Leaderboard</span>
      </NuxtLink>
      <div class="btn" @click="toggleFullscreen">
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.60981 12.3435L2.13314 17.8201V14.1518C2.13781 13.8965 2.05229 13.6478 1.89163 13.4493C1.73097 13.2508 1.50547 13.1154 1.25481 13.0668C1.10671 13.0443 0.955491 13.0543 0.811635 13.0961C0.66778 13.1378 0.534725 13.2104 0.421688 13.3087C0.308652 13.407 0.218337 13.5287 0.157002 13.6653C0.0956661 13.802 0.0647763 13.9503 0.0664725 14.1001V20.3001C0.0664725 20.5742 0.175341 20.837 0.369129 21.0308C0.562916 21.2246 0.825749 21.3335 1.09981 21.3335H7.24814C7.50343 21.3381 7.75219 21.2526 7.95065 21.092C8.14911 20.9313 8.28455 20.7058 8.33314 20.4551C8.35562 20.307 8.34563 20.1558 8.30386 20.012C8.2621 19.8681 8.18956 19.7351 8.09127 19.622C7.99297 19.509 7.87128 19.4187 7.73462 19.3573C7.59796 19.296 7.44959 19.2651 7.29981 19.2668H3.57981L9.0048 13.8418C9.1917 13.6653 9.30987 13.4282 9.33826 13.1727C9.36664 12.9173 9.3034 12.66 9.15981 12.4468C9.07618 12.3223 8.96512 12.2186 8.83518 12.1437C8.70523 12.0687 8.55984 12.0246 8.41017 12.0146C8.26051 12.0046 8.11055 12.0291 7.9718 12.0861C7.83306 12.1431 7.70922 12.2312 7.60981 12.3435Z" fill="#EDEDED" stroke="#EDEDED" stroke-width="0.000270545"/>
          <path d="M13.5001 0.666814C13.3503 0.665118 13.2019 0.696008 13.0653 0.757343C12.9286 0.818679 12.8069 0.908994 12.7086 1.02203C12.6103 1.13507 12.5378 1.26812 12.496 1.41198C12.4542 1.55583 12.4443 1.70705 12.4667 1.85515C12.5153 2.10582 12.6508 2.33132 12.8492 2.49197C13.0477 2.65263 13.2964 2.73815 13.5517 2.73348H17.2201L11.7951 8.15848C11.5913 8.33774 11.4663 8.58996 11.447 8.86064C11.4276 9.13132 11.5156 9.39875 11.6917 9.60515C11.7826 9.72304 11.9003 9.81742 12.0352 9.88035C12.1701 9.94329 12.318 9.97294 12.4667 9.96681C12.7393 9.96293 12.9993 9.85151 13.1901 9.65681L18.6667 4.18015V7.84848C18.6621 8.10377 18.7476 8.35253 18.9082 8.55099C19.0689 8.74945 19.2944 8.88489 19.5451 8.93348C19.6932 8.95596 19.8444 8.94597 19.9882 8.90421C20.1321 8.86244 20.2652 8.7899 20.3782 8.69161C20.4912 8.59332 20.5815 8.47162 20.6429 8.33496C20.7042 8.1983 20.7351 8.04993 20.7334 7.90015V1.70015C20.7334 1.42609 20.6245 1.16326 20.4307 0.969471C20.237 0.775683 19.9741 0.666814 19.7001 0.666814H13.5001Z" fill="#EDEDED" stroke="#EDEDED" stroke-width="0.000270545"/>
        </svg>
        <span class="tooltip">Fullscreen</span>
      </div>
      <div class="btn profile" @click="toggleDropdown">
        <img src="../assets/icon/icon-profile.svg">
        <span class="tooltip">Profile</span>
      </div>
      <div v-if="dropdownVisible" class="dropdown-menu">
        <NuxtLink to="/profile" class="dropdown-item">
          <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9391 0.600098C6.79379 0.600098 1 6.39275 1 13.5387C1 20.6846 6.79322 26.4772 13.9391 26.4772C21.0856 26.4772 26.8783 20.6846 26.8783 13.5387C26.8783 6.39275 21.0856 0.600098 13.9391 0.600098ZM13.9391 4.46888C16.3035 4.46888 18.2194 6.38536 18.2194 8.74858C18.2194 11.1124 16.3035 13.0283 13.9391 13.0283C11.5759 13.0283 9.66 11.1124 9.66 8.74858C9.66 6.38536 11.5759 4.46888 13.9391 4.46888ZM13.9363 23.0944C11.5782 23.0944 9.41845 22.2356 7.7526 20.8141C7.3468 20.468 7.11264 19.9605 7.11264 19.4279C7.11264 17.0312 9.05243 15.113 11.4497 15.113H16.4297C18.8275 15.113 20.7599 17.0312 20.7599 19.4279C20.7599 19.961 20.5269 20.4674 20.1205 20.8136C18.4553 22.2356 16.295 23.0944 13.9363 23.0944Z" fill="#EDEDED" stroke="#EDEDED" stroke-width="0.568353"/>
          </svg>
          <span>Profile</span>
        </NuxtLink>
        <NuxtLink to="/report" class="dropdown-item">
          <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.2547 19.8335L15.0385 2.13767C14.5782 1.34046 13.7204 0.845215 12.7998 0.845215C11.8792 0.845215 11.0222 1.34046 10.5622 2.13767L0.345225 19.8327C-0.115075 20.6299 -0.115075 21.62 0.345225 22.4172C0.805525 23.2144 1.66293 23.7093 2.58313 23.7093H23.0168C23.9371 23.7093 24.7952 23.2145 25.2548 22.4172C25.7151 21.62 25.7151 20.6299 25.2547 19.8335ZM12.8002 20.7991C11.9168 20.7991 11.1995 20.0826 11.1995 19.1989C11.1995 18.3155 11.9168 17.5991 12.8002 17.5991C13.6835 17.5991 14.4 18.3155 14.4 19.1989C14.4 20.0827 13.6835 20.7991 12.8002 20.7991ZM13.786 15.6778C13.786 16.2223 13.3443 16.6633 12.8002 16.6633C12.2553 16.6633 11.8143 16.2224 11.8143 15.6778L11.1995 8.44162C11.1995 7.55782 11.9168 6.84137 12.8002 6.84137C13.6835 6.84137 14.4 7.55787 14.4 8.44162L13.786 15.6778Z" fill="#EDEDED"/>
          </svg>            
          <span>Report</span>
        </NuxtLink>
        <div class="dropdown-item">
          <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.8 0.610596C2.79218 0.610596 1.82563 1.01095 1.11299 1.72359C0.400356 2.43623 0 3.40277 0 4.4106V22.1439C0 23.1518 0.400356 24.1183 1.11299 24.8309C1.82563 25.5436 2.79218 25.9439 3.8 25.9439H11.4C12.4078 25.9439 13.3744 25.5436 14.087 24.8309C14.7996 24.1183 15.2 23.1518 15.2 22.1439V4.4106C15.2 3.40277 14.7996 2.43623 14.087 1.72359C13.3744 1.01095 12.4078 0.610596 11.4 0.610596H3.8ZM16.8378 7.31506C17.0753 7.0776 17.3975 6.9442 17.7333 6.9442C18.0692 6.9442 18.3913 7.0776 18.6289 7.31506L23.6955 12.3817C23.933 12.6193 24.0664 12.9414 24.0664 13.2773C24.0664 13.6131 23.933 13.9353 23.6955 14.1728L18.6289 19.2395C18.39 19.4702 18.07 19.5979 17.7379 19.595C17.4058 19.5921 17.0881 19.4589 16.8532 19.224C16.6184 18.9892 16.4852 18.6715 16.4823 18.3394C16.4794 18.0073 16.6071 17.6873 16.8378 17.4484L19.7423 14.5439H8.86667C8.53073 14.5439 8.20854 14.4105 7.971 14.1729C7.73345 13.9354 7.6 13.6132 7.6 13.2773C7.6 12.9413 7.73345 12.6191 7.971 12.3816C8.20854 12.144 8.53073 12.0106 8.86667 12.0106H19.7423L16.8378 9.10613C16.6003 8.86859 16.4669 8.54647 16.4669 8.2106C16.4669 7.87472 16.6003 7.5526 16.8378 7.31506Z" fill="#EDEDED"/>
          </svg>
          <span>Log Out</span>
        </div>
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

function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari & Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari & Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }
}

const dropdownVisible = ref(false);

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
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
  z-index: -9999;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  backdrop-filter: blur(4.8px);
  -webkit-backdrop-filter: blur(4.8px); /* Cho Safari */
  display: flex;
  justify-content: center;
  align-items: center; 
  padding: 10px; 
  gap: 10px; 
  border-radius: 9.6px;
}

.manager-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row; 
  width: 188px;
  height: 64px;
  position: fixed; 
  top: 0px;
  right: 12px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(34, 34, 34, 0.70);
  backdrop-filter: blur(4.8px);
  border-radius: 8.8px; 
  border: 1.2px solid #7a7a7a; 
  margin-left: 5px;
  cursor: pointer;
  position: relative;
  overflow: visible;
}

.profile {
  width: 68px;
  height: 40px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0; 
  background: rgba(34, 34, 34, 0.70);
  backdrop-filter: blur(4.8px);
  border-radius: 8px;
  width: 182px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border-radius: 8.8px; 
  border: 1.2px solid #7a7a7a; 
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding-bottom: 9px;
  padding-top: 9px;
  padding-left: 13px;
  padding-right: 60px;
  cursor: pointer;
  color:#ededed; 
  text-decoration: none;
}

.dropdown-item svg {
  width: 25px;
  height: 25px;
}

.dropdown-item span {
  margin-left: 13px;
  flex-grow: 1;
}

.dropdown-item:hover {
  background-color: rgba(122, 122, 122, 0.4); 
}

.btn:hover .tooltip {
  visibility: visible;
  opacity: 1;
  bottom: -100%;
  transition: opacity 0.3s ease; 
}

.btn .tooltip {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease; 
}

.btn::after {
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
}

.btn:hover::after {
  opacity: 1;
}

.btn svg {
  position: relative;
  z-index: 2; 
}

.btn img {
  width: 42px;
  height: 42px;
  padding-left: 5px;
  z-index: 2;
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
