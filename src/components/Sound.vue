<template>
    <div class="media-embed">
        <div class="iframe-display" v-if="computedIframeSrc">
            <iframe :src="computedIframeSrc" width="400" height="380" frameborder="0" allowtransparency="true"
                allow="encrypted-media"></iframe>
        </div>
        <div class="youtube-url-container">
            <span class="link-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.19826 4.35002C7.8421 4.70618 7.8421 5.28362 8.19826 5.63978C8.55431 5.99594 9.13178 5.99594 9.48795 5.63978L8.19826 4.35002ZM13.7238 9.87557C13.3676 10.2317 13.3676 10.8091 13.7238 11.1653C14.0798 11.5214 14.6573 11.5214 15.0135 11.1653L13.7238 9.87557ZM11.3301 14.8511C11.6864 14.495 11.6865 13.9176 11.3303 13.5614C10.9743 13.2051 10.3968 13.205 10.0406 13.561L11.3301 14.8511ZM7.9226 16.9676L8.55929 17.6206L8.56732 17.6126L7.9226 16.9676ZM2.39707 11.4434L1.75214 10.7984L1.74397 10.8068L2.39707 11.4434ZM5.8047 9.32545C6.16087 8.96928 6.16087 8.39193 5.8047 8.03576C5.44854 7.67959 4.8711 7.67959 4.51494 8.03576L5.8047 9.32545ZM13.1736 7.48078C13.5298 7.12465 13.5298 6.54721 13.1736 6.19104C12.8175 5.83489 12.24 5.83489 11.884 6.19104L13.1736 7.48078ZM6.35839 11.7166C6.00224 12.0728 6.00224 12.6501 6.35839 13.0063C6.71456 13.3624 7.29198 13.3624 7.64814 13.0063L6.35839 11.7166ZM9.48795 5.63978L12.2507 2.87703L10.961 1.58727L8.19826 4.35002L9.48795 5.63978ZM12.2507 2.87703C13.4204 1.70737 15.3168 1.70737 16.4865 2.87703L17.7762 1.58727C15.8942 -0.294713 12.8429 -0.294713 10.961 1.58727L12.2507 2.87703ZM16.4865 2.87703C17.6562 4.0467 17.6562 5.94311 16.4865 7.11277L17.7762 8.40251C19.6582 6.52055 19.6582 3.46926 17.7762 1.58727L16.4865 2.87703ZM16.4865 7.11277L13.7238 9.87557L15.0135 11.1653L17.7762 8.40251L16.4865 7.11277ZM10.0406 13.561L7.27787 16.3226L8.56732 17.6126L11.3301 14.8511L10.0406 13.561ZM7.2859 16.3147C6.11224 17.459 4.23667 17.4474 3.07743 16.2884L1.7878 17.5782C3.65304 19.4431 6.67086 19.4619 8.55929 17.6206L7.2859 16.3147ZM3.07743 16.2884C1.91819 15.1294 1.90605 13.2537 3.05018 12.0799L1.74397 10.8068C-0.0969608 12.6956 -0.0774199 15.7135 1.7878 17.5782L3.07743 16.2884ZM3.04195 12.0882L5.8047 9.32545L4.51494 8.03576L1.75214 10.7984L3.04195 12.0882ZM11.884 6.19104L6.35839 11.7166L7.64814 13.0063L13.1736 7.48078L11.884 6.19104Z" fill="#EDEDED"/>
                </svg>
            </span>
            <textarea v-model="temporaryURL"  @keydown.enter.prevent="updateTemporaryURL" placeholder="Paste a Music URL here">
            </textarea>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    setup() {
        const mediaURL = ref('');
        const temporaryURL = ref('');

        function updateTemporaryURL() {
            mediaURL.value = temporaryURL.value;
            temporaryURL.value = '';
        }

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
                        embedURL = `https://www.youtube.com/embed/${videoId}?list=${listId}`;
                    } else if (listId) {
                        embedURL = `https://www.youtube.com/embed/playlist?list=${listId}`;
                    } else if (videoId) {
                        embedURL = `https://www.youtube.com/embed/${videoId}`;
                    }
                }

                return embedURL;
            }
            return '';
        });

        return {
            temporaryURL,
            mediaURL,
            computedIframeSrc,
            updateTemporaryURL,
        };
    },
};
</script>


<style scoped>
.media-embed {
    text-align: center;
    margin-top: 40px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.iframe-display {
    margin: 0px;
}

.youtube-url-container {
    display: flex;
    align-items: center;
    margin-top: 6px; 
    margin-bottom: 15px;
    height: 36px;
    width: 93%;
    border-radius: 4px;
    border: 0.8px solid rgba(122, 122, 122, 0.47);
    background-color: rgba(34, 34, 34, 0.70);
  }
  
  .link-icon {
    margin-right: 5px;
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
  
  .youtube-url-container textarea {
    flex: 1;
    border: none;
    background: none;
    outline: none;
    resize: none; 
    overflow: hidden; 
    height: 100%; 
    line-height: 36px; 
    white-space: nowrap;
    color: #ededed;
    font-family: "Source Sans 3";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    }

</style>
