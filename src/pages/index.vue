<template>
  <div class="main">
    <div class="head">
      <img src="assets/img/IMG_6015.jpg" alt="" srcset="">
    </div>
    <h1>
      Created with 💖 by group 5
    </h1>
    <h3>
      From knowing nothing to this combination of Vue, Nuxt, MongoDB and other third-party APIs, Poro was born. <br> It was a wild ride.
    </h3>
    Try to look around, it might delight you.
    <NuxtLink to="/testing">Go to the main page</NuxtLink>
    <br />
    <br />
    <!-- <h2>The line bellow is data taken from its server API (Nitro)</h2>
      <p>{{ data }}</p> -->
    <!-- <h1>{{random_shi}}</h1> -->
    <h2>Sign in status:</h2>
    <button v-if="userData" @click="signOut()">Sign out</button>
    <em v-else>Not logged in</em>
    <h2>User data:</h2>
    <pre>{{ userData || 'No user data' }}</pre>
    <h2>Token:</h2>
    <pre>{{ token }}</pre>
    <hr />
    <h2>Other links:</h2>
    <NuxtLink to="https://github.com/PhKhang/Poro/">Source code (GitHub)</NuxtLink> <br/>
    <NuxtLink
      to="https://www.figma.com/design/ffpIyH1akMSujUPIbCvVlj/Poro's-Visualization?node-id=802-950&t=pZqTxtnNXFX4M2hH-1">
      Design file (Figma)</NuxtLink>
    <br>
    <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450"
      src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FffpIyH1akMSujUPIbCvVlj%2FPoro's-Visualization%3Fnode-id%3D0-1%26t%3DpZqTxtnNXFX4M2hH-1"
      allowfullscreen></iframe>
    <br>
    <NuxtLink to="/protected">Go to login testing</NuxtLink> <br />
    <NuxtLink to="/login">LOGIN</NuxtLink> <br />
    <NuxtLink to="/register">REGISTER</NuxtLink> <br />
    <NuxtLink to="/room-test">Go to the room testing</NuxtLink> <br />
    <NuxtLink to="/report">Go to the report</NuxtLink> <br />
    <NuxtLink to="/testing">Go to the background vid</NuxtLink> <br />
    <NuxtLink to="/note">Go to the note taking test</NuxtLink> <br />
  </div>
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

<style scoped>
* {
  color: #828282;
}

.main {
  width: 95%;
  max-width: 1000px;
  background-color: #222;

  padding: 10px;
  margin: auto;
}

.head {
  width: 90%;
  max-width: 680px;

  margin: auto;

  padding: 0;

}

img {
  width: 100%;

  object-fit: contain;
  border-radius: 4px;

  padding: 0;
  margin: 0;
}
</style>
