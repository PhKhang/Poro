<script setup lang="ts">
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0",
    },
  ],
});
// const { signIn, signOut, session, status, cookies, getProviders } = useAuth()
const form = ref({ email: "", password: "" });

const { signIn } = useAuth();

// definePageMeta({
//     auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
// })
async function submitLogin() {
  console.log("Submitted");
  try {
    const result = await signIn("credentials", {
      ...form.value,
      callbackUrl: "/testing",
    });
    useRouter().push({ name: "index" });

    console.log("Signed in", { result });
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <div class="container">
    <div class="left">
      <a href="./index.vue" class="back_button">
        <span class="material-symbols-outlined">arrow_back_ios_new</span>
        Back
      </a>
      <img src="./../assets/img/mainLogo 1.png" alt="Poro" class="logo" />
    </div>
    <div class="right">
      <div class="login">
        <h1>LOGIN</h1>
        <form @submit.prevent="submitLogin" class="login_form">
          <!-- box input the email -->
          <div class="email_form">
            <input type="email" v-model="form.email" placeholder="Email" />
            <span class="material-symbols-outlined">mail</span>
          </div>
          <!-- box input the password -->
          <div class="password_form">
            <input
              type="password"
              v-model="form.password"
              placeholder="Password"
            />
            <span class="material-symbols-outlined">lock</span>
          </div>
          <button class="login_button">Login</button>
        </form>
        <div class="signup">
          <p>Don't have an account?</p>
          <a href="./register.vue" class="signup_button">Sign Up</a>
        </div>
        <h3>- Or Login With -</h3>
        <button @click="signIn('google')" class="sign_up_button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 48 48"
            class="google_logo"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
*,
:root {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  --white: #ededed;
  --black: #222222;
  --yelllow: #ffd800;
  color: var(--white);
}

html,
body {
  font:
    600 26px "Poppins",
    sans-serif;
}

.container {
  display: flex;
  height: 100vh;
  background-color: var(--black);
}

.left,
.right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left {
  position: relative;
}

.back_button {
  font-size: 20px;
  position: absolute;
  left: 20px;
  top: 20px;
  text-align: center;
}

.back_button .material-symbols-outlined {
  margin: 0;
  padding: 0;
  font-size: 15px;
}

.back_button:hover {
  text-decoration: underline;
}

.logo {
  width: 451px;
  height: 451px;
  object-fit: cover;
}

.login {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--white);
  border-radius: 20px;
  width: 560px;
  height: 678px;
}

.login_form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
}

h1 {
  color: var(--white);
  margin: 0 auto;
  padding: 80px 50px;
  font-size: 40px;
}

.email_form,
.password_form {
  border: none;
  background-color: var(--black);
  border-bottom: 1px solid var(--white);
}

input {
  font-weight: 600;
  font-size: 20px;
  width: 470px;
  height: 57px;
  background-color: var(--black);
  border: none;
  outline: none;
  padding: 20px;
}

.material-symbols-outlined {
  font-size: 20px;
  padding: 20px;
}

::placeholder {
  font-size: 20px;
  font-weight: 600;
}

.login_button {
  margin: 40px 0;
  width: 470px;
  height: 57px;
  background-color: var(--yelllow);
  color: var(--black);
  font-weight: bold;
  font-size: 24px;
  border-radius: 15px;
}

.login_button:hover,
.sign_up_button:hover {
  cursor: pointer;
}

.signup {
  display: flex;
  margin: 0 auto;
  justify-items: center;
  align-items: center;
  gap: 10px;
}

.signup_button {
  color: var(--yelllow);
  background-color: var(--black);
  font-weight: 600;
  font-size: 20px;
}

a {
  text-decoration: none;
}

h3 {
  padding: 10px;
  margin: 0 auto;
  font-size: 16px;
}

.sign_up_button {
  background-color: var(--black);
  margin: 0 auto;
  border: none;
  outline: none;
  text-decoration: none;
}

@media (max-width: 1024px) {
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
  }

  .left,
  .right {
    width: 100%;
    padding: 0;
    order: unset;
  }
  .left {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .logo {
    width: 100%;
    height: auto;
  }

  .login {
    width: 100%;
    height: auto;
    padding: 40px;
  }

  h1 {
    padding: 50px 20px;
    font-size: 32px;
  }

  .email_form input,
  .password_form input,
  .login_button {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
    align-items: center;
    justify-content: space-between;
  }

  .left,
  .right {
    width: 100%;
    padding: 0;
    order: unset;
  }

  .left {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .logo {
    width: 50%;
    margin-bottom: 20px;
  }

  .login {
    width: 100%;
    height: auto;
    padding: 10px;
    box-sizing: border-box;
  }

  .login_button {
    margin-bottom: 20px;
  }

  h1 {
    padding-top: 10px;
    font-size: 32px;
  }

  .back_button {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 18px;
  }

  .back_button.material-symbols-outlined {
    font-size: 16px;
  }

  .email_form,
  .password_form {
    display: flex;
    width: 100%;
  }

  h3 {
    font-size: 16px;
  }

  .google_logo {
    height: 40px;
    width: 40px;
  }
}

@media (max-width: 480px) {
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
    justify-content: space-between;
  }

  .left,
  .right {
    width: 100%;
    padding: 0;
    order: unset;
  }

  .left {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 70%;
    height: 70%;
  }

  .login {
    width: 100%;
    height: auto;
    padding: 10px;
    box-sizing: border-box;
  }

  h1 {
    padding-top: 10px;
    font-size: 50px;
  }

  .email_form input,
  .password_form input,
  .login_button {
    width: 90%;
    font-size: 18px;
  }

  .signup {
    flex-direction: column;
    align-items: center;
  }

  .signup_button {
    margin-top: 10px;
  }

  .back_button {
    position: absolute;
    top: 1px;
    left: 1px;
    font-size: 15px;
  }

  .back_button .material-symbols-outlined {
    font-size: 11px;
  }

  .email_form,
  .password_form {
    display: flex;
    justify-content: flex-end;
  }

  h3 {
    font-size: 16px;
  }

  .google_logo {
    height: 30px;
    width: 30px;
  }
}
</style>
