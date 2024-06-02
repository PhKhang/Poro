<template>
    <h1>Thing</h1>
    </template>
    
    <script setup>
    import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
    import { ref } from 'vue'
    
    // same as beforeRouteLeave option but with no access to `this`
    onBeforeRouteUpdate((to, from) => {
        console.log("AAAAAAAAAAAAAAAAAAAAA")
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      )
      // cancel the navigation and stay on the same page
      if (!answer) return false
    })
    
    </script>