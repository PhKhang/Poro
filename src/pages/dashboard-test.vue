<template>
  <div>
    <h1 v-if="userData">Logged in</h1>
    <!-- <pre v-if="userData">{{ info }}</pre> -->
    <h1 v-else>Guest</h1>

    <pre>{{ dta }}</pre>

    <button @click="fetchData">Fetch ranks</button>
    <button @click="fetchCurrentStandingData">Fetch current standing data</button>
    
  </div>
</template>

<script lang="ts" setup>
const { data: userData, signOut, status } = useAuth()

const { data: info } = await useFetch('/api/db')

const dta = ref('')
async function fetchData() {
  console.log('loading')
  const value = await $fetch('/api/dashboard', {
      method: 'POST',
      body: {
        action: 'getRanks',
      }
    })
  console.log('Received data:', value)
}

async function fetchCurrentStandingData() {
  console.log('loading')
  const value = await $fetch('/api/dashboard', {
      method: 'POST',
      body: {
        action: 'getCurrentStanding',
      }
    })
  console.log('Received data:', value)
}

</script>

<style></style>