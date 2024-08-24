<template>
  <div>
    oghoighio
    {{ data }}

    <button @click="getTotalUser">Clilck</button>
  </div>
</template>

<script lang="ts" setup>
const data = ref('Nothing')
async function getTotalUser() {
  console.log('loading')
  const vl = await $fetch('/api/admin', {
    method: 'POST',
    body: {
      action: 'getTotalTime',
    }
  })
  data.value = vl
  console.log('Received data:', vl)
}
</script>

<style></style>