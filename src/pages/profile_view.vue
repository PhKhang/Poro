<script lang="ts" setup>
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0",
    },
  ],
});

let emoji = "🔒";
let svgSource = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

useHead({
  script: [{ src: "https://apis.google.com/js/api.js" }],
  link: [{ rel: "icon", href: svgSource }],
});
</script>

<template>
  <div class="container">
    <div class="back_button">
      <a href="./index.vue" class="back_button">
        <span class="material-symbols-outlined">arrow_back_ios_new</span>
        Back
      </a>
    </div>
    <h1>Your profile</h1>
    <p>Let us know more about you!</p>
    <div class="name"></div>
    <div class="email"></div>
  </div>
</template>
