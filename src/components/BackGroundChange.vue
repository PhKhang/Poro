<template>
  <div>
    <div class="background-settings" v-show="isVisible">
      <div class="background-header">
        <h2 class="poppins-extrabold" style="font-size: 19.2px;">Background</h2>
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
      </div>
      <p class="background-instruction">Click themes below to change background</p>
      <div class="theme-icons">
        <div v-for="theme in currentThemes" :key="theme.id" class="theme-icon" @click="selectTheme(theme)">
          <span>{{ theme.icon }}</span>
        </div>
      </div>
      <div class="navigation-buttons">
        <button @click="prevThemeSet" :disabled="currentThemeIndex === 0">Previous</button>
        <button @click="nextThemeSet" :disabled="currentThemeIndex + themesPerPage >= themes.length">Next</button>
      </div>
      <hr>
      <div class="song-info">
        <p class="song-title">{{ vidtitle }}</p>
      </div>
      <hr>
      <div class="youtube-input">
        <div class="youtube-header">
          <span class="volume-icon">         
            <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.2698 3.39445C23.9896 2.35921 23.1809 1.55052 22.1457 1.27038C20.2833 0.762451 12.7875 0.762451 12.7875 0.762451C12.7875 0.762451 5.29164 0.777843 3.42923 1.28577C2.39398 1.56591 1.58529 2.3746 1.30516 3.40985C0.741817 6.71909 0.523253 11.7615 1.32055 14.9383C1.60068 15.9736 2.40937 16.7823 3.44462 17.0624C5.30703 17.5703 12.8029 17.5703 12.8029 17.5703C12.8029 17.5703 20.2987 17.5703 22.1611 17.0624C23.1963 16.7823 24.005 15.9736 24.2852 14.9383C24.8793 11.6245 25.0624 6.58518 24.2698 3.39445Z" fill="#FF0000"/>
              <path d="M10.4014 12.7681L16.6197 9.16638L10.4014 5.5647V12.7681Z" fill="white"/>
            </svg>                 
          </span>
          <label for="youtube-url" style="margin: 0;" class="poppins-semibold" >Youtube Video:</label>
        </div>
        <textarea v-model="youtubeURL" id="youtube-url"></textarea>
        <button @click="playVid" class="play" ref="myCoolDiv">Play</button>
      </div>
      <div class="volume-control">
        <label for="volume" class="poppins-semibold">Background Video volume:</label>
        <div class="slider-container">
          <span class="volume-icon">       
            <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg" alt="Volume icon">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3841 5.60071C12.6437 5.98237 11.7055 6.63676 10.3685 7.57221L10.1416 7.731C10.1243 7.74309 10.1073 7.75502 10.0904 7.7668C9.69634 8.04267 9.42339 8.23372 9.12429 8.37381C8.82953 8.51185 8.51974 8.61047 8.20205 8.6674C7.87968 8.72517 7.55269 8.72509 7.08057 8.725C7.06042 8.725 7.04 8.72498 7.01931 8.72498C5.52282 8.72498 5.01769 8.74289 4.58822 8.95375C4.17322 9.1575 3.73121 9.59882 3.51432 10.026C3.28805 10.4716 3.24652 10.9283 3.16665 12.319C3.14472 12.7006 3.13203 13.0664 3.13203 13.4C3.13203 13.7336 3.14472 14.0993 3.16665 14.481C3.24652 15.8717 3.28805 16.3284 3.51432 16.774C3.73121 17.2011 4.17322 17.6424 4.58822 17.8463C5.01769 18.0571 5.52282 18.075 7.01931 18.075C7.04 18.075 7.06041 18.075 7.08056 18.075C7.55269 18.0748 7.87968 18.0748 8.20205 18.1326C8.51974 18.1895 8.82953 18.2881 9.12429 18.4262C9.42339 18.5662 9.69634 18.7573 10.0904 19.0332C10.1073 19.0449 10.1243 19.0569 10.1416 19.069L10.3685 19.2278C11.7055 20.1632 12.6437 20.8176 13.3841 21.1993C14.1224 21.5799 14.4917 21.5952 14.7499 21.5016C14.8923 21.4501 15.0317 21.3747 15.1549 21.283C15.3794 21.1155 15.5841 20.7914 15.7281 19.943C15.8727 19.0906 15.926 17.9115 15.9997 16.2276C16.0537 14.9961 16.0893 13.9629 16.0893 13.4C16.0893 12.8371 16.0537 11.8039 15.9997 10.5724C15.926 8.88853 15.8727 7.7094 15.7281 6.85702C15.5841 6.00852 15.3794 5.6845 15.1549 5.51702C15.0317 5.4252 14.8923 5.34994 14.7499 5.29836C14.4917 5.20483 14.1224 5.22009 13.3841 5.60071ZM12.7047 4.11656C13.5609 3.67516 14.404 3.42966 15.2521 3.73679C15.5339 3.83885 15.8052 3.98536 16.0488 4.16706C16.7807 4.71288 17.0906 5.57529 17.2584 6.56468C17.4234 7.53748 17.4798 8.82662 17.5501 10.4325L17.5529 10.4958C17.6066 11.7222 17.6442 12.7928 17.6442 13.4C17.6442 14.0072 17.6066 15.0778 17.5529 16.3042L17.5501 16.3674C17.4798 17.9733 17.4234 19.2625 17.2584 20.2352C17.0906 21.2247 16.7807 22.0871 16.0488 22.6329C15.8052 22.8146 15.5339 22.9612 15.2521 23.0632C14.404 23.3704 13.5609 23.1248 12.7047 22.6834C11.8613 22.2487 10.8381 21.5327 9.56225 20.64L9.28569 20.4464C8.82139 20.1216 8.66167 20.013 8.49649 19.9357C8.31964 19.8529 8.13376 19.7937 7.94315 19.7595C7.76511 19.7276 7.57545 19.725 7.01931 19.725C6.96293 19.725 6.9073 19.7251 6.8524 19.7251C5.59096 19.7257 4.71447 19.7263 3.93534 19.3437C3.21512 18.9902 2.5219 18.2979 2.14549 17.5566C1.73851 16.7551 1.69075 15.9169 1.62285 14.7249C1.62016 14.6776 1.61743 14.6299 1.61465 14.5815C1.59138 14.1763 1.57715 13.7757 1.57715 13.4C1.57715 13.0243 1.59138 12.6237 1.61465 12.2186C1.61743 12.1702 1.62016 12.1223 1.62285 12.075C1.69075 10.8832 1.73851 10.0449 2.14549 9.24336C2.5219 8.502 3.21512 7.80986 3.93534 7.45626C4.71447 7.07373 5.59096 7.07421 6.85239 7.07493C6.9073 7.07495 6.96293 7.07498 7.01931 7.07498C7.57545 7.07498 7.76511 7.07233 7.94315 7.04043C8.13376 7.00628 8.31964 6.9471 8.49649 6.86428C8.66167 6.78692 8.82139 6.67835 9.28569 6.35347L9.56226 6.15997C10.8381 5.26723 11.8613 4.55129 12.7047 4.11656ZM21.0338 6.16644C21.3636 5.87474 21.8538 5.92204 22.1287 6.27207L21.5314 6.80022C22.1287 6.27207 22.1287 6.27207 22.1287 6.27207L22.1298 6.27358L22.1312 6.27528L22.1343 6.27926L22.1421 6.28945C22.148 6.29725 22.1552 6.30709 22.1639 6.31894C22.1813 6.34268 22.2037 6.37458 22.2309 6.4148C22.285 6.49525 22.3572 6.60899 22.441 6.75733C22.6088 7.05412 22.8232 7.4888 23.0345 8.07156C23.4576 9.23907 23.8637 10.9895 23.8637 13.4002C23.8637 15.8109 23.4576 17.5614 23.0345 18.7289C22.8232 19.3117 22.6088 19.7463 22.441 20.0431C22.3572 20.1915 22.285 20.3052 22.2309 20.3856C22.2037 20.4259 22.1813 20.4578 22.1639 20.4815C22.1588 20.4886 22.1541 20.495 22.1498 20.5006C22.147 20.5044 22.1445 20.5078 22.1421 20.511L22.1343 20.5212L22.1312 20.5252L22.1298 20.5269C22.1298 20.5269 22.1287 20.5284 21.5314 20.0002L22.1287 20.5284C21.8538 20.8784 21.3636 20.9257 21.0338 20.634C20.7055 20.3437 20.6598 19.8271 20.9302 19.4771M20.9302 19.4771C20.9302 19.4771 20.9321 19.4746 20.9338 19.4722C20.9393 19.4647 20.9502 19.4495 20.9657 19.4266C20.9964 19.3808 21.0458 19.3037 21.1078 19.1942C21.2314 18.9754 21.4058 18.6263 21.5832 18.1366C21.9376 17.1591 22.3089 15.6095 22.3089 13.4002C22.3089 11.1909 21.9376 9.64137 21.5832 8.66388C21.4058 8.17414 21.2314 7.82506 21.1078 7.60624C21.0458 7.49677 20.9964 7.41972 20.9657 7.37384C20.9502 7.3509 20.9393 7.33575 20.9338 7.32822C20.9321 7.32578 20.9302 7.32331 20.9302 7.32331L20.9338 7.32822L20.9323 7.32588L20.9302 7.32331C20.6598 6.97334 20.7055 6.45672 21.0338 6.16644M19.0807 9.37904C19.4561 9.15777 19.9294 9.30126 20.1378 9.69956L19.4869 10.0833C20.1378 9.69957 20.1378 9.69956 20.1378 9.69956L20.1386 9.701L20.1394 9.70254L20.1412 9.70589L20.1451 9.71372L20.1551 9.7339C20.1626 9.74938 20.1718 9.76892 20.1824 9.79258C20.2037 9.8399 20.2306 9.9037 20.2611 9.9846C20.322 10.1465 20.3973 10.3763 20.4705 10.6791C20.6169 11.2851 20.754 12.1791 20.754 13.4002C20.754 14.6214 20.6169 15.5154 20.4705 16.1214C20.3973 16.4241 20.322 16.654 20.2611 16.8158C20.2306 16.8967 20.2037 16.9605 20.1824 17.0078C20.1718 17.0315 20.1626 17.0511 20.1551 17.0666L20.1451 17.0867L20.1412 17.0945L20.1394 17.0979L20.1386 17.0995C20.1386 17.0995 20.1378 17.1009 19.4869 16.7171L20.1378 17.1009C19.9294 17.4992 19.4561 17.6427 19.0807 17.4214C18.7086 17.202 18.5725 16.7063 18.7734 16.3098L18.7786 16.2985C18.7857 16.2826 18.7993 16.251 18.8174 16.2031C18.8536 16.1072 18.9079 15.945 18.9643 15.7116C19.077 15.2451 19.1991 14.4891 19.1991 13.4002C19.1991 12.3114 19.077 11.5554 18.9643 11.0889C18.9079 10.8554 18.8536 10.6933 18.8174 10.5974C18.7993 10.5494 18.7857 10.5178 18.7786 10.502L18.7734 10.4907C18.5725 10.0941 18.7086 9.59844 19.0807 9.37904Z" fill="#EDEDED"/>
            </svg>                    
          </span>
          <input type="range" id="volume" v-model="volume" min="0" max="100" @input="setVolume">
        </div>
      </div>
    </div>
    <div id="video-background" :class="{ before: notPlay }" :data-vbg="youtubeURL"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';
