<template>
  <div>
    <form action="">
      <input type="text" placeholder="Email"> <br>

      <input type="text" placeholder="Password">
    </form>
  </div>
</template>

<script lang="ts" setup>
let emoji = "🔒"
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
  max-width: 600px;
  margin: auto;
}
</style>