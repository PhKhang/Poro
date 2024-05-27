<template>
  <div>
    hello from widgetbot

    <widgetbot server="1240294895361458198" channel="1240294895361458203" width="800" height="600"></widgetbot>

  </div>
</template>

<script lang="ts" setup>

console.log("Still runs")

const thoihgo = onMounted(() => {
  console.log("Script first")
  useHead(
    {
      script: [{ src: "https://cdn.jsdelivr.net/npm/@widgetbot/html-embed", async: true, defer: true }],
    }
  )
})

</script>