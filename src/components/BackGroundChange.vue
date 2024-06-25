<template>
  <div class="background-settings">
    <h2>Background</h2>
    <p>Click themes below to change background</p>
    <div class="theme-icons">
      <div v-for="theme in themes" :key="theme" class="theme-icon" @click="selectTheme(theme)">
        <span>{{ theme }}</span>
      </div>
    </div>
    <hr>
    <div class="song-info">
      <p class="song-title">{{ vidtitle }}</p>
    </div>
    <hr>
    <div class="youtube-input">
      <label for="youtube-url">Youtube Video:</label>
      <textarea name="" v-model="youtubeURL" id=""></textarea>
      <div id="video-background" :class="{ before: notPlay }"
        data-vbg="https://youtu.be/T_lC2O1oIew?si=Sh2nWSAaOr6EgrLI"></div>
      <button @click="playVid" class="play" ref="myCoolDiv">Play/Pause</button>
    </div>
    <div class="volume-control">
      <label for="volume">Background Video volume:</label>
      <input type="range" id="volume" v-model="volume" min="0" max="100" @input="setVolume">
    </div>
  </div>
</template>


<script setup>
const youtubeURL = ref("https://youtu.be/T_lC2O1oIew?si=Sh2nWSAaOr6EgrLI")
const oldURL = ref("")

let { name } = defineProps(['name'])

import 'youtube-background';


let firstInstance = 1;
let notPlay = ref(true);
let vidtitle = ref("");
let volume = ref(0);


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
  document.querySelectorAll(".play").forEach(el => el.click())

  if (oldURL.value !== youtubeURL.value) {
    oldURL.value = youtubeURL.value
    firstInstance.setSource(youtubeURL.value);
  }
  volume.value = firstInstance.volume * 100;
  document.querySelector('#video-background').addEventListener('video-background-play', function (event) {
    notPlay.value = false;
    document.querySelector("iframe").setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
    vidtitle.value = firstInstance.player.videoTitle;
  });

  document.querySelector('#video-background').addEventListener('video-background-pause', function (event) {
    notPlay.value = true;
  });

})

function playVid() {
  if (oldURL.value !== youtubeURL.value) {
    oldURL.value = youtubeURL.value;
    let oldInstance = firstInstance;
    firstInstance.setSource(youtubeURL.value);

    // Sử dụng setInterval để kiểm tra liên tục
    const checkInstance = setInterval(() => {
      if (firstInstance !== null) {
        clearInterval(checkInstance); // Dừng setInterval khi firstInstance khác null

        firstInstance.volume = 0.25;
        volume.value = firstInstance.volume * 100;
        firstInstance.play();
        firstInstance.unmute();
        notPlay.value = false;
        vidtitle.value = firstInstance.player.videoTitle;
        console.log(firstInstance.player.videoTitle);
        console.log(firstInstance)
        console.log(firstInstance.player.videoTitle);
      }
    }, 100); // Kiểm tra mỗi 100ms
  }
}



const themesJs = [
  {
    "id": '1',
    "icon": '🌸',
    "link": 'https://www.youtube.com/watch?v=yoY81oAiwD0'
  },
  {
    "id": '2',
    "icon": '🌃',
    "link": 'https://www.youtube.com/watch?v=N-vLYY9dsIk'
  },
  {
    "id": '3',
    "icon": '☕',
    "link": 'https://www.youtube.com/watch?v=yoY81oAiwD0'
  },
  {
    "id": '4',
    "icon": '🐱',
    "link": 'https://www.youtube.com/watch?v=yoY81oAiwD0'
  },
  {
    "id": '5',
    "icon": '🎄',
    "link": 'https://www.youtube.com/watch?v=yoY81oAiwD0'
  },
  {
    "id": '6',
    "icon": '🌊',
    "link": 'https://www.youtube.com/watch?v=yoY81oAiwD0'
  },
  {
    "id": '7',
    "icon": '🔮',
    "link": 'https://www.youtube.com/watch?v=yoY81oAiwD0'
  },
  {
    "id": '8',
    "icon": '⛩️',
    "link": 'https://www.youtube.com/watch?v=yoY81oAiwD0'
  }
];
const themes = themesJs.map(theme => theme.icon);

const selectTheme = (selectedTheme) => {
  for (const theme of themesJs) {
    if (selectedTheme === theme.icon) {
      youtubeURL.value = theme.link;
      break;
    }
  }
};

const setVolume = () => {
  firstInstance.setVolume(volume.value / 100);
};
</script>

<style scoped>
.background-settings {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  color: white;
  width: 300px;
  font-family: Arial, sans-serif;
}

.theme-icons {
  display: flex;
  flex-wrap: wrap;
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

.song-artist {
  font-size: 14px;
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

  border-radius: 8px;
}


#video-background {
  z-index: -99 !important;
}
</style>
