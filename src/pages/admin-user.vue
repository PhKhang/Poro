<template>
  <div class="app-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <h1 class="logo">Poro</h1>
      <nav>
        <ul>
          <li class="active"><a href="#">User Management</a></li>
          <li><RouterLink to="/admintheme">Theme Management</RouterLink></li>
          <li><a href="#">Report Message</a></li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar -->
      <div class="topbar">
        <h1>User Management</h1>
        <div class="account-section">
          <div class="account-info">
            <span class="account-name">Moni Roy</span>
            <span class="account-type">Admin</span>
          </div>
        </div>
      </div>

      <!-- Metrics Dashboard -->
      <div class="dashboard">
        <div class="metric-card">
          <div class="metric-info">
            <span>Total User</span>
            <h2>{{ totalUser }}</h2>
            <p><span class="metric-change up">8.5% Up from yesterday</span></p>
          </div>
          <div class="metric-icon users-icon"></div>
        </div>

        <div class="metric-card">
          <div class="metric-info">
            <span>Total Hours</span>
            <h2>{{ totalTime }}</h2>
            <p><span class="metric-change up">1.8% Up from yesterday</span></p>
          </div>
          <div class="metric-icon hours-icon"></div>
        </div>

        <div class="metric-card">
          <div class="metric-info">
            <span>Total Sessions</span>
            <h2>{{ totalSessions }}</h2>
            <p><span class="metric-change up">1.3% Up from past week</span></p>
          </div>
          <div class="metric-icon sessions-icon"></div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="data-table">
        <!-- Table Controls -->
        <div class="table-controls">
          <div class="filter-controls">
            <button class="filter-btn">Filter</button>
            <button class="reset-btn">Reset</button>
          </div>
          <div class="table-hint">Showing {{ paginatedItems.length }} of {{ rows }} entries</div>
        </div>

        <!-- Table -->
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Total Time</th>
              <th>Sessions</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedItems" :key="item._id">
              <td>{{ item._id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.totalTime }} h</td>
              <td>{{ item.sessions }}</td>
              <td>{{ item.type }}</td>
              <td>
                <button class="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="table-footer">
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const userData = ref([]);
const totalUser = ref(0);
const totalTime = ref(0);
const totalSessions = ref(0);

const perPage = ref(5);
const currentPage = ref(1);

async function fetchUserStats() {
  try {
    const response = await $fetch('/api/admin', {
      method: 'POST',
      body: {
        action: 'getUserStats',
      },
    });
    userData.value = response.users || []; 
    totalUser.value = response.totalUser || 0;
    totalTime.value = response.totalTime || 0;
    totalSessions.value = response.totalSessions || 0;
    console.log('Received data:', response);
  } catch (error) {
    console.error('Error fetching user stats:', error);
  }
}

onMounted(fetchUserStats);

const totalPages = computed(() => Math.ceil(userData.value.length / perPage.value));
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return userData.value.slice(start, start + perPage.value);
});
const rows = computed(() => userData.value.length);

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
}
</script>


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
  color: #FFD800; /* Optional: Makes the title more prominent */
}

.account-section {
  display: flex;
  align-items: center;
}

.account-info {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.account-name {
  font-weight: bold;
  margin-right: 5px; /* Space between name and type */
}

.account-type {
  color: #999;
  font-size: 14px; /* Slightly smaller font for the type */
}
.account-toggle {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 18px; /* Adjust the size for better visibility */
}

/* Metrics Dashboard Styles */
.dashboard {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px; /* Adjusted to provide more space for the table */
}

.metric-card {
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 15px; /* Reduced padding to make the cards smaller */
  width: 28%; /* Adjusted width to give more space to the table */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-info h2 {
  font-size: 28px; /* Reduced font size */
  margin: 5px 0; /* Reduced margin */
}


.metric-change.up {
  color: #4caf50;
}

.metric-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.users-icon {
  background-color: #7c5cf7;
}

.hours-icon {
  background-color: #f77c5c;
}

.sessions-icon {
  background-color: #f7db5c;
}

/* Data Table Styles */
.data-table {
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 15px; /* Adjusted padding */
}

.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px; /* Adjusted margin */
}

th, td {
  padding: 10px; /* Reduced padding for table cells */
  text-align: left;
  border-bottom: 1px solid #3a3a3a;
}

.filter-controls {
  display: flex;
}

.filter-btn, .reset-btn {
  background-color: #3a3a3a;
  border: none;
  color: #ffffff;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.reset-btn {
  background-color: #4caf50;
}

.table-hint {
  color: #999;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #FFD800;
  color: #2a2a2a;
}

.delete-btn {
  background: none;
  border: none;
  color: #FFD800;
  cursor: pointer;
  font-size: 18px;
}

.table-footer {
  display: flex;
  justify-content: flex-end; /* Aligns the pagination to the right */
  align-items: center;
  margin-top: 20px;
}

.pagination {
  display: flex;
  align-items: center;
}

.pagination button {
  background-color: #3a3a3a;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.page-info {
  margin: 0 10px;
  font-size: 18px;
}

</style>