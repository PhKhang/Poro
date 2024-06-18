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
      <p class="song-title">竹内まりや - Plastic Love (Official Audio)</p>
      <p class="song-artist">竹内まりや</p>
      <div class="controls">
        <button @click="toggleFavorite">
          <span v-if="isFavorite">⭐</span>
          <span v-else>☆</span>
        </button>
      </div>
    </div>
    <hr>
    <div class="youtube-input">
      <label for="youtube-url">Youtube Video:</label>
      <textarea name="" v-model="youtubeURL" id=""></textarea>
      <div id="video-background" :class="{ before: notPlay }" data-vbg-play-button="true"
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
const oldURL = ref("https://youtu.be/T_lC2O1oIew?si=Sh2nWSAaOr6EgrLI")

let { name } = defineProps(['name'])

import 'youtube-background';


let firstInstance = 1;
let notPlay = ref(true);


// window.addEventListener("beforeunload", function (e) {

//   var confirmationMessage = "\o/";
//   e.returnValue = confirmationMessage;
//   return confirmationMessage;

// });
console.log("abcd");
const doWhenMounted = onMounted(() => {
  const videoBackgrounds = new VideoBackgrounds('[data-vbg]', {
    'play-button': true,
    // 'autoplay': false,
    'mute-button': true
  });

  const firstElement = document.querySelector('[data-vbg]');

  firstInstance = videoBackgrounds.get(firstElement);

  document.querySelectorAll(".play").forEach(el => el.click())

  console.log(firstInstance)

  firstInstance.setVolume(0,5);

  if (oldURL.value !== youtubeURL.value) {
    oldURL.value = youtubeURL.value
    firstInstance.setSource(youtubeURL.value);
  }

  document.querySelector('#video-background').addEventListener('video-background-play', function (event) {
    console.log('video-background-play'); // the video instance object
    console.log(event.detail); // the video instance object

    notPlay.value = false;

    document.querySelector("iframe").setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");

    const myTimeout = setTimeout(() => {
      console.log("After 2s")
      try {
        firstInstance.unmute();
      }
      catch (err) {
        console.log(err)
      }

    }, 4000);
  });

  document.querySelector('#video-background').addEventListener('video-background-pause', function (event) {
    console.log('video-background-play'); // the video instance object
    console.log(event.detail); // the video instance object

    notPlay.value = true;

  });

})

function playVid() {
  console.log("Play the vid")
  if (oldURL.value !== youtubeURL.value) {
    oldURL.value = youtubeURL.value
    firstInstance.setSource(youtubeURL.value);
  }
  firstInstance.play()
  console.log("Unmuting")
  firstInstance.unmute()
  notPlay.value = false;
}

const themes = ['🌸', '🏙️', '☕', '🐱', '🎄', '🌊', '🔮', '⛩️'];
const isFavorite = ref(false);
const youtubeUrl = ref('');
const volume = ref(50);

const selectTheme = (theme) => {
  console.log(`Theme selected: ${theme}`);
  // Add logic to change background
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
const setVolume = () => {
  console.log(`Volume: ${volume.value}`);
  firstInstance.setVolume(volume.value/100);
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