import 'youtube-background';
const props = defineProps({
  isVisible: Boolean // Define props
});
const emit = defineEmits(['close']); // Define emits
const hideElement = () => {
  emit('close'); // Emit event to parent
};
let youtubeURL = ref("https://www.youtube.com/watch?v=yoY81oAiwD0");
let notPlay = ref(true);
let vidtitle = ref("");
let volume = ref(0);
let firstInstance;
let themeIndexes = ref(0);
let videoIndexes = ref(0);
let currentThemeIndex = ref(0);
const themesPerPage = 8;
const themesJs = [
  {
    "id": 0,
    "icon": "🌸",
    "name": "Spring",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0",
      "https://www.youtube.com/watch?v=AV5na_QOcX8",
      "https://www.youtube.com/watch?v=Nlp6FN-mizI"
    ]
  },
  {
    "id": 1,
    "icon": "🌃",
    "name": "Night",
    "videos": [
      "https://www.youtube.com/watch?v=N-vLYY9dsIk"
    ]
  },
  {
    "id": 2,
    "icon": "☕",
    "name": "Coffee",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 3,
    "icon": "🐱",
    "name": "Cat",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 4,
    "icon": "🎄",
    "name": "Christmas",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 5,
    "icon": "🌊",
    "name": "Ocean",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 6,
    "icon": "🔮",
    "name": "Mystery",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 7,
    "icon": "⛩️",
    "name": "Japan",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 8,
    "icon": "🎨",
    "name": "Art",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0",
      "https://www.youtube.com/watch?v=AV5na_QOcX8",
      "https://www.youtube.com/watch?v=Nlp6FN-mizI"
    ]
  },
  {
    "id": 9,
    "icon": "🐶",
    "name": "Pets",
    "videos": [
      "https://www.youtube.com/watch?v=N-vLYY9dsIk"
    ]
  },
  {
    "id": 10,
    "icon": "👩‍💻",
    "name": "Work With Me",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 11,
    "icon": "📚",
    "name": "Library",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 12,
    "icon": "💫",
    "name": "Universe",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 13,
    "icon": "🦉",
    "name": "Fantasy",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
];

