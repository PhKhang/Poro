<template>
    <DraggableComponent>
        <Sound />
    </DraggableComponent>
</template>

<script>
import DraggableComponent from './hoverMove.vue';
import Sound from './Sound.vue';

export default {
    name: 'DraggableSound',
    components: {
        DraggableComponent,
        Sound
    }
};
</script>

<style>
/* Thêm style nếu cần */
</style>