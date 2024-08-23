<template>
  <DraggableComponent v-show="isVisible">
    <TaskComponent :task="task" />
  </DraggableComponent>
</template>

<script>
import DraggableComponent from './hoverMove.vue';
import TaskComponent from './TaskComponent.vue';

export default {
  name: 'DraggableSettingTask',
  components: {
    DraggableComponent,
    TaskComponent,
  },
  props: {
    task: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
/* Thêm style nếu cần */
</style>