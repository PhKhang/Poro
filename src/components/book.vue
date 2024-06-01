<template>
    <div class="book" :class="{liked: bok.isLiked}">
        <h1>{{ bok.title }}</h1>
        <h2>{{ bok.author }}</h2>
        <button @click="updateBook(bok)">Like</button>
    </div>
</template>

<script setup>
let {bok, updateBook} = defineProps(['bok', 'updateBook'])
</script>

<style scoped>
.book {
    border: 1px solid black;
    border-radius: 4px;
    margin: 10px;
}

.liked {
    background-color: pink;
}
</style>