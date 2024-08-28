<template>
    <div class="noti-wrapper" @click="closeIfOutside">
        <div id="noti-board" class="noti" @click.stop>
            <div class="noti-content">
                <div class="noti-header poppins-bold">Join for free!</div>
                <div class="noti-header2 poppins-medium">Log in or Sign up to unlock this restricted feature!</div>
                <div class="choice">
                    <a href="testing" class="noti-header32 poppins-semibold">Go to Main Page</a>
                    <a href="login" class="noti-header3 poppins-semibold">Sign Up or Log In</a>
                </div>
            </div>
        </div>
        <div class="overlay"></div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const emit = defineEmits(['close']); 

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
}

</style>
