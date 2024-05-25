<script setup lang="ts" >
function myFunction() {
  alert("Hello! I am an alert box!");
  console.log("thing")
}
</script>

<template>
    <div class="back">
        <img src="https://i.kym-cdn.com/entries/icons/original/000/026/738/future.jpg" alt="">
        <p class="top">Society if</p>
        <p class="bottom">HTML could be seamlessly used with any language</p>
        <button @click="myFunction">Try it</button>
    </div>
</template>

<style scoped>
* {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
}

.back {
    width: 100%;
    height: 100vh;
    
    position: absolute;
    
    img {
        position: absolute;
        height: 100%;
        object-fit: cover;
    }
}
</style>