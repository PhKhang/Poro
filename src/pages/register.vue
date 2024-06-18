<template>
  <div>
    <form @submit.prevent="submitForm" >
      <input type="email" v-model="form.email" placeholder="Email"> <br>

      <input type="password" v-model="form.password" placeholder="Password">
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
let emoji = "🔒"
let svgSource = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`

const form = ref({
  email: "",
  password: "",
})

async function submitForm() {
  console.log("Submitted")
  try {
    await $fetch('/api/auth/register', {
      method: "POST",
      body: form.value,
    });
  }
  catch (e) {
    console.log(e)
  }
}

useHead(
  {
    script: [{ src: "https://apis.google.com/js/api.js" }], 
    link: [{ rel: "icon", href: svgSource }]
  }
);
</script>

<style scoped>
div {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
</style>