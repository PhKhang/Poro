<template>
    <div class="spotify-embed">
        <h1>Embed Spotify Track/Playlist</h1>
        <div class="iframe-display" v-if="computedIframeSrc">
            <iframe :src="computedIframeSrc" width="300" height="380" frameborder="0" allowtransparency="true"
                allow="encrypted-media"></iframe>
        </div>
        <div class="settings">
            <label>
                Spotify URL:
                <input v-model="spotifyURL" type="text" placeholder="Enter Spotify Track/Playlist URL" />
            </label>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    setup() {
        const spotifyURL = ref('');

        const computedIframeSrc = computed(() => {
            if (spotifyURL.value) {
                const urlParts = spotifyURL.value.split('/');
                const idPart = urlParts.pop().split('?')[0];
                const type = urlParts.pop(); // Get either 'track' or 'playlist'

                if (type === 'track' || type === 'playlist') {
                    return `https://open.spotify.com/embed/${type}/${idPart}`;
                }
            }
            return '';
        });

        return {
            spotifyURL,
            computedIframeSrc,
        };
    },
};
</script>

<style>
.spotify-embed {
    text-align: center;
    margin-top: 50px;
}

.iframe-display {
    margin: 20px 0;
}

.settings label {
    display: block;
    margin-top: 10px;
}

.settings input {
    margin-left: 10px;
    width: 300px;
}
</style>