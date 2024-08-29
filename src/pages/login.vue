<script setup lang="ts">
import { RouterLink } from 'vue-router';

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
      <div class="back_button">    
        <NuxtLink to="/testing">
          <svg class="right-arrow-next" alt="Right arrow next" width="61" height="17" viewBox="0 0 61 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.188 15V1.8959H25.0832C25.9755 1.8959 26.7545 2.00244 27.4204 2.21551C28.0996 2.42859 28.6256 2.76818 28.9985 3.23428C29.3847 3.70038 29.5778 4.31963 29.5778 5.09202C29.5778 5.74456 29.4113 6.33718 29.0784 6.86987C28.7588 7.38924 28.286 7.7488 27.6601 7.94856V8.02846C28.4458 8.17495 29.085 8.50788 29.5778 9.02725C30.0838 9.54662 30.3369 10.2591 30.3369 11.1647C30.3369 12.017 30.1238 12.7294 29.6976 13.3021C29.2848 13.8747 28.7055 14.3008 27.9597 14.5805C27.214 14.8602 26.3484 15 25.3629 15H21.188ZM22.846 7.46914H24.7836C25.9022 7.46914 26.7079 7.27604 27.2007 6.88984C27.6934 6.50364 27.9398 5.97761 27.9398 5.31176C27.9398 4.55268 27.6801 4.01333 27.1607 3.69372C26.6547 3.37411 25.8889 3.2143 24.8635 3.2143H22.846V7.46914ZM22.846 13.6816H25.1232C26.2551 13.6816 27.1341 13.4752 27.76 13.0624C28.3859 12.6362 28.6988 11.9837 28.6988 11.1047C28.6988 10.2924 28.3859 9.69976 27.76 9.32688C27.1474 8.94069 26.2685 8.74759 25.1232 8.74759H22.846V13.6816ZM35.009 15.2397C34.1967 15.2397 33.5175 15 32.9715 14.5206C32.4388 14.0278 32.1724 13.3487 32.1724 12.4831C32.1724 11.4177 32.6452 10.6053 33.5907 10.046C34.5496 9.47337 36.0611 9.07386 38.1252 8.84747C38.1252 8.43463 38.0653 8.04178 37.9454 7.6689C37.8389 7.29602 37.6391 6.99638 37.3462 6.76999C37.0665 6.53028 36.6603 6.41042 36.1276 6.41042C35.5683 6.41042 35.0423 6.51696 34.5496 6.73003C34.0568 6.94311 33.6174 7.18282 33.2312 7.44916L32.5919 6.31054C33.0447 6.01757 33.5974 5.73791 34.2499 5.47156C34.9158 5.1919 35.6349 5.05207 36.4073 5.05207C37.5925 5.05207 38.4515 5.41829 38.9842 6.15074C39.5169 6.86987 39.7832 7.83536 39.7832 9.04722V15H38.4249L38.285 13.8414H38.2251C37.7723 14.2143 37.2729 14.5406 36.7269 14.8202C36.1942 15.0999 35.6216 15.2397 35.009 15.2397ZM35.4884 13.9213C35.9545 13.9213 36.394 13.8081 36.8068 13.5817C37.2197 13.3553 37.6591 13.0357 38.1252 12.6229V9.92616C36.5138 10.1259 35.3819 10.4256 34.7293 10.8251C34.0901 11.2246 33.7705 11.7373 33.7705 12.3632C33.7705 12.9092 33.937 13.3087 34.2699 13.5617C34.6028 13.8015 35.009 13.9213 35.4884 13.9213ZM46.673 15.2397C45.8207 15.2397 45.0483 15.04 44.3558 14.6404C43.6633 14.2409 43.1173 13.6616 42.7178 12.9025C42.3183 12.1435 42.1185 11.2312 42.1185 10.1659C42.1185 9.07386 42.3316 8.14831 42.7577 7.38924C43.1972 6.63016 43.7698 6.05086 44.4756 5.65134C45.1948 5.25183 45.9672 5.05207 46.7928 5.05207C47.4321 5.05207 47.9781 5.16527 48.4308 5.39166C48.8969 5.61805 49.2965 5.88439 49.6294 6.19069L48.7904 7.26938C48.5107 7.01635 48.2111 6.80994 47.8915 6.65013C47.5852 6.49033 47.239 6.41042 46.8528 6.41042C46.2668 6.41042 45.7408 6.57023 45.2747 6.88984C44.8219 7.19614 44.4623 7.6356 44.196 8.20824C43.943 8.76756 43.8164 9.4201 43.8164 10.1659C43.8164 11.2712 44.0894 12.1701 44.6354 12.8626C45.1948 13.5418 45.9206 13.8814 46.8128 13.8814C47.2656 13.8814 47.6851 13.7881 48.0713 13.6017C48.4575 13.4019 48.7971 13.1689 49.09 12.9025L49.8092 14.0012C49.3697 14.3874 48.8836 14.6937 48.3509 14.9201C47.8183 15.1332 47.2589 15.2397 46.673 15.2397ZM51.9477 15V0.777259H53.5657V10.4056H53.6256L57.7606 5.29178H59.5784L56.3224 9.18705L60.0179 15H58.2201L55.3835 10.3257L53.5657 12.4431V15H51.9477Z" fill="#EDEDED"/>
              <path d="M5.44684 8.84758L10.8577 14.2585C11.0501 14.4508 11.3609 14.4508 11.5533 14.2585C11.7456 14.0661 11.7456 13.7553 11.5533 13.5629L6.49016 8.49982L11.5533 3.43672C11.7456 3.24439 11.7456 2.93351 11.5533 2.74118C11.4573 2.64526 11.3314 2.59705 11.2055 2.59705C11.0796 2.59705 10.9536 2.64526 10.8577 2.74118L5.44682 8.15207C5.25452 8.34437 5.25452 8.65526 5.44684 8.84758Z" stroke="#EDEDED" stroke-width="1.41873"/>
          </svg>
        </NuxtLink>
      </div>
      <img src="./../assets/img/mainLogo 1.png" alt="Poro" class="logo" />
    </div>
    <div class="right">
      <div class="login">
        <h1>LOGIN</h1>
        <form @submit.prevent="submitLogin" class="login_form">
          <!-- box input the email -->
          <div class="email">
            <input 
              type="email" 
              v-model="form.email" 
              placeholder="Email" 
              class="email_form"
            />
            <span class="material-symbols-outlined">mail</span>
          </div>
          <!-- box input the password -->
          <div class="password">
            <input
              type="password"
              v-model="form.password"
              placeholder="Password"
              class="password_form"
            />
            <span class="material-symbols-outlined">lock</span>
          </div>
          <button class="login_button">Login</button>
        </form>
        <div class="signup">
          <p>Don't have an account?</p>
          <RouterLink to="./register" class="signup_button">Sign Up</RouterLink>
        </div>
        <div class="sign_in_with_google">        <h3>- Or Login With -</h3>
        <button @click="signIn('google', { callbackUrl: '/testing' })" class="sign_up_button">
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
  background-color: var(--black);
  display: flex;
  background-size: cover;
  min-height: 100vh;
}

