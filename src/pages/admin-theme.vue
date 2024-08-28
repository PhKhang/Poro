<script setup>
import { ref, computed, onMounted } from 'vue';

// Search term for filtering
const searchTerm = ref('');

// Themes data
const themeData = ref([]);

// Pagination
const perPage = ref(5);
const currentPage = ref(1);

const userName = ref('Quang Huy');
const userType = ref('Admin');

// Toggle expand/collapse for theme rows
const toggleExpand = (theme) => {
  theme.expanded = !theme.expanded;
};

// Filtered themes based on search term
const filteredThemes = computed(() => {
  if (!searchTerm.value) return themeData.value;
  
  // Convert searchTerm to lowercase once for efficiency
  const searchLower = searchTerm.value.toLowerCase();

  return themeData.value.filter(theme =>
    theme.name.toLowerCase().includes(searchLower) ||
    theme.id.toString().toLowerCase().includes(searchLower)
  );
});


// Paginated themes
const paginatedThemes = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredThemes.value.slice(start, start + perPage.value);
});

const totalPages = computed(() => Math.ceil(filteredThemes.value.length / perPage.value));

// Function to fetch theme data
async function getThemeData() {
  console.log('loading theme data');
  try {
    const response = await $fetch('/api/admin', {
      method: 'POST',
      body: {
        action: 'getThemeData',
      }
    });
    themeData.value = response.themes;
    console.log('Raw response:', response);

    // Ensure response.themes is an array
    if (Array.isArray(response.themes)) {
      // Log IDs and their types
      response.themes.forEach(theme => {
        console.log(`Theme ID: ${theme.id}, Type: ${typeof theme.id}`);
      });

      // Sort themes by ID (numerical comparison)
      themeData.value = response.themes.sort((a, b) => {
        return a.id - b.id;
      });
    }
    // Ensure response.themes is an array
    if (Array.isArray(response.themes)) {
      // Log IDs and their types
      response.themes.forEach(theme => {
        console.log(`Theme ID: ${theme.id}, Type: ${typeof theme.id}`);
      });

      // Sort themes by ID (numerical comparison)
      themeData.value = response.themes.sort((a, b) => {
        return a.id - b.id;
      });
    }   
  } catch (error) {
    console.error('Error fetching theme data:', error);
    themeData.value = 'Error fetching data';
  }
}

// Function to handle theme deletion
const confirmDelete = (theme) => {
  if (confirm(`Are you sure you want to delete the theme: ${theme.name}?`)) {
    // Handle theme deletion logic here
  }
};

// Pagination controls
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

// Call getThemeData when the component is mounted
onMounted(() => {
  getThemeData();
  console.log('Component mounted, fetching theme data...');
});
</script>
<template>
  <div class="app-container">
    <div class="sidebar">
      <h1 class="logo">Poro</h1>
      <nav>
        <ul>
          <li>
            <RouterLink to="/admin-user">User Management</RouterLink>
          </li>
          <li class="active"><a href="#">Theme Management</a></li>
          <li>
            <RouterLink to="/admin-report">Report Message</RouterLink>
          </li>
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
          <button class="account-toggle">🌌</button>
        </div>
      </div>

      <div class="theme-management">
        <!-- Table Controls -->
        <div class="table-controls">
          <div class="filter-controls">
            <div class="search-bar">
              <input type="text" placeholder="Search theme" v-model="searchTerm" />
            </div>
          </div>
          <div class="table-hint">Showing {{ paginatedThemes.length }} of {{ themeData.length }} entries</div>
        </div>

        <!-- Table -->
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
            <template v-for="theme in paginatedThemes" :key="theme.id">
              <tr @click="toggleExpand(theme)">
                <td>{{ theme.id }}</td>
                <td>{{ theme.icon }}</td>
                <td>{{ theme.name }}</td>
                <td>
                  {{ theme.videos[0] }}
                  <span v-if="theme.videos.length > 1">...</span>
                </td>
                <td class="buttons">
                  <button class="edit-button">
                    <span class="material-symbols-outlined"> edit </span>
                  </button>
                  <button class="delete-btn" @click.stop="confirmDelete(theme)">
                    <span class="material-symbols-outlined"> delete </span>
                  </button>
                </td>
              </tr>

              <tr v-if="theme.expanded" class="expanded-row">
                <td colspan="5">
                  <ul>
                    <li v-for="(bg, index) in theme.videos" :key="index">
                      {{ index + 1 }}. {{ bg }}
                      <button class="delete-btn" @click="confirmDelete(theme)">
                        <span class="material-symbols-outlined"> delete </span>
                      </button>
                    </li>
                  </ul>
                  <button class="add-button">+</button>
                </td>
              </tr>
            </template>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

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

.theme-table td.buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.edit-button,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  margin: 0 5px;
}

.edit-button {
  margin-right: 5px;
}

.delete-btn {
  margin-left: 5px;
}

.edit-button .material-symbols-outlined,
.delete-btn .material-symbols-outlined {
  font-family: 'Material Symbols Outlined', sans-serif;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
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

/* Table Controls Styles */
.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-controls {
  display: flex;
  align-items: center;
}

.table-hint {
  color: #999;
}

/* Pagination Styles */
.table-footer {
  display: flex;
  justify-content: flex-end;
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



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

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

.theme-table td.buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.edit-button,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  margin: 0 5px;
}

.edit-button {
  margin-right: 5px;
}

.delete-btn {
  margin-left: 5px;
}

.edit-button .material-symbols-outlined,
.delete-btn .material-symbols-outlined {
  font-family: 'Material Symbols Outlined', sans-serif;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
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

/* Table Controls Styles */
.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-controls {
  display: flex;
  align-items: center;
}

.table-hint {
  color: #999;
}

/* Pagination Styles */
.table-footer {
  display: flex;
  justify-content: flex-end;
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