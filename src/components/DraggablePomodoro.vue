<template>
  <DraggableComponent class="hover-move">
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
.hover-move {
  margin-left: 430px;
  margin-top: 100px;
}

/* Thêm style nếu cần */
</style>