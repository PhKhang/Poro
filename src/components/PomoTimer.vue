<template>
  <div class="pomodoro-timer">
    <div class="mode-switch">
      <div class="button-wrapper">
        <button :class="{ active: isWorking }" @click="switchToPomodoro">Pomodoro</button>
      </div>
      <div class="button-wrapper">
        <button :class="{ active: !isWorking }" @click="switchToBreak">Break</button>
      </div>
    </div>
    <!--h1>{{ isWorking ? 'Work Time' : 'Break Time' }}</h1-->
    <div class="time-display poppins-semibold">
      {{ minutes }}:{{ seconds }}
    </div>
    
    <div class="controls">
      <div v-if="!isTimerRunning" class="button-wrapper">
        <svg v-if="!isTimerRunning" @click="startTimer" width="19" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.882812 16.266C0.882812 16.8644 1.13801 17.3396 1.64841 17.6916C1.93001 17.85 2.22921 17.9292 2.54601 17.9292C2.79241 17.9292 3.03881 17.8676 3.28521 17.7444L16.6172 11.0916C16.8812 10.9508 17.1012 10.7484 17.2772 10.4844C17.4532 10.2204 17.5324 9.92115 17.5148 9.58675C17.4972 9.25235 17.418 8.96195 17.2772 8.71555C17.1364 8.46915 16.9164 8.26675 16.6172 8.10835L3.28521 1.45555C3.03881 1.33235 2.79241 1.27075 2.54601 1.27075C2.24681 1.27075 1.94761 1.34995 1.64841 1.50835C1.13801 1.84275 0.882812 2.31795 0.882812 2.93395V16.266Z" fill="#EDEDED" stroke="#EDEDED" stroke-width="0.825"/>
        </svg>
      </div>
      <div v-if="isTimerRunning" class="button-wrapper">
        <svg @click="pauseTimer" width="19" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.95176 0.914307C1.77925 0.914307 0.827637 1.8871 0.827637 3.08572V16.1142C0.827637 17.3128 1.77925 18.2856 2.95176 18.2856C4.12428 18.2856 5.07589 17.3128 5.07589 16.1142V3.08572C5.07589 1.8871 4.12428 0.914307 2.95176 0.914307ZM13.5724 3.08572V16.1142C13.5724 17.3128 12.6208 18.2856 11.4483 18.2856C10.2758 18.2856 9.32414 17.3128 9.32414 16.1142V3.08572C9.32414 1.8871 10.2758 0.914307 11.4483 0.914307C12.6208 0.914307 13.5724 1.8871 13.5724 3.08572Z" fill="#EDEDED"/>
        </svg>
      </div>
      <div class="button-wrapper">
        <svg @click="resetTimer" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.580666 16.279C0.580666 16.7366 0.739066 17.1238 1.05587 17.4406C1.37267 17.7574 1.76867 17.9246 2.24387 17.9422H15.5495C16.0071 17.9422 16.4031 17.775 16.7375 17.4406C17.0719 17.1062 17.2303 16.719 17.2127 16.279V2.94699C17.2127 2.48939 17.0543 2.09339 16.7375 1.75899C16.4207 1.42459 16.0247 1.26619 15.5495 1.28379H2.24387C1.78627 1.28379 1.39027 1.44219 1.05587 1.75899C0.721466 2.07579 0.563066 2.47179 0.580666 2.94699V16.279Z" fill="#EDEDED" stroke="#EDEDED" stroke-width="0.825"/>
        </svg>
      </div>
      <div class="button-wrapper">
        <svg @click="toggleSettings" width="19" height="19" viewBox="0 0 20 20" :style="{ fill: showSettings ? '#FFD800' : '#EDEDED', transform: showSettings ? 'rotate(30deg)' : 'rotate(0deg)'}" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.79414 0.200195C7.3908 0.200195 6.25314 1.33786 6.25314 2.74124C6.25314 2.94462 6.11289 3.21597 5.77768 3.39802C5.67453 3.45404 5.5728 3.5123 5.47256 3.57273C5.13824 3.77427 4.8244 3.76133 4.64014 3.6559C3.41634 2.95568 1.85684 3.37353 1.14709 4.59183L0.442666 5.80097C-0.268444 7.02161 0.151216 8.5879 1.37737 9.2894C1.55514 9.3912 1.72229 9.6499 1.71415 10.0348C1.71299 10.0898 1.7124 10.145 1.7124 10.2002C1.7124 10.2555 1.71299 10.3106 1.71415 10.3656C1.72229 10.7506 1.55515 11.0093 1.37739 11.111C0.151246 11.8125 -0.268414 13.3788 0.442696 14.5994L1.14714 15.8086C1.85689 17.0269 3.41637 17.4447 4.64017 16.7445C4.82443 16.6391 5.13825 16.6261 5.47256 16.8277C5.5728 16.8881 5.67453 16.9464 5.77768 17.0024C6.11289 17.1844 6.25314 17.4558 6.25314 17.6592C6.25314 19.0625 7.3908 20.2002 8.79414 20.2002H10.2528C11.6562 20.2002 12.7938 19.0625 12.7938 17.6592C12.7938 17.4558 12.9341 17.1844 13.2693 17.0024C13.3724 16.9464 13.4742 16.8881 13.5744 16.8277C13.9087 16.6261 14.2225 16.6391 14.4068 16.7445C15.6306 17.4447 17.1901 17.0269 17.8998 15.8086L18.6043 14.5994C19.3154 13.3788 18.8957 11.8125 17.6696 11.111C17.4918 11.0093 17.3247 10.7506 17.3328 10.3656C17.334 10.3106 17.3346 10.2554 17.3346 10.2002C17.3346 10.145 17.334 10.0898 17.3328 10.0348C17.3247 9.6498 17.4918 9.3911 17.6696 9.2894C18.8958 8.5879 19.3154 7.0216 18.6043 5.80096L17.8999 4.59182C17.1901 3.37352 15.6306 2.95567 14.4068 3.65589C14.2226 3.76133 13.9087 3.77426 13.5744 3.57272C13.4742 3.51229 13.3725 3.45404 13.2693 3.39802C12.9341 3.21597 12.7938 2.94462 12.7938 2.74124C12.7938 1.33786 11.6562 0.200195 10.2528 0.200195L8.79414 0.200195ZM9.52344 7.2002C7.86654 7.2002 6.52344 8.5433 6.52344 10.2002C6.52344 11.8571 7.86654 13.2002 9.52344 13.2002C11.1803 13.2002 12.5234 11.8571 12.5234 10.2002C12.5234 8.5433 11.1803 7.2002 9.52344 7.2002Z"/>
        </svg>  
      </div>
    </div>
    <div class="settings" v-if="showSettings">
      <hr>
      <div class="setting-row">
        <label class="poppins-semibold">Pomodoro:</label>
        <input v-model.number="workDuration" @blur="validateDuration('work')" type="number" min="1" />
      </div>
      <div class="setting-row">
        <label class="poppins-semibold">Break:</label>
        <input v-model.number="breakDuration" @blur="validateDuration('break')" type="number" min="1" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  setup() {
    const workDuration = ref(25);
    const breakDuration = ref(5);
    const isWorking = ref(true);
    const timeLeft = ref(workDuration.value * 60);
    const timer = ref(null);
    const isTimerRunning = ref(false);

    // const hours = computed(() => Math.floor(timeLeft.value / 3600).toString().padStart(2, '0'));
    // const minutes = computed(() => Math.floor((timeLeft.value % 3600) / 60).toString().padStart(2, '0'));
    // const seconds = computed(() => (timeLeft.value % 60).toString().padStart(2, '0'));

    const minutes = computed(() => Math.floor(timeLeft.value / 60).toString().padStart(2, '0'));
    const seconds = computed(() => (timeLeft.value % 60).toString().padStart(2, '0'));

    const startTimer = () => {
      if (!timer.value) {
        isTimerRunning.value = true;
        timer.value = setInterval(() => {
          if (timeLeft.value > 0) {
            timeLeft.value--;
          } else {
            if (isWorking.value) {
              $fetch(`/api/random-write`, {
                query: {
                  totalTime: workDuration.value
                }

              })
              console.log('workDuration', workDuration.value)
            }
            switchMode();
          }
        }, 1000);
      }
    };

    const pauseTimer = () => {
      if (timer.value) {
        isTimerRunning.value = false;
        clearInterval(timer.value);
        timer.value = null;
      }
    };

    const resetTimer = () => {
      isTimerRunning.value = false;
      pauseTimer();
      timeLeft.value = isWorking.value ? workDuration.value * 60 : breakDuration.value * 60;
    };

    const switchToPomodoro = () => {
      if (!isWorking.value) {
        isWorking.value = true;
        resetTimer();
      }
    };

    const switchToBreak = () => {
      if (isWorking.value) {
        isWorking.value = false;
        resetTimer();
      }
    };

    const switchMode = () => {
      isWorking.value = !isWorking.value;
      resetTimer();
    };

    watch(workDuration, (newValue) => {
      if (isWorking.value) {
        timeLeft.value = newValue * 60;
      }
    });

    watch(breakDuration, (newValue) => {
      if (!isWorking.value) {
        timeLeft.value = newValue * 60;
      }
    });

    watch([workDuration, breakDuration], () => {
      pauseTimer(); // Tạm dừng bộ đếm thời gian khi giá trị thay đổi
    });

    const validateDuration = (type) => {
      if (type === 'work' && workDuration.value < 1) {
        workDuration.value = 1;
      } else if (type === 'break' && breakDuration.value < 1) {
        breakDuration.value = 1;
      }
    };
    
    const hideElement = () => {
      emit('close'); // Emit event to parent
    };

    const showSettings = ref(false); // Biến để theo dõi trạng thái hiển thị cài đặt

    const toggleSettings = () => {
      showSettings.value = !showSettings.value;
    };

    return {
      workDuration,
      breakDuration,
      isWorking,
      // hours,
      minutes,
      seconds,
      startTimer,
      pauseTimer,
      resetTimer,
      switchMode,
      switchToPomodoro,
      switchToBreak,
      isTimerRunning,
      showSettings,
      toggleSettings,
      validateDuration,
    };
  }
};
</script>