const themes = themesJs.map(theme => ({ id: theme.id, icon: theme.icon }));

const currentThemes = computed(() => {
  const start = currentThemeIndex.value;
  const end = start + themesPerPage;
  return themes.slice(start, end);
});

const doWhenMounted = onMounted(() => {
  const videoBackgrounds = new VideoBackgrounds('[data-vbg]', {
    'play-button': false,
    'muted': false,
    'mute-button': false,
    'loop': true,
    'volume': 0.5,
  });
  const firstElement = document.querySelector('[data-vbg]');
  firstInstance = videoBackgrounds.get(firstElement);
  firstInstance.setSource(youtubeURL.value);
  volume.value = firstInstance.volume * 100;
  document.querySelector('#video-background').addEventListener('video-background-play', function (event) {
    notPlay.value = false;
    document.querySelector("iframe").setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
    vidtitle.value = firstInstance.player.videoTitle;
  });
});

async function getTitleVid(videoId) {
  const apiKey = 'AIzaSyAq98m57L7e7jFwHpFP1dlgzC_L6TgT9vs';
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const vidInfo = await response.json();
    let titleYtbvid = vidInfo.items[0].snippet.title;
    return titleYtbvid;
  } catch (error) {
    console.error('Error fetching video title:', error);
    return '';
  }
}

