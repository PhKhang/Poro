<template>
  <DraggableComponent>
    <Task :task="selectedTask" @click="handleTaskSelected" />
  </DraggableComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DraggableComponent from './hoverMove.vue';
import Task from './Task.vue';

interface Task {
  id: number;
  name: string;
  date: string;
  isOverdue: boolean;
  priorityClass: string;
  priorityText: string;
  isDone: boolean;
  isSetting: boolean;
}

export default defineComponent({
  name: 'DraggableTask',
  components: {
    DraggableComponent,
    Task,
  },
  props: {
    selectedTask: {
      type: Object as PropType<Task | null>,
      default: () => null,
    },
  },
  methods: {
    handleTaskSelected(task: Task) {
      this.$emit('task-selected', task);
      console.log('DraggableTask: ', task);
    }
  }
});
</script>