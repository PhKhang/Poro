<template>
  <div>
    <h1 v-if="userData">Logged in</h1>
    <!-- <pre v-if="userData">{{ info }}</pre> -->
    <h1 v-else>Guest</h1>

    <pre>{{ dta }}</pre>

    <button @click="fetchData">Fetch ranks</button>
    <button @click="fetchCurrentStandingData">Fetch current standing data</button>
    <button @click="fetchByTime">Fetch data by time marks</button>
    <button @click="fetchDaily">Fetch data of each day</button>
    
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
  value? dta.value = JSON.stringify(value) : null
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
  value? dta.value = JSON.stringify(value) : null
  console.log('Received data:', value)
}

async function fetchByTime() {
  console.log('loading')
  const value = await $fetch('/api/dashboard', {
      method: 'POST',
      body: {
        action: 'getByTime',
      }
    })
  value? dta.value = JSON.stringify(value) : null
  console.log('Received data:', value)
}

async function fetchDaily() {
  console.log('loading')
  const value = await $fetch('/api/dashboard', {
      method: 'POST',
      body: {
        action: 'getDailyActivities',
      }
    })
  value? dta.value = JSON.stringify(value) : null
  console.log('Received data:', value)
}

</script>

<style></style>