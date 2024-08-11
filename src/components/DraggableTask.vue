<template>
    <DraggableComponent>
      <Task :task="selectedTask" @click="handleTaskClick" />
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
        type: Object as () => Task | null,
        default: null,
      },
    },
    methods: {
      handleTaskClick() {
        this.$emit('task-selected', this.selectedTask);
      }
    }
  });
  </script>
  
  <style>
  /* Thêm style nếu cần */
  </style>