<style>
.pomodoro-timer {
  text-align: center;
  margin-top: 10px;
  width: 300px;
  position: relative;
}

.button-wrapper {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 19px;
  height: 19px;
  padding: 1.5px;
  width: auto; 
  height: auto;
}

.button-wrapper button {
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  color: #EDEDED;
  position: relative; /* Ensure button is positioned correctly */
  z-index: 2; /* Higher z-index to place above the overlay */
}

.button-wrapper svg {
  display: relative; 
  z-index: 2;
  cursor: pointer;
}

.button-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(122, 122, 122, 0.4); 
  opacity: 0;
  transition: opacity 0.1s ease;
  border-radius: 5px;
  z-index: 1;
  pointer-events: none; 
}

.button-wrapper:hover::after {
  opacity: 1;
}

.mode-switch {
  display: flex; 
  margin-left: 15px; 
  width: 200px;
  gap: 10px;
  margin-bottom: 5px;
}

.mode-switch button {
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  color: #EDEDED;
}

.mode-switch .active {
  border-bottom: 3px solid #ededed; 
}

.time-display {
  text-align: center;
  font-size: 48px;
}

.controls{
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.settings {
  display: flex;
  flex-direction: column; /* Đặt các phần tử thành cột dọc */
  align-items: flex-end; 
  gap: 8px; /* Khoảng cách giữa Pomo Break */
  padding-right: 13px;
  margin-bottom: 10px;
  overflow: hidden;
}

.setting-row {
  display: flex; 
  align-items: center; 
}

.settings hr {
  width: 330px;
  border: 0.8px solid #7a7a7a; 
  margin-left: 0px;
  margin-top: 0px;
  margin-bottom: 2px;
}

.setting-row label {
  font-size: 16px;
  margin-right: 8px;
  padding-left: 18px;
  padding-bottom: 10px;
}

.setting-row input {
  width: 155px !important; 
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
