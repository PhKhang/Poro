<template>
    <DraggableComponent>
        <Task />
    </DraggableComponent>
</template>

<script>
import DraggableComponent from './hoverMove.vue';
import Task from './Task.vue';

export default {
    name: 'DraggableSound',
    components: {
        DraggableComponent,
        Task,
    }
};
</script>

<style>
/* Thêm style nếu cần */
</style>