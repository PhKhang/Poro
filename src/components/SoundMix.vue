<template>
    <div id="audio-board" class="sounds">
        <div class="sound-header">
            <h2 class="poppins-extrabold" style="font-size: 19.2px;">Sound</h2>
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
        <div class="audio-list">
            <div v-for="(sound, index) in sounds" :key="index" class="audio-control">
                <audio v-if="sound.name === 'Rain'" :id="'audio-player-' + index" loop>
                    <source src="./soundeffects/rain.mp3" type="audio/mpeg">
                </audio>
                <audio v-if="sound.name === 'Birds'" :id="'audio-player-' + index" loop>
                    <source src="./soundeffects/birds.mp3" type="audio/mpeg">
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
                <audio v-else-if="sound.name === 'Keyboard Typing'" :id="'audio-player-' + index" loop>
                    <source src="./soundeffects/keyboard-typing.mp3" type="audio/mpeg">
                </audio>
                <div class="sound-control">
                    <div class="icon-and-name">
                        <div class="sound-icon">{{ getSoundIcon(index) }}</div>
                        <p class="sound-name">{{ sound.name }}</p>
                    </div>
                    <div class="slider-container" >
                        <span class="volume-icon" @click="toggleVolume(index)">       
                            <svg v-if="sound.volume > 0" width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg" alt="Volume icon">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3841 5.60071C12.6437 5.98237 11.7055 6.63676 10.3685 7.57221L10.1416 7.731C10.1243 7.74309 10.1073 7.75502 10.0904 7.7668C9.69634 8.04267 9.42339 8.23372 9.12429 8.37381C8.82953 8.51185 8.51974 8.61047 8.20205 8.6674C7.87968 8.72517 7.55269 8.72509 7.08057 8.725C7.06042 8.725 7.04 8.72498 7.01931 8.72498C5.52282 8.72498 5.01769 8.74289 4.58822 8.95375C4.17322 9.1575 3.73121 9.59882 3.51432 10.026C3.28805 10.4716 3.24652 10.9283 3.16665 12.319C3.14472 12.7006 3.13203 13.0664 3.13203 13.4C3.13203 13.7336 3.14472 14.0993 3.16665 14.481C3.24652 15.8717 3.28805 16.3284 3.51432 16.774C3.73121 17.2011 4.17322 17.6424 4.58822 17.8463C5.01769 18.0571 5.52282 18.075 7.01931 18.075C7.04 18.075 7.06041 18.075 7.08056 18.075C7.55269 18.0748 7.87968 18.0748 8.20205 18.1326C8.51974 18.1895 8.82953 18.2881 9.12429 18.4262C9.42339 18.5662 9.69634 18.7573 10.0904 19.0332C10.1073 19.0449 10.1243 19.0569 10.1416 19.069L10.3685 19.2278C11.7055 20.1632 12.6437 20.8176 13.3841 21.1993C14.1224 21.5799 14.4917 21.5952 14.7499 21.5016C14.8923 21.4501 15.0317 21.3747 15.1549 21.283C15.3794 21.1155 15.5841 20.7914 15.7281 19.943C15.8727 19.0906 15.926 17.9115 15.9997 16.2276C16.0537 14.9961 16.0893 13.9629 16.0893 13.4C16.0893 12.8371 16.0537 11.8039 15.9997 10.5724C15.926 8.88853 15.8727 7.7094 15.7281 6.85702C15.5841 6.00852 15.3794 5.6845 15.1549 5.51702C15.0317 5.4252 14.8923 5.34994 14.7499 5.29836C14.4917 5.20483 14.1224 5.22009 13.3841 5.60071ZM12.7047 4.11656C13.5609 3.67516 14.404 3.42966 15.2521 3.73679C15.5339 3.83885 15.8052 3.98536 16.0488 4.16706C16.7807 4.71288 17.0906 5.57529 17.2584 6.56468C17.4234 7.53748 17.4798 8.82662 17.5501 10.4325L17.5529 10.4958C17.6066 11.7222 17.6442 12.7928 17.6442 13.4C17.6442 14.0072 17.6066 15.0778 17.5529 16.3042L17.5501 16.3674C17.4798 17.9733 17.4234 19.2625 17.2584 20.2352C17.0906 21.2247 16.7807 22.0871 16.0488 22.6329C15.8052 22.8146 15.5339 22.9612 15.2521 23.0632C14.404 23.3704 13.5609 23.1248 12.7047 22.6834C11.8613 22.2487 10.8381 21.5327 9.56225 20.64L9.28569 20.4464C8.82139 20.1216 8.66167 20.013 8.49649 19.9357C8.31964 19.8529 8.13376 19.7937 7.94315 19.7595C7.76511 19.7276 7.57545 19.725 7.01931 19.725C6.96293 19.725 6.9073 19.7251 6.8524 19.7251C5.59096 19.7257 4.71447 19.7263 3.93534 19.3437C3.21512 18.9902 2.5219 18.2979 2.14549 17.5566C1.73851 16.7551 1.69075 15.9169 1.62285 14.7249C1.62016 14.6776 1.61743 14.6299 1.61465 14.5815C1.59138 14.1763 1.57715 13.7757 1.57715 13.4C1.57715 13.0243 1.59138 12.6237 1.61465 12.2186C1.61743 12.1702 1.62016 12.1223 1.62285 12.075C1.69075 10.8832 1.73851 10.0449 2.14549 9.24336C2.5219 8.502 3.21512 7.80986 3.93534 7.45626C4.71447 7.07373 5.59096 7.07421 6.85239 7.07493C6.9073 7.07495 6.96293 7.07498 7.01931 7.07498C7.57545 7.07498 7.76511 7.07233 7.94315 7.04043C8.13376 7.00628 8.31964 6.9471 8.49649 6.86428C8.66167 6.78692 8.82139 6.67835 9.28569 6.35347L9.56226 6.15997C10.8381 5.26723 11.8613 4.55129 12.7047 4.11656ZM21.0338 6.16644C21.3636 5.87474 21.8538 5.92204 22.1287 6.27207L21.5314 6.80022C22.1287 6.27207 22.1287 6.27207 22.1287 6.27207L22.1298 6.27358L22.1312 6.27528L22.1343 6.27926L22.1421 6.28945C22.148 6.29725 22.1552 6.30709 22.1639 6.31894C22.1813 6.34268 22.2037 6.37458 22.2309 6.4148C22.285 6.49525 22.3572 6.60899 22.441 6.75733C22.6088 7.05412 22.8232 7.4888 23.0345 8.07156C23.4576 9.23907 23.8637 10.9895 23.8637 13.4002C23.8637 15.8109 23.4576 17.5614 23.0345 18.7289C22.8232 19.3117 22.6088 19.7463 22.441 20.0431C22.3572 20.1915 22.285 20.3052 22.2309 20.3856C22.2037 20.4259 22.1813 20.4578 22.1639 20.4815C22.1588 20.4886 22.1541 20.495 22.1498 20.5006C22.147 20.5044 22.1445 20.5078 22.1421 20.511L22.1343 20.5212L22.1312 20.5252L22.1298 20.5269C22.1298 20.5269 22.1287 20.5284 21.5314 20.0002L22.1287 20.5284C21.8538 20.8784 21.3636 20.9257 21.0338 20.634C20.7055 20.3437 20.6598 19.8271 20.9302 19.4771M20.9302 19.4771C20.9302 19.4771 20.9321 19.4746 20.9338 19.4722C20.9393 19.4647 20.9502 19.4495 20.9657 19.4266C20.9964 19.3808 21.0458 19.3037 21.1078 19.1942C21.2314 18.9754 21.4058 18.6263 21.5832 18.1366C21.9376 17.1591 22.3089 15.6095 22.3089 13.4002C22.3089 11.1909 21.9376 9.64137 21.5832 8.66388C21.4058 8.17414 21.2314 7.82506 21.1078 7.60624C21.0458 7.49677 20.9964 7.41972 20.9657 7.37384C20.9502 7.3509 20.9393 7.33575 20.9338 7.32822C20.9321 7.32578 20.9302 7.32331 20.9302 7.32331L20.9338 7.32822L20.9323 7.32588L20.9302 7.32331C20.6598 6.97334 20.7055 6.45672 21.0338 6.16644M19.0807 9.37904C19.4561 9.15777 19.9294 9.30126 20.1378 9.69956L19.4869 10.0833C20.1378 9.69957 20.1378 9.69956 20.1378 9.69956L20.1386 9.701L20.1394 9.70254L20.1412 9.70589L20.1451 9.71372L20.1551 9.7339C20.1626 9.74938 20.1718 9.76892 20.1824 9.79258C20.2037 9.8399 20.2306 9.9037 20.2611 9.9846C20.322 10.1465 20.3973 10.3763 20.4705 10.6791C20.6169 11.2851 20.754 12.1791 20.754 13.4002C20.754 14.6214 20.6169 15.5154 20.4705 16.1214C20.3973 16.4241 20.322 16.654 20.2611 16.8158C20.2306 16.8967 20.2037 16.9605 20.1824 17.0078C20.1718 17.0315 20.1626 17.0511 20.1551 17.0666L20.1451 17.0867L20.1412 17.0945L20.1394 17.0979L20.1386 17.0995C20.1386 17.0995 20.1378 17.1009 19.4869 16.7171L20.1378 17.1009C19.9294 17.4992 19.4561 17.6427 19.0807 17.4214C18.7086 17.202 18.5725 16.7063 18.7734 16.3098L18.7786 16.2985C18.7857 16.2826 18.7993 16.251 18.8174 16.2031C18.8536 16.1072 18.9079 15.945 18.9643 15.7116C19.077 15.2451 19.1991 14.4891 19.1991 13.4002C19.1991 12.3114 19.077 11.5554 18.9643 11.0889C18.9079 10.8554 18.8536 10.6933 18.8174 10.5974C18.7993 10.5494 18.7857 10.5178 18.7786 10.502L18.7734 10.4907C18.5725 10.0941 18.7086 9.59844 19.0807 9.37904Z" fill="#EDEDED"/>
                            </svg>       
                            <svg v-else width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6442 12.3998C16.6442 11.9441 16.2961 11.5748 15.8668 11.5748C15.4374 11.5748 15.0893 11.9441 15.0893 12.3998H16.6442ZM10.0734 18.7197C9.71426 18.47 9.23235 18.5765 8.99701 18.9576C8.76168 19.3387 8.86203 19.8501 9.22116 20.0998L10.0734 18.7197ZM9.14158 6.73075L9.36853 6.57197L8.51264 5.19445L8.28569 5.35323L9.14158 6.73075ZM2.16665 13.4808C2.14473 13.0991 2.13203 12.7333 2.13203 12.3998H0.577148C0.577148 12.7755 0.591384 13.1761 0.614651 13.5812L2.16665 13.4808ZM2.13203 12.3998C2.13203 12.0662 2.14473 11.7004 2.16665 11.3187L0.614651 11.2184C0.591384 11.6234 0.577148 12.024 0.577148 12.3998H2.13203ZM15.0893 12.3998C15.0893 12.9627 15.0537 13.9959 14.9997 15.2274L16.5529 15.304C16.6066 14.0775 16.6442 13.007 16.6442 12.3998H15.0893ZM6.01931 7.72474C6.52478 7.72474 6.86593 7.72739 7.20205 7.66716L6.94315 6.04019C6.76511 6.07209 6.57545 6.07474 6.01931 6.07474V7.72474ZM8.28569 5.35323C7.82139 5.6781 7.66167 5.78668 7.49649 5.86403L8.12429 7.37356C8.43616 7.2275 8.71959 7.02601 9.14158 6.73075L8.28569 5.35323ZM7.20205 7.66716C7.51974 7.61022 7.82953 7.51161 8.12429 7.37356L7.49649 5.86403C7.31964 5.94686 7.13376 6.00603 6.94315 6.04019L7.20205 7.66716ZM6.01931 18.7248C6.57545 18.7248 6.76511 18.7274 6.94315 18.7593L7.20205 17.1323C6.86593 17.0721 6.52478 17.0748 6.01931 17.0748V18.7248ZM6.01931 17.0748C4.52282 17.0748 4.01769 17.0568 3.58822 16.846L2.93534 18.3435C3.74839 18.7427 4.66744 18.7248 6.01931 18.7248V17.0748ZM0.614651 13.5812C0.687528 14.85 0.722365 15.7231 1.14549 16.5563L2.51432 15.7737C2.28805 15.3281 2.24652 14.8713 2.16665 13.4808L0.614651 13.5812ZM3.58822 16.846C3.17323 16.6422 2.73121 16.2009 2.51432 15.7737L1.14549 16.5563C1.5219 17.2977 2.21512 17.9898 2.93534 18.3435L3.58822 16.846ZM14.9997 15.2274C14.926 16.9112 14.8727 18.0904 14.7281 18.9427C14.5841 19.7912 14.3794 20.1153 14.1549 20.2827L15.0488 21.6327C15.7807 21.0869 16.0906 20.2244 16.2584 19.235C16.4256 18.2496 16.4813 16.9392 16.5529 15.304L14.9997 15.2274ZM14.2521 22.0629C14.5339 21.9608 14.8052 21.8143 15.0488 21.6327L14.1549 20.2827C14.0317 20.3745 13.8923 20.4498 13.7499 20.5014L14.2521 22.0629ZM9.36853 6.57197C10.7055 5.6365 11.6437 4.98213 12.3841 4.60047C13.1224 4.21985 13.4917 4.20459 13.7499 4.29812L14.2521 2.73654C13.404 2.42942 12.5609 2.67492 11.7047 3.11632C10.8504 3.55667 9.81165 4.28555 8.51264 5.19445L9.36853 6.57197ZM13.7499 4.29812C13.8923 4.3497 14.0317 4.42495 14.1549 4.51678L15.0488 3.16681C14.8052 2.98511 14.5339 2.8386 14.2521 2.73654L13.7499 4.29812ZM6.01931 6.07474C4.66744 6.07474 3.74839 6.05684 2.93534 6.45601L3.58822 7.9535C4.01769 7.74265 4.52282 7.72474 6.01931 7.72474V6.07474ZM2.16665 11.3187C2.24652 9.92811 2.28805 9.47139 2.51432 9.02577L1.14549 8.24312C0.722365 9.07646 0.687528 9.94946 0.614651 11.2184L2.16665 11.3187ZM2.93534 6.45601C2.21512 6.80961 1.5219 7.50176 1.14549 8.24312L2.51432 9.02577C2.73121 8.59858 3.17323 8.15725 3.58822 7.9535L2.93534 6.45601ZM9.22116 20.0998C10.2979 20.8486 11.1892 21.4469 11.9489 21.8037C12.7184 22.1648 13.4829 22.3414 14.2521 22.0629L13.7499 20.5014C13.5162 20.586 13.191 20.5824 12.5779 20.2947C11.9551 20.0023 11.1708 19.4829 10.0734 18.7197L9.22116 20.0998ZM16.5127 8.59373C16.4498 7.24387 16.3812 6.13751 16.2057 5.28246C16.0277 4.41518 15.7116 3.6611 15.0488 3.16681L14.1549 4.51678C14.3578 4.6682 14.5456 4.94755 14.6865 5.63374C14.8299 6.33214 14.8956 7.29924 14.9597 8.67514L16.5127 8.59373Z" fill="#EDEDED"/>
                                <path d="M20.5312 18.9999C20.5312 18.9999 22.0861 17.0199 22.0861 12.3999C22.0861 9.72314 21.5642 7.9326 21.1251 6.8999" stroke="#EDEDED" stroke-width="1.65" stroke-linecap="round"/>
                                <path d="M18.4585 15.7C18.4585 15.7 18.9768 14.71 18.9768 12.4C18.9768 11.4519 18.8895 10.7262 18.7866 10.2" stroke="#EDEDED" stroke-width="1.65" stroke-linecap="round"/>
                                <path d="M22.6048 1.3999L1.87305 23.3999" stroke="#EDEDED" stroke-width="1.65" stroke-linecap="round"/>
                            </svg>                           
                        </span>
                        <input type="range" :id="'volume-' + index" v-model="sound.volume" min="0" max="100" @input="setVolume(index)" :style="{ background: `linear-gradient(to right, #ededed ${sound.volume}%, #7a7a7a ${sound.volume}%)` }">
                    </div>
                </div>
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
    { name: "Waves", volume: 0 },
    { name: "Birds", volume: 0 },
    { name: "Rain", volume: 0 },
    { name: "Fireplace", volume: 0 },
    { name: "Library", volume: 0 },
    { name: "Keyboard Typing", volume: 0 }
]);

