<script setup>
import { ref, reactive } from 'vue';
import './assets/base.css';

const dropdownVisible = ref(false);

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const elementsVisibility = reactive({
  showNotallowGuest: false,
  logout: false,
});

const toggleVisibility = (element) => {
  if (element === 'note' && !userData.value) {
    elementsVisibility.showNotallowGuest = true;
    return;
  }
  if (element === 'task' && !userData.value) {
    elementsVisibility.showNotallowGuest = true;
    return;
  }
  elementsVisibility[element] = !elementsVisibility[element];
};
</script>

<template>
  <Logout v-if="elementsVisibility.logout" @close="toggleVisibility('logout')"></Logout>
  <div class="app-container">
    <div class="sidebar">
      <h1 class="logo">Poro</h1>
      <nav>
        <ul>
          <li>
            <RouterLink to="/admin-user">User Management</RouterLink>
          </li>
          <li>
            <RouterLink to="/admin-theme">Theme Management</RouterLink>
          </li>
          <li class="active"><a href="#">Report Message</a></li>
        </ul>
      </nav>
    </div>

    <div class="main-content">
      <div class="topbar">
        <h1>Report Message</h1>
        <div class="account-section">
          <button class="account-toggle" @click="toggleDropdown">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15.713L18.01 9.70296L16.597 8.28796L12 12.888L7.40399 8.28796L5.98999 9.70196L12 15.713Z"
                fill="currentColor" />
            </svg>
          </button>
          <div v-if="dropdownVisible" class="dropdown-menu">
            <div class="dropdown-item" @click="toggleVisibility('logout')">
              <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M3.8 0.610596C2.79218 0.610596 1.82563 1.01095 1.11299 1.72359C0.400356 2.43623 0 3.40277 0 4.4106V22.1439C0 23.1518 0.400356 24.1183 1.11299 24.8309C1.82563 25.5436 2.79218 25.9439 3.8 25.9439H11.4C12.4078 25.9439 13.3744 25.5436 14.087 24.8309C14.7996 24.1183 15.2 23.1518 15.2 22.1439V4.4106C15.2 3.40277 14.7996 2.43623 14.087 1.72359C13.3744 1.01095 12.4078 0.610596 11.4 0.610596H3.8ZM16.8378 7.31506C17.0753 7.0776 17.3975 6.9442 17.7333 6.9442C18.0692 6.9442 18.3913 7.0776 18.6289 7.31506L23.6955 12.3817C23.933 12.6193 24.0664 12.9414 24.0664 13.2773C24.0664 13.6131 23.933 13.9353 23.6955 14.1728L18.6289 19.2395C18.39 19.4702 18.07 19.5979 17.7379 19.595C17.4058 19.5921 17.0881 19.4589 16.8532 19.224C16.6184 18.9892 16.4852 18.6715 16.4823 18.3394C16.4794 18.0073 16.6071 17.6873 16.8378 17.4484L19.7423 14.5439H8.86667C8.53073 14.5439 8.20854 14.4105 7.971 14.1729C7.73345 13.9354 7.6 13.6132 7.6 13.2773C7.6 12.9413 7.73345 12.6191 7.971 12.3816C8.20854 12.144 8.53073 12.0106 8.86667 12.0106H19.7423L16.8378 9.10613C16.6003 8.86859 16.4669 8.54647 16.4669 8.2106C16.4669 7.87472 16.6003 7.5526 16.8378 7.31506Z"
                  fill="#EDEDED" />
              </svg>
              <span>Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.app-container {
  display: flex;
  background-color: #1e1e1e;
  color: #ffffff;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #2a2a2a;
  padding: 20px;
}

.logo {
  color: #FFD800;
  font-size: 26px;
  margin-bottom: 30px;
}

.sidebar ul {
  list-style: none;
}

.sidebar ul li {
  margin: 10px 0;
}

.sidebar ul li a {
  color: #ffffff;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-radius: 5px;
}

.sidebar ul li.active a,
.sidebar ul li a:hover {
  background-color: #FFD800;
  color: #2a2a2a;
}

/* Main Content Styles */
.main-content {
  flex-grow: 1;
  padding: 20px;
}

/* Top Bar Styles */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 15px;
}

.topbar h1 {
  font-size: 28px;
  color: #FFD800;
  /* Optional: Makes the title more prominent */
}

.account-section {
  display: flex;
  align-items: center;
  gap: 10px; /* Adds space between account name, type, and the dropdown button */
  position: relative; /* This will help position dropdown elements correctly */
}

.account-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align text to the right for a cleaner layout */
  margin-right: 10px;
}

.account-name {
  font-weight: bold;
  margin-right: 5px;
}

.account-type {
  color: #999;
  font-size: 14px;
}

.account-toggle {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(34, 34, 34, 0.7);
  backdrop-filter: blur(4.8px);
  width: 182px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border-radius: 8.8px;
  border: 1.2px solid #7a7a7a;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 9px 13px;
  cursor: pointer;
  color: #ededed;
  text-decoration: none;
}

.dropdown-item svg {
  width: 25px;
  height: 25px;
}

.dropdown-item span {
  margin-left: 13px;
}

.dropdown-item:hover {
  background-color: rgba(122, 122, 122, 0.4);
}

.button-container,
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(34, 34, 34, 0.7);
  border-radius: 8.8px;
  border: 1.2px solid #7a7a7a;
  margin-left: 5px;
  cursor: pointer;
  position: relative;
  overflow: visible;
}

.button-container::after,
.btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(122, 122, 122, 0.4);
  opacity: 0;
  transition: opacity 0.1s ease;
  border-radius: 8px;
}

.button-container:hover::after,
.btn:hover::after {
  opacity: 1;
}

.tooltip {
  visibility: hidden;
  background-color: rgb(34, 34, 34);
  color: #ededed;
  border-radius: 5px;
  padding: 5px 10px;
  position: absolute;
  z-index: 2;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
  text-align: center;
  font-weight: 700;
}

.button-container:hover .tooltip,
.btn:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.close-button {
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>