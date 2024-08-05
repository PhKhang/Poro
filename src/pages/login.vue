<script setup lang="ts">
// const { signIn, signOut, session, status, cookies, getProviders } = useAuth()
const form = ref({ email: "", password: "" });

const { signIn } = useAuth()

// definePageMeta({
//     auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
// })
async function submitLogin() {
  console.log("Submitted")
  try {
    const result = await signIn("credentials", {...form.value,  callbackUrl: '/testing' });
    useRouter().push({name: 'index'});

    console.log("Signed in", { result });
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <button @click="signIn('google')" >Google Login</button>
  <form @submit.prevent="submitLogin">
    <input type="email" v-model="form.email" placeholder="Email"> <br>
    <input type="password" v-model="form.password" placeholder="Password">
    <button>Login</button>
  </form>
</template>