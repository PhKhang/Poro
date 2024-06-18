<template>
  <div>
    <h1>You can only access this when logged in</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({middleware: 'auth'});

</script>

<style>

</style>