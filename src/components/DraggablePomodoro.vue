<template>
  <DraggableComponent>
    <PomodoroTimer />
  </DraggableComponent>
</template>

<script>
import DraggableComponent from './hoverMove.vue';
import PomodoroTimer from './PomoTimer.vue';

export default {
  name: 'DraggablePomodoro',
  components: {
    DraggableComponent,
    PomodoroTimer
  }
};
</script>

<style>
/* Thêm style nếu cần */
</style>