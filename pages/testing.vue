<template>
    <div>
        <h1>Hello, h1 heading</h1>

        <!-- <div data-vbg="https://youtu.be/mfi36koK-xk?si=kLnsjZjfIuybCEhR"></div> -->
        <div id="video-background" :class="{ before: notPlay }" data-vbg-muted="true" data-vbg-play-button="true"
            data-vbg="https://youtu.be/T_lC2O1oIew?si=Sh2nWSAaOr6EgrLI"></div>


        <button @click="playVid" class="play" ref="myCoolDiv" >Play/Pause</button>


        <button @click="toggleBook">Toggle book</button>


        <div v-for="bok in books" v-if="showBook">
            <book :bok="bok" :update-book="updateBook"></book>
        </div>

        <hr>

        {{ books }}

    </div>
</template>

<script setup>
let { name } = defineProps(['name'])

// import VideoBackgrounds from 'youtube-background';
import 'youtube-background';


let firstInstance = 1;
let notPlay = ref(true);


const doWhenMounted = onMounted(() => {

    const videoBackgrounds = new VideoBackgrounds('[data-vbg]', {
        'play-button': true,
        'autoplay': false,
        'mute-button': true
    });

    const firstElement = document.querySelector('[data-vbg]');

    firstInstance = videoBackgrounds.get(firstElement);

    // const myCoolDiv = ref(null)
    // console.log(myCoolDiv)
    // myCoolDiv.value.clic
    document.querySelectorAll(".play").forEach(el=>el.click())

    firstInstance.setVolume(1);

    document.querySelector('#video-background').addEventListener('video-background-play', function (event) {
        console.log('video-background-play'); // the video instance object
        console.log(event.detail); // the video instance object

        notPlay.value = false;

        const myTimeout = setTimeout(() => {
            console.log("After 1s")
            firstInstance.unmute();

        }, 4000);
    });

    document.querySelector('#video-background').addEventListener('video-background-pause', function (event) {
        console.log('video-background-play'); // the video instance object
        console.log(event.detail); // the video instance object

        notPlay.value = true;

    });

})

function playVid() {
    console.log("Play the vid")
    firstInstance.play()
}

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
.before,
.before>* {
    background-color: red;
    width: 100px !important;
    height: 100px !important;

    position: unset !important;

    border-radius: 8px;
}
</style>