const previousVolumes = ref({});

const setVolume = (index) => {
    const audioElement = document.getElementById('audio-player-' + index);
    if (audioElement) {
        audioElement.volume = sounds.value[index].volume / 100;
    }
};

const toggleVolume = (index) => {
    const currentVolume = sounds.value[index].volume;

    if (currentVolume > 0) {
        previousVolumes.value[index] = currentVolume;
        sounds.value[index].volume = 0;
    } else {
        sounds.value[index].volume = previousVolumes.value[index] || 50;
    }
    setVolume(index); 
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
        case 'Birds':
            return '🐦';
        case 'Waves':
            return '🌊';
        case 'Fireplace':
            return '🔥';
        case 'Library':
            return '📚';
        case 'Keyboard Typing':
            return '💻';
        default:
            return '🔊';
    }
};
</script>

<style scoped>
#audio-board {
    position: absolute;
    top: 10px;
    right: 12px;
    display: flex;
    flex-direction: column;
    width: 230px;
    background: rgba(34, 34, 34, 0.70);
    backdrop-filter: blur(4.8px);
    border-radius: 10px;
    border:#7A7A7A 0.8px solid;
    padding: 10px 20px 25px 20px;
    z-index: 2;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: white;
    margin-top: 55px;
}

.sound-header {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2px;
}  

.close-btn {
    cursor: pointer;
}

#audio-board p {
    margin: 0;
    padding-bottom: 10px;
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
    width: 100%;
    max-width: 300px;
    align-items: center;
    margin-bottom: 2px;
    padding-top: 5px;
}

.sound-control {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.sound-name {
    margin: 0;
    padding-bottom: 0 !important;
    font-family: "Source Sans 3", sans-serif;
    font-optical-sizing: auto;
    font-size: 18px;
    font-style: normal;
    font-family: "Source Sans 3";
    font-weight: 400;
    line-height: normal;
}

.sound-icon {
    display: flex;
    align-items: center;
    font-size: 18px;
}
  
.icon-and-name {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px; 
}

.slider-container {
    display: flex;
    align-items: center;
    padding-top: 2px;
    width: 95%;
}

.volume-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    cursor: pointer;
}

.slider-container input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 3px;
    outline: none;
    transition: background 0.15s ease-in-out;
    border-radius: 1.5px;
    background-size: 100% 100%;
    cursor: pointer;
}

.slider-container input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #ededed;
    cursor: pointer;
    border-radius: 50%;
    position: relative;
    z-index: 2;
}

.slider-container input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #ededed;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    z-index: 2;
    position: relative;
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
