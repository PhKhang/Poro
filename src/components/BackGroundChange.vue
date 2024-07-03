<template>
  <div>
    <div class="background-settings" v-show="isVisible">
      <button class="close-btn" @click="hideElement">-</button>
      <h2>Background</h2>
      <p>Click themes below to change background</p>
      <div class="navigation-buttons">
        <button @click="prevThemeSet" :disabled="currentThemeIndex === 0">Previous</button>
        <button @click="nextThemeSet" :disabled="currentThemeIndex + themesPerPage >= themes.length">Next</button>
      </div>
      <div class="theme-icons">
        <div v-for="theme in currentThemes" :key="theme.id" class="theme-icon" @click="selectTheme(theme)">
          <span>{{ theme.icon }}</span>
        </div>
      </div>
      <hr>
      <div class="song-info">
        <p class="song-title">{{ vidtitle }}</p>
      </div>
      <hr>
      <div class="youtube-input">
        <label for="youtube-url">Youtube Video:</label>
        <textarea v-model="youtubeURL" id="youtube-url"></textarea>
        <button @click="playVid" class="play" ref="myCoolDiv">Play</button>
      </div>
      <div class="volume-control">
        <label for="volume">Background Video volume:</label>
        <input type="range" id="volume" v-model="volume" min="0" max="100" @input="setVolume">
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
    "icon": "🌸",
    "name": "Spring",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0",
      "https://www.youtube.com/watch?v=AV5na_QOcX8",
      "https://www.youtube.com/watch?v=Nlp6FN-mizI"
    ]
  },
  {
    "id": 9,
    "icon": "🌃",
    "name": "Night",
    "videos": [
      "https://www.youtube.com/watch?v=N-vLYY9dsIk"
    ]
  },
  {
    "id": 10,
    "icon": "☕",
    "name": "Coffee",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 11,
    "icon": "🐱",
    "name": "Cat",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 12,
    "icon": "🎄",
    "name": "Christmas",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 13,
    "icon": "🌊",
    "name": "Ocean",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 14,
    "icon": "⛩️",
    "name": "Mystery",
    "videos": [
      "https://www.youtube.com/watch?v=yoY81oAiwD0"
    ]
  },
  {
    "id": 15,
    "icon": "⛩️",
    "name": "Japan",
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
    'volume': 0.25,
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

function playVid() {
  firstInstance.setSource(youtubeURL.value);

  const checkInstance = setInterval(() => {
    if (firstInstance !== null) {
      clearInterval(checkInstance);
      firstInstance.volume = 0.25;
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
.background-settings {
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  color: white;
  width: 300px;
  font-family: Arial, sans-serif;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.theme-icons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.theme-icon {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
}

.theme-icon span {
  font-size: 24px;
}

.song-info {
  margin: 20px 0;
}

.song-title {
  font-size: 16px;
  font-weight: bold;
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

.volume-control {
  margin-top: 20px;
}

.volume-control label {
  display: block;
  margin-bottom: 5px;
}

.volume-control input {
  width: 100%;
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
