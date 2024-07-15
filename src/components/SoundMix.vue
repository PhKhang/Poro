<template>
    <div id="audio-board" class="sounds">
        <p>Sounds</p>
        <button class="close-btn" @click="hideElement">-</button>
        <div class="audio-list">
            <div v-for="(sound, index) in sounds" :key="index" class="audio-control">
                <audio v-if="sound.name === 'Rain'" :id="'audio-player-' + index" loop>
                    <source src="./soundeffects/rain.mp3" type="audio/mpeg">
                </audio>
                <audio v-else-if="sound.name === 'Waves'" :id="'audio-player-' + index" loop>
                    <source src="./soundeffects/waves.mp3" type="audio/mpeg">
                </audio>
                <audio v-else-if="sound.name === 'Fireplace'" :id="'audio-player-' + index" loop>
                    <source src="./soundeffects/fireplace.mp3" type="audio/mpeg">
                </audio>
                <audio v-else-if="sound.name === 'Library'" :id="'audio-player-' + index" loop>
                    <source src="./soundeffects/library.mp3" type="audio/mpeg">
                </audio>
                <div class="sound-icon">{{ getSoundIcon(index) }}</div>
                <label :for="'volume-' + index" class="sr-only">{{ sound.name }} Volume</label>
                <input type="range" :id="'volume-' + index" v-model="sound.volume" min="0" max="100"
                    @input="setVolume(index)">
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const emit = defineEmits(['close']); // Define emits
const hideElement = () => {
    emit('close'); // Emit event to parent
};
const sounds = ref([
    { name: "Rain", volume: 0 },
    { name: "Waves", volume: 0 },
    { name: "Fireplace", volume: 0 },
    { name: "Library", volume: 0 },
    { name: "Rain", volume: 0 },
    { name: "Waves", volume: 0 },
    { name: "Fireplace", volume: 0 },
    { name: "Library", volume: 0 },
]);

const setVolume = (index) => {
    const audioElement = document.getElementById('audio-player-' + index);
    if (audioElement) {
        audioElement.volume = sounds.value[index].volume / 100;
    }
};

const playAllSounds = () => {
    sounds.value.forEach((sound, index) => {
        const audioElement = document.getElementById('audio-player-' + index);
        if (audioElement) {
            audioElement.play().catch(error => {
                console.error('Error playing audio:', error);
                // Handle the error (e.g., show a message to the user)
            });
        }
    });
};

onMounted(() => {
    sounds.value.forEach((sound, index) => {
        setVolume(index);
    });
    playAllSounds();
});

const getSoundIcon = (index) => {
    switch (sounds.value[index].name) {
        case 'Rain':
            return '🌧️';
        case 'Waves':
            return '🌊';
        case 'Fireplace':
            return '🔥';
        case 'Library':
            return '📚';
        default:
            return '🔊';
    }
};
</script>
<style scoped>
#audio-board {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    width: 250px;
    max-height: 400px;
    background-color: #333;
    border-radius: 8px;
    padding: 10px;
    z-index: 1000;
    overflow: hidden;
    /* Prevent overflowing content */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: white;
}

#audio-board p {
    margin: 0;
    padding-bottom: 10px;
    font-size: 1.2em;
    font-weight: bold;
    text-align: left;
}

.audio-list {
    overflow-y: auto;
    max-height: 200px;
    padding-right: 5px;
    padding-bottom: 15px;
}

.audio-control {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-top: 10px;
}

.sound-icon {
    font-size: 1.5em;
    margin-right: 10px;
}

input[type=range] {
    flex: 1;
    height: 5px;
    background: #444;
    outline: none;
    opacity: 0.7;
    transition: opacity .2s;
}

input[type=range]:hover {
    opacity: 1;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
</style>
