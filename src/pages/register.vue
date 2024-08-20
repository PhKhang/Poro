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
      <div class="signup">
        <h1>SIGN UP</h1>
        <form @submit.prevent="submitForm" class="signup_form">
          <div class="user">
            <input type="text" placeholder="Username" class="user_form" />
            <span class="material-symbols-outlined"> person </span>
          </div>
          <div class="email">
            <input
              type="email"
              v-model="form.email"
              placeholder="Email"
              class="email_form"
            />
            <span class="material-symbols-outlined">mail</span>
          </div>
          <div class="password">
            <input
              type="password"
              v-model="form.password"
              placeholder="Password"
              class="password_form"
            />
            <span class="material-symbols-outlined">lock</span>
          </div>
          <button type="submit" class="signup_button">Sign Up</button>
        </form>
        <div class="login">
          <p>Already have an account?</p>
          <button @click="Login" class="login_button">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0",
    },
  ],
});

let emoji = "🔒";
let svgSource = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

const form = ref({
  email: "",
  password: "",
});

async function submitForm() {
  console.log("Submitted");
  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: form.value,
    });
  } catch (e) {
    console.log(e);
  }
}

useHead({
  script: [{ src: "https://apis.google.com/js/api.js" }],
  link: [{ rel: "icon", href: svgSource }],
});
</script>

<style scoped>
*,
:root {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  --white: #ededed;
  --black: #222222;
  --yellow: #ffd800;
  color: var(--white);
}

html,
body {
  font:
    600 26px "Poppins",
    sans-serif;
}

.container {
  background-color: var(--black);
  display: flex;
  height: 100vh;
}

.left,
.right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.back_button {
  font-size: 20px;
  position: absolute;
  top: 20px;
  left: 20px;
  text-align: center;
  text-decoration: none;
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

.signup {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--white);
  border-radius: 20px;
  width: 560px;
  height: 678px;
}

h1 {
  font-weight: 800;
  font-size: 40;
  margin: 0 auto;
  padding: 100px 50px;
}

.signup_form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
}

.user_form,
.email_form,
.password_form {
  border: none;
  background-color: var(--black);
  border-bottom: 2px solid var(--white);
  width: 100%;
  height: 60px;
  padding: 5px;
}

::placeholder,
.material-symbols-outlined {
  font-size: 20px;
  padding-bottom: 50px;
  font-weight: 600;
  margin: -40px;
}

.user,
.email,
.password {
  width: 80%;
}

.password {
  padding-bottom: 50px;
}

.signup_button {
  background-color: var(--yellow);
  color: #000000;
  font-weight: 700;
  font-size: 24px;
  width: 453px;
  height: 50px;
  border-radius: 10px;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  font-size: 20px;
  font-weight: 500;
}

.login_button {
  background-color: var(--black);
  color: var(--yellow);
  border: none;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
}

@media (max-width: 916px) {
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
  }

  .left {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 50%;
    height: 50%;
  }

  .signup {
    width: 100%;
    height: auto;
    padding: 10px;
    box-sizing: border-box;
  }

  h1 {
    font-size: 20px;
    padding: 50px;
  }

  .signup_button {
    width: 90%;
  }

  .password {
    padding-bottom: 20px;
  }

  .login {
    padding-bottom: 20px;
    width: 100%;
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
  }

  .left {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 50%;
    height: 50%;
  }

  .signup {
    width: 100%;
    height: auto;
    padding: 10px;
    box-sizing: border-box;
  }

  h1 {
    font-size: 20px;
    padding: 50px;
  }

  .signup_button {
    width: 90%;
  }

  .password {
    padding-bottom: 20px;
  }

  .login {
    padding-bottom: 20px;
    width: 100%;
  }
}
</style>
