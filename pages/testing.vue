<template>
    <div>
        <h1>Hello, h1 heading</h1>

        <button @click="toggleBook">Toggle book</button>

        
        <div v-for="bok in books" v-if="showBook">
            <book :bok="bok" :update-book="updateBook"></book>
        </div>

        <hr>

        {{ books }}

    </div>
</template>

<!-- <script>
export default {
    setup() {
        function updateBook(book) {
            book.isLiked = !book.isLiked
            console.log("Update book")
        }

        function toggleBook() {
            showBook.value = !showBook.value
            console.log(showBook)
        }


        let books = reactive([
            {
                title: "The lord of the rings",
                author: "Me",
                isLiked: true
            },
            {
                title: "Book 2",
                author: "Me",
                isLiked: false
            },
            {
                title: "1984",
                author: "Me",
                isLiked: false
            }
        ])

        let showBook = ref(true)

        return { books, showBook, toggleBook, updateBook }
    }
}
</script> -->

<script setup>
let {name} = defineProps(['name'])

function updateBook(book) {
    book.isLiked = !book.isLiked
    console.log("Update book")
}

function toggleBook() {
    showBook.value = !showBook.value
    console.log(showBook)
}

let books = reactive([
    {
        title: "The lord of the rings",
        author: "Me",
        isLiked: true
    },
    {
        title: "Book 2",
        author: "Me",
        isLiked: false
    },
    {
        title: "1984",
        author: "Me",
        isLiked: false
    }
])

// const state = reactive({
//   showBook: true
// })


let showBook = ref(true)

// return { books, showBook , toggleBook, updateBook}
</script>

<style scoped>

</style>