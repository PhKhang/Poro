<template>
    <div class="media-embed">
        <div class="iframe-display" v-if="computedIframeSrc">
            <iframe :src="computedIframeSrc" width="300" height="380" frameborder="0" allowtransparency="true"
                allow="encrypted-media"></iframe>
        </div>
        <div class="settings">
            <label>
                URL:
                <input v-model="mediaURL" type="text" placeholder="Enter Spotify/SoundCloud/YouTube Music URL" />
            </label>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    setup() {
        const mediaURL = ref('');

        const computedIframeSrc = computed(() => {
            if (mediaURL.value) {
                const url = new URL(mediaURL.value);
                const hostname = url.hostname;
                let embedURL = '';

                if (hostname.includes('spotify.com')) {
                    const urlParts = url.pathname.split('/');
                    const idPart = urlParts.pop().split('?')[0];
                    const type = urlParts.pop();

                    if (['track', 'playlist', 'album'].includes(type)) {
                        embedURL = `https://open.spotify.com/embed/${type}/${idPart}`;
                    }
                } else if (hostname.includes('soundcloud.com')) {
                    embedURL = `https://w.soundcloud.com/player/?url=${encodeURIComponent(mediaURL.value)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
                } else if (hostname.includes('music.youtube.com') || hostname.includes('youtube.com')) {
                    const videoId = url.searchParams.get('v');
                    const listId = url.searchParams.get('list');
                    if (listId && videoId) {
                        // Nếu có cả list và video ID, nhúng track trong danh sách phát
                        embedURL = `https://www.youtube.com/embed/${videoId}?list=${listId}`;
                    } else if (listId) {
                        // Nếu chỉ có list ID, nhúng cả danh sách phát
                        embedURL = `https://www.youtube.com/embed/playlist?list=${listId}`;
                    } else if (videoId) {
                        // Nếu chỉ có video ID, nhúng video đó
                        embedURL = `https://www.youtube.com/embed/${videoId}`;
                    }
                }

                return embedURL;
            }
            return '';
        });




        return {
            mediaURL,
            computedIframeSrc,
        };
    },
};
</script>

<style>
.media-embed {
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
