<template>
  <div>
    <h1 v-if="userData">Logged in</h1>
    <pre v-if="userData">{{info}}</pre>
    
    <h1 v-else>Guest</h1>
  </div>
</template>

<script lang="ts" setup>
const { data: userData, signOut, status } = useAuth()

const {data: info} = await useFetch('/api/db')
</script>

<style>

</style>