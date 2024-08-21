<template>
  <div class="pomodoro-timer">
    <h1>{{ isWorking ? 'Work Time' : 'Break Time' }}</h1>
    <div class="time-display">
      {{ minutes }}:{{ seconds }}
    </div>
    <div class="controls">
      <button @click="startTimer">Start</button>
      <button @click="pauseTimer">Pause</button>
      <button @click="resetTimer">Reset</button>
      <button @click="switchMode">{{ isWorking ? 'Switch to Break' : 'Switch to Work' }}</button>
    </div>
    <div class="settings">
      <label>
        Work Time (minutes):
        <input v-model.number="workDuration" type="number" min="1" />
      </label>
      <label>
        Break Time (minutes):
        <input v-model.number="breakDuration" type="number" min="1" />
      </label>
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

    const minutes = computed(() => Math.floor(timeLeft.value / 60).toString().padStart(2, '0'));
    const seconds = computed(() => (timeLeft.value % 60).toString().padStart(2, '0'));

    const startTimer = () => {
      if (!timer.value) {
        timer.value = setInterval(() => {
          if (timeLeft.value > 0) {
            timeLeft.value--;
          } else {
            if (isWorking.value) {
              $fetch(`/api/random-write?totalTime=${timer.value}`)
              // console.log('workDuration', workDuration.value)
            }
            switchMode();
          }
        }, 1000);
      }
    };

    const pauseTimer = () => {
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
      }
    };

    const resetTimer = () => {
      pauseTimer();
      timeLeft.value = isWorking.value ? workDuration.value * 60 : breakDuration.value * 60;
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

    return {
      workDuration,
      breakDuration,
      isWorking,
      minutes,
      seconds,
      startTimer,
      pauseTimer,
      resetTimer,
      switchMode
    };
  }
};
</script>

<style>
.pomodoro-timer {
  text-align: center;
  margin-top: 50px;
}

.time-display {
  font-size: 48px;
  margin: 20px 0;
}

.controls button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}

.settings label {
  display: block;
  margin-top: 10px;
}

.settings input {
  margin-left: 10px;
  width: 50px;
}
</style>
