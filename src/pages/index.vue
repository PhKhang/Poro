<template>
  <h1>
    Hello, this is the Home page because its file name is <code>index.*</code>
  </h1>

  <!-- <h2>The line bellow is data taken from its server API (Nitro)</h2>
    <p>{{ data }}</p> -->
    
    <h1>{{random_shi}}</h1>
    
    
    <button v-if="userData" @click="signOut()">Sign out</button>
    <em v-else>Not logged in</em>
    <h1>aẫeệoốuữ</h1>
    <h3>aẫeệoốuữ</h3>
    <h4>aẫeệoốuữ</h4>
    <h5>aẫeệoốuữ</h5>
    <h6>aẫeệoốuữ</h6>

  <h2>Vid info</h2>
  <!-- <pre>{{ vid }}</pre> -->

  <h2>User data:</h2>
  <pre>{{ userData }}</pre>

  <!-- <h2>Protected data:</h2>
    <pre>{{ demo }}</pre>
    <pre>{{ content }}</pre> -->

  <h2>Token:</h2>
  <pre>{{ token }}</pre>

  <!-- <h2>Session:</h2>
    <pre>{{ sess }}</pre> -->

  <p>You can change what it returns in <code>/server/api/[id].ts</code></p>

  <button>Press me</button> <br />

  <NuxtLink to="/firs">Go to the next page, the more preferable way</NuxtLink>
  <br />
  <NuxtLink to="/protected">Go to login testing</NuxtLink> <br />
  <NuxtLink to="/login">LOGIN</NuxtLink> <br />
  <NuxtLink to="/register">REGISTER</NuxtLink> <br />
  <NuxtLink to="/room-test">Go to the room testing</NuxtLink> <br />
  <NuxtLink to="/report">Go to the report</NuxtLink> <br />
  <NuxtLink to="/testing">Go to the background vid</NuxtLink> <br />
  <NuxtLink to="/note">Go to the note taking test</NuxtLink> <br />
  <hr />
  <a href="firs">Go to the next page, the old way</a>
  <!-- <NuxtWelcome /> -->
</template>

<script setup>
// definePageMeta({middleware: 'auth'})

// const { data, pending, error, refresh } = await useFetch('/api/45')

// const { data: vid } = await useFetch('https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=4Y4YSpF6d6w&key=AIzaSyAq98m57L7e7jFwHpFP1dlgzC_L6TgT9vs')

const { data: userData, signOut, status } = useAuth();
// const { data: demo, content } = useFetch('/api/protected')
const { data: token } = await useFetch('/api/token')
const payload = ref('nothing')
// const { data: random_shi } = await useFetch(`/api/random-write?foo=${payload}`, { pick: 'title'})
// const { data: sess } = await useFetch('/api/session')
</script>

<style></style>