.left,
.right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
}

.back_button {
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
  align-self: flex-start;
  display: flex;
  color: #ededed;
  font: 600 20px 'Poppins', sans-serif;
  padding-left: 15px;

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

h1 {
  font-weight: 800;
  margin: 0 auto;
  padding: 100px 50px;
  font-size: 40px;
}

.login_form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center; 
  color: var(--white);
}

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

.email,
.password {
  width: 80%;
  border: none;
}

.password {
  padding-bottom: 50px;
}

.login_button {
  width: 453px;
  height: 50px;
  background-color: var(--yelllow);
  color: #000000;
  font-weight: 700;
  font-size: 24px;
  border-radius: 10px;
  cursor: pointer;
}

.signup {
  padding: 10px 0;
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

.sign_in_with_google {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  cursor: pointer;
}

@media (max-width: 916px) {
  .container {
    background-color: var(--black);
    display: flex;
    flex-direction: column;
    min-height: 200vh;
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

  .login {
    width: 100%;
    height: auto;
    padding: 10px;
    box-sizing: border-box;
  }

  h1 {
    font-size: 20px;
    padding: 50px;
  }

  .login_button {
    width: 90%;
  }

  .password {
    padding-bottom: 20px;
  }

  .signup_button {
    padding: 0;
    margin: 0;

  }

  .sign_up_button {
    padding: 0;
    margin: 0;
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

  input,
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
    justify-content: space-between;
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
