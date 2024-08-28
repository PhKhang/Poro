<template>
    <div class="noti-wrapper" @click="closeIfOutside">
        <div id="noti-board" class="noti" @click.stop>
            <div class="close-btn" @click="hideElement">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1_1163)">
                    <path d="M13.7328 5.7334H3.06607C1.59541 5.7334 0.399414 6.9294 0.399414 8.40005C0.399414 9.87071 1.59541 11.0667 3.06607 11.0667H13.7327C15.2034 11.0667 16.3994 9.87071 16.3994 8.40005C16.3994 6.9294 15.2034 5.7334 13.7328 5.7334Z" fill="#EDEDED" stroke="#EDEDED" stroke-width="0.03125"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1_1163">
                      <rect width="16" height="16" fill="white" transform="translate(0.399414 0.399902)"/>
                    </clipPath>
                  </defs>
                </svg>
            </div>
            <div class="noti-content">
                <div class="noti-header poppins-bold">Join for free!</div>
                <div class="noti-header2 poppins-medium">Log in or Sign up to unlock this restricted feature!</div>
                <div class="choice">
                    <a href="login" class="noti-header3 poppins-semibold">Log In or Sign up</a>
                </div>
            </div>
        </div>
        <div class="overlay"></div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const emit = defineEmits(['close']); // Define emits
const hideElement = () => {
    emit('close'); // Emit event to parent
};

const { data: userData, signOut, status } = useAuth();

</script>

<style scoped>

.noti-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    z-index: 9999;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    z-index: 9998; 
}

#noti-board {
    display: flex;
    flex-direction: column;
    width: 730px;
    height: 250px;
    background: #2a2a2a;
    border-radius: 10px;
    padding: 10px 20px 25px 20px;
    z-index: 2;
    overflow: hidden;
    z-index: 9999;
}

.noti-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}  

.noti-header {
    color: #ededed;
    font-size: 32px;
}

.noti-header2 {
    color: #ededed;
    font-size: 20px;
    margin-bottom: 10px;
}

.choice {
    display: flex;
    justify-content: center;
    align-items: center;
}

.noti-header3 {
    color: #2a2a2a;
    font-size: 16px;
    border-radius: 8px;
    background: #FFD800;
    display: flex;
    width: 150px;
    height: 30px;
    padding: 0px 15px 0px 15px;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    text-decoration: none;
}

.noti-header32 {
    color: rgb(202, 202, 202); 
    font-size: 16px;
    border-radius: 8px;
    background: #3e3e3e;
    display: flex;
    width: 150px;
    height: 30px;
    padding: 0px 15px 0px 15px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
    text-decoration: none;
}

.noti-header4 {
    color: #ededed;
    font-size: 16px;
    margin-left: 10px;
    margin-right: 10px;

}

.close-btn {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
}

</style>
