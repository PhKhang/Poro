<template>
    <h1>Hello, this is the Home page because its file name is <code>index.*</code></h1>
    
    <h2>The line bellow is data taken from its server API (Nitro)</h2>
    <p>{{data}}</p>
    <p>You can change what it returns in <code>/server/api/[id].ts</code></p>
    
    <button>Press me</button> <br>
    
    <NuxtLink to="/firs">Go to the next page, the more preferable way</NuxtLink> <br>
    <a href="firs">Go to the next page, the old way</a>
    <!-- <NuxtWelcome /> -->
</template>

<script setup>
    const { data, pending, error, refresh } = await useFetch('/api/45')
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
    font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
} 
*/
</style>