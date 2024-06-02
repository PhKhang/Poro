<template>
    <h1>Thing</h1>
    <NuxtLink to="/">Home</NuxtLink>
</template>

<script>
// import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
// import { ref } from 'vue'

// // same as beforeRouteLeave option but with no access to `this`
// onBeforeRouteLeave((to, from) => {
//     console.log("AAAAAAAAAAAAAAAAAAAAA");
//     const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
//     // cancel the navigation and stay on the same page
//     if (!answer) return false
// })

import { ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

export default {
    setup() {
        const promptExit = ref(true);

        onBeforeRouteLeave((to, from, next) => {
            window.alert("AAAAAAAA")
        })
    }

}
</script>