<template>
  <div>

  </div>
</template>
<!-- <script src="https://apis.google.com/js/api.js"></script> -->
<!-- <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"> -->
<script setup lang="ts">
// const id = event.context.params?.id
let emoji = "😼"
let svgSource = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`
useHead(
  {
    script: [{ src: "https://apis.google.com/js/api.js" }], 
    link: [{ rel: "icon", href: svgSource }]
  }
)
</script>

<style scoped>
div {
  width: 100%;
  height: 100vh;
  background-color: cornflowerblue;
}
</style>