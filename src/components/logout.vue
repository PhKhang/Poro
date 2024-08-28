<template>
    <div class="logout-wrapper" @click="closeIfOutside">
        <div id="logout-board" class="logout" @click.stop>
            <div class="logout-content">
                <div class="logout-header poppins-semibold">Do you really want to log out?</div>
                <div class="choice">
                    <div class="logout-header32 poppins-semibold" @click="signOut()">YES</div>
                    <div class="logout-header3 poppins-semibold" @click="hideElement">NO</div>
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

.logout-wrapper {
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
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px);
    z-index: 9998; 
}

#logout-board {
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 100px;
    background: #2a2a2a;
    border-radius: 13.6px;
    padding-top: 19px;
    padding-bottom: 23.85px;
    z-index: 2;
    overflow: hidden;
    z-index: 9999;
}

.logout-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}  

.logout-header {
    color: #ededed;
    font-size: 18.4px;
    margin-bottom: 18px;
}

.logout-header2 {
    color: #ededed;
    font-size: 20px;
    margin-bottom: 10px;
}

.choice {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logout-header3 {
    color: #ededed;
    font-size: 17px;
    border-radius: 8.662px;
    border: 0.866px solid #7A7A7A;
    background: #222;
    display: flex;
    width: 82px;
    height: 34px;
    padding: 0;
    justify-content: center;
    align-items: center;
    margin-left: 18px;
    cursor: pointer;
    text-decoration: none;
}

.logout-header32 {
    color: rgba(255, 107, 107, 0.60);
    font-size: 17px;
    border-radius: 8.662px;
    border: 0.866px solid #7A7A7A;
    background: #222;
    display: flex;
    width: 82px;
    height: 34px;
    padding: 0px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 18px;
    text-decoration: none;
}

.logout-header4 {
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
