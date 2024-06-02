<template>
    <div class="main">
        
        <div class="note">
            <Editor />
        </div>
        
    </div>
</template>

<script setup>
import { Editor } from "novel-vue";
import "novel-vue/dist/style.css";
</script>

<style scoped>
.main {
    background-color: red;
    height: 100vh;
}

.note {
    max-width: 600px;
}

</style>