async function playVid() {
  firstInstance.setSource(youtubeURL.value);

  const { result: fetchData } = await $fetch('/api/user/update-theme', {
    method: "POST",
    body: { content: "# Hello world", id: 235 }
  })
  console.log(fetchData)

  const checkInstance = setInterval(() => {
    if (firstInstance !== null) {
      clearInterval(checkInstance);
      firstInstance.volume = 0.5;
      volume.value = firstInstance.volume * 100;
      firstInstance.play();
      firstInstance.unmute();
      notPlay.value = false;
      getTitleVid(firstInstance.id).then(titleResult => {
        vidtitle.value = titleResult;
      });
    }
  }, 500);
}

const selectTheme = (selectedTheme) => {
  const theme = themesJs.find(t => t.icon === selectedTheme.icon);
  if (theme) {
    if (themeIndexes.value !== theme.id) {
      themeIndexes.value = theme.id;
      videoIndexes.value = 0;
    } else {
      videoIndexes.value = (videoIndexes.value + 1) % theme.videos.length;
    }
  }
  youtubeURL.value = theme.videos[videoIndexes.value];
  playVid();
};

const prevThemeSet = () => {
  if (currentThemeIndex.value > 0) {
    currentThemeIndex.value -= themesPerPage;
  }
};

const nextThemeSet = () => {
  if (currentThemeIndex.value + themesPerPage < themes.length) {
    currentThemeIndex.value += themesPerPage;
  }
};

const setVolume = () => {
  firstInstance.setVolume(volume.value / 100);
};


</script>

<style scoped>
.background-header {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.background-settings {
  position: relative;
  background: rgba(34, 34, 34, 0.70);
  backdrop-filter: blur(6px);
  padding: 20px;
  margin-left: 10px;
  border-radius: 10px;
  color: white;
  width: 300px;
}

.background-instruction {
  margin-top: 0px;
  margin-bottom: 10px;
  color: #D7D7D7;
  font-family: "Source Sans 3";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.close-btn {
  cursor: pointer;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 10px;
}

.theme-icons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8.8px; /* Thay đổi khoảng cách giữa các phần tử */
  grid-column-gap: 21px; /* Khoảng cách giữa các nút trong cùng một hàng */
}

.theme-icon {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(34, 34, 34, 0.70);
  border-radius: 18.4px;
  border: 0.8px #7A7A7A;
  cursor: pointer;
}

.theme-icon span {
  font-size: 30px;
}

.song-info {
  margin: 0;
  width: 300px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Số dòng tối đa hiển thị */
  -webkit-box-orient: vertical;
}

.song-title {
  color: #ffd800;
  font-size: 16px;
  font-weight: bold;
  margin: 0px;
}

.controls {
  margin-top: 10px;
}

.youtube-input {
  margin: 20px 0;
}

.youtube-input label {
  display: block;
  margin-bottom: 5px;
}

.youtube-input input {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: none;
}

.youtube-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.volume-icon {
  display: flex;
  align-items: center;
  margin-right: 8px; 
}

.volume-control {
  margin-top: 20px;
  color: #ededed;
  display: flex;
  flex-direction: column;
}

.volume-control label {
  display: block;
  margin-bottom: 5px;

}

.slider-container {
  display: flex;
  align-items: center;
}

.volume-icon {
  margin-right: 10px;
  width: 26px;
  height: 27px;
}

.volume-control input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 3px;
  background: #ededed;
  outline: none;
  transition: opacity .15s ease-in-out;
  border-radius: 1.5px; 
}

.volume-control input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #ededed;
  cursor: pointer;
  border-radius: 50%;
}

.volume-control input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #ededed;
  border: #ededed;
  cursor: pointer;
  border-radius: 50%;
}


.before,
.before>* {
  background-color: red;
  width: 100px !important;
  height: 100px !important;
  position: unset !important;
  border-radius: 8px
}

#video-background {
  z-index: -99 !important;
}

.close-button,
.show-button {
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
