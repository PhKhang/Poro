<script setup>
import { ref } from 'vue';

const themes = ref([
  { 
    id: '0001', 
    icon: '🌸', 
    name: 'Spring', 
    backgrounds: [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    ],
    expanded: false
  },
  { 
    id: '0002', 
    icon: '🎄', 
    name: 'Christmas', 
    backgrounds: [
      'https://www.youtube.com/watch?v=HgzGwKwLmgM',
      'https://www.youtube.com/watch?v=HgzGwKwLmgM',
    ],
    expanded: false
  },
]);

const userName = ref('Moni Roy');
const userType = ref('Admin');

const toggleExpand = (theme) => {
  theme.expanded = !theme.expanded;
};
</script>

<template>
  <div class="app-container">
    <div class="sidebar">
      <h1 class="logo">Poro</h1>
      <nav>
        <ul>
          <li><RouterLink to="/admin-user">User Management</RouterLink></li>
          <li class="active"><a href="#">Theme Management</a></li>
          <li><a href="#">Report Message</a></li>
        </ul>
      </nav>
    </div>

    <div class="main-content">
      <div class="topbar">
        <h1>Theme Management</h1>
        <div class="account-section">
          <div class="account-info">
            <span class="account-name">{{ userName }}</span>
            <span class="account-type">{{ userType }}</span>
          </div>
          <button class="account-toggle">▼</button>
        </div>
      </div>

      <div class="theme-management">
        <div class="search-bar">
          <input type="text" placeholder="Search theme" />
        </div>
        <table class="theme-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Icon</th>
              <th>Name</th>
              <th>Backgrounds</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="theme in themes" :key="theme.id">
              <tr @click="toggleExpand(theme)">
                <td>{{ theme.id }}</td>
                <td>{{ theme.icon }}</td>
                <td>{{ theme.name }}</td>
                <td>
                  {{ theme.backgrounds[0] }}
                  <span v-if="theme.backgrounds.length > 1">...</span>
                </td>
                <td>
                  <button class="icon-button">⚙️</button>
                  <button class="icon-button">🗑️</button>
                </td>
              </tr>
              <tr v-if="theme.expanded" class="expanded-row">
                <td colspan="5">
                  <ul>
                    <li v-for="(bg, index) in theme.backgrounds" :key="index">
                      {{ index + 1 }}. {{ bg }}
                      <button class="icon-button">🗑️</button>
                    </li>
                  </ul>
                  <button class="add-button">+</button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
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
  height: 100vh;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
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
  overflow-y: auto;
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
}

.account-section {
  display: flex;
  align-items: center;
}

.account-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.account-name {
  font-weight: bold;
  margin-right: 5px; /* Space between name and type */  
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

/* Theme Management Styles */
.theme-management {
  background-color: #1e1e1e;
  color: #ffffff;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  background-color: #2a2a2a;
  border: none;
  color: #ffffff;
  border-radius: 5px;
}

.theme-table {
  width: 100%;
  border-collapse: collapse;
}

.theme-table th,
.theme-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #2a2a2a;
}

.theme-table th {
  background-color: #2a2a2a;
}

.icon-button {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  margin-left: 5px;
  font-size: 16px;
}

.expanded-row {
  background-color: #2a2a2a;
}

.expanded-row ul {
  list-style-type: none;
  padding: 0;
}

.expanded-row li {
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-button {
  background-color: #FFD800;
  color: #2a2a2a;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  margin-top: 10px;
}
</style>