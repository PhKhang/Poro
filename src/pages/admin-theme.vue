<script setup>
import { ref, computed, onMounted } from 'vue';

// Search term for filtering
const searchTerm = ref('');
const editingTheme = ref(null);
// Themes data
const themeData = ref([]);

// Pagination
const perPage = ref(5);
const currentPage = ref(1);

const userName = ref('Quang Huy');
const userType = ref('Admin');

const showEditModal = ref(false);
const newUrl = ref('');
const currentTheme = ref(null);
const currentIndex = ref(null);

const showAddThemeModal = ref(false);
const newTheme = ref({
  name: '',
  icon: '',
  videos: ''
});
const formError = ref(''); // Add this line

const resetNewTheme = () => {
  newTheme.value = {
    name: '',
    icon: '',
    videos: ''
  };
};

const addTheme = async () => {
  // Validate the form
  if (!newTheme.value.name || !newTheme.value.icon || !newTheme.value.videos) {
    formError.value = 'All fields are required.';
    return;
  }

  try {
    // Send the new theme to the backend
    const response = await $fetch('/api/admin', {
      method: 'POST',
      body: {
        action: 'addTheme',
        themeData: newTheme.value
      }
    });

    if (response.error) {
      console.error('Error adding theme:', response.error);
      return;
    }

    // Add the new theme to the local themes array
    themeData.value.push(response.theme);

    // Reset the form
    newTheme.value = {
      name: '',
      icon: '',
      videos: ''
    };
    resetNewTheme();
    formError.value = ''; // Reset the error message

    // Close the modal
    showAddThemeModal.value = false;

    console.log('Theme added successfully:', response);

  } catch (error) {
    console.error('Error adding theme:', error);
  }
};
const editBackground = (theme, index) => {
  currentTheme.value = theme;
  currentIndex.value = index;
  newUrl.value = theme.videos[index];
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  currentTheme.value = null;
  currentIndex.value = null;
  newUrl.value = '';
};

const saveNewUrl = () => {
  if (newUrl.value) {
    currentTheme.value.videos[currentIndex.value] = newUrl.value;
    saveTheme(currentTheme.value); // Save the updated theme
    closeEditModal();
  }
};

const showAddModal = ref(false);
const newBackgroundUrl = ref('');

// Function to show the add background modal
const showAddBackgroundModal = (theme) => {
  currentTheme.value = theme;
  newBackgroundUrl.value = '';
  showAddModal.value = true;
};

// Function to close the add background modal
const closeAddModal = () => {
  showAddModal.value = false;
  currentTheme.value = null;
  newBackgroundUrl.value = '';
};

// Function to add a new background
const addNewBackground = async () => {
  if (newBackgroundUrl.value && currentTheme.value) {
    currentTheme.value.videos.push(newBackgroundUrl.value);

    // Send the updated theme to the backend
    const themeId = currentTheme.value._id || currentTheme.value.id;
    try {
      const response = await $fetch('/api/admin', {
        method: 'POST',
        body: {
          action: 'updateTheme',
          themeId: themeId,
          themeData: currentTheme.value
        }
      });

      if (response.error) {
        console.error('Error updating theme:', response.error);
        return;
      }

      // Update the local data
      const index = themeData.value.findIndex(t => t._id === themeId || t.id === themeId);
      if (index !== -1) {
        themeData.value[index] = { ...currentTheme.value };
      }

      console.log('Background added and theme updated successfully:', response);

    } catch (error) {
      console.error('Error updating theme:', error);
    }

    closeAddModal();
  }
};


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


function editTheme(theme) {
  console.log('Editing theme:', theme); // Add this line
  editingTheme.value = { ...theme }; // Copy the theme data for editing
}


const saveTheme = async () => {
  console.log('Save button clicked');
  console.log('Current editingTheme:', editingTheme.value);

  // Check for both _id and id
  const themeId = editingTheme.value?._id || editingTheme.value?.id;

  if (!editingTheme.value || !themeId) {
    console.error('No theme selected or theme ID is missing', editingTheme.value);
    return;
  }

  // Prepare the complete theme data including unchanged fields
  const updatedThemeData = {
    ...themeData.value.find(theme => theme._id === themeId || theme.id === themeId),
    ...editingTheme.value
  };

  // Ensure we're using _id for the API call
  const apiThemeId = updatedThemeData._id || updatedThemeData.id;

  try {
    console.log('Updating theme with data:', {
      action: 'updateTheme',
      themeId: apiThemeId,
      themeData: updatedThemeData
    });

    const response = await $fetch('/api/admin', {
      method: 'POST',
      body: {
        action: 'updateTheme',
        themeId: apiThemeId,
        themeData: updatedThemeData
      }
    });

    console.log('Server response:', response);

    if (response.error) {
      console.error('Error updating theme:', response.error);
      return;
    }

    // Update the local data
    const index = themeData.value.findIndex(t => t._id === apiThemeId || t.id === apiThemeId);
    if (index !== -1) {
      themeData.value[index] = { ...updatedThemeData };
    }

    editingTheme.value = null;
    console.log('Theme updated successfully');

  } catch (error) {
    console.error('Error updating theme:', error);
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
    <!-- Sidebar -->
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

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar -->
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

      <!-- Theme Management -->
      <div class="theme-management">
        <!-- Table Controls -->
        <div class="table-controls">
          <div class="filter-controls">
            <div class="search-bar">
              <input type="text" placeholder="Search theme" v-model="searchTerm" />
            </div>
          </div>
          <div class="table-hint">
            Showing {{ paginatedThemes.length }} of {{ themeData.length }} entries
          </div>
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
                <td v-if="editingTheme && editingTheme.id === theme.id" class="editing-cell">
                  <input v-model="editingTheme.icon" class="edit-input icon-input" />
                </td>
                <td v-else>{{ theme.icon }}</td>
                <td v-if="editingTheme && editingTheme.id === theme.id" class="editing-cell">
                  <input v-model="editingTheme.name" class="edit-input name-input" />
                </td>
                <td v-else>{{ theme.name }}</td>
                <td>
                  {{ theme.videos[0] }}
                  <span v-if="theme.videos.length > 1">...</span>
                </td>
                <td class="buttons">
                  <!-- Edit Button -->
                  <button class="edit-button" @click.stop="editTheme(theme)">
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <!-- Delete Button -->
                  <button class="delete-button" @click.stop="confirmDelete(theme)">
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                  <!-- Save Button -->
                  <button class="save-button" v-if="editingTheme && editingTheme.id === theme.id"
                    @click.stop="saveTheme">
                    <span class="material-symbols-outlined">add_task</span>
                  </button>
                </td>
              </tr>

              <!-- Expanded Row -->
              <tr v-if="theme.expanded" class="expanded-row">
                <td colspan="3"></td>
                <td colspan="6">
                  <ul>
                    <li v-for="(bg, index) in theme.videos" :key="index">
                      {{ index + 1 }}. {{ bg }}
                      <div class="buttons">
                        <button class="edit-bg-button" @click="editBackground(theme, index)">
                          <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="delete-bg-button" @click="confirmDelete(theme)">
                          <span class="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                  <div class="buttons">
                    <button class="add-button" @click="showAddBackgroundModal(theme)">
                      <span class="material-symbols-outlined">add_circle</span>
                    </button>
                  </div>
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
          <button class="add-theme-button" @click="showAddThemeModal = true">
            <span class="material-symbols-outlined">add_circle</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="showEditModal" class="edit-modal">
    <div class="edit-modal-header">
      <h3>Edit Background</h3>
      <button class="close-button" @click="closeEditModal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="edit-modal-body">
      <label for="youtube-url">YouTube URL:</label>
      <input v-model="newUrl" id="youtube-url" type="text" />
    </div>
    <div class="edit-modal-footer">
      <button class="button save-button" @click="saveNewUrl">Save</button>
      <button class="button cancel-button" @click="closeEditModal">Cancel</button>
    </div>
  </div>
  <!-- Add Background Modal -->
  <div v-if="showAddModal" class="edit-modal">
    <div class="edit-modal-header">
      <h3>Add New Background</h3>
      <button class="close-button" @click="closeAddModal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="edit-modal-body">
      <label for="new-youtube-url">YouTube URL:</label>
      <input v-model="newBackgroundUrl" id="new-youtube-url" type="text" />
    </div>
    <div class="edit-modal-footer">
      <button class="button save-button" @click="addNewBackground">Add</button>
      <button class="button cancel-button" @click="closeAddModal">Cancel</button>
    </div>
  </div>
  <!-- Add Theme Modal -->
<div v-if="showAddThemeModal" class="add-theme-modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3>Add New Theme</h3>
      <button class="close-button" @click="showAddThemeModal = false">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body">
      <label for="new-theme-name">Name:</label>
      <input v-model="newTheme.name" id="new-theme-name" type="text" />

      <label for="new-theme-icon">Icon:</label>
      <input v-model="newTheme.icon" id="new-theme-icon" type="text" />

      <label for="new-theme-videos">Videos (comma-separated URLs):</label>
      <input v-model="newTheme.videos" id="new-theme-videos" type="text" />

      <!-- Error message -->
      <div v-if="formError" class="error-message">{{ formError }}</div>
    </div>
    <div class="modal-footer">
      <button class="button save-button" @click="addTheme">Add</button>
      <button class="button cancel-button" @click="showAddThemeModal = false">Cancel</button>
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

.theme-row {
  display: flex;
  justify-content: space-between;
  padding: 8px;
}

.theme-actions {
  display: flex;
  gap: 8px;
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

/* Table Styles */
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
  justify-content: flex-end;
}

.theme-table td.buttons button {
  margin-left: 5px;
  /* Add some spacing between buttons */
}

/* Button Styles */
button {
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  margin: 0 5px;
}

.add-button,
.close-button,
.edit-button,
.edit-bg-button,
.save-button,
.delete-button,
.delete-bg-button,
.add-theme-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  margin: 0 5px;
}

.add-button .material-symbols-outlined,
.close-button .material-symbols-outlined,
.edit-bg-button .material-symbols-outlined,
.edit-button .material-symbols-outlined,
.save-button .material-symbols-outlined,
.delete-button .material-symbols-outlined,
.delete-bg-button .material-symbols-outlined,
.add-theme-button .material-symbols-outlined {
  font-family: 'Material Symbols Outlined', sans-serif;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.add-button:hover,
.close-button:hover,
.edit-button:hover,
.edit-bg-button:hover,
.save-button:hover {
  color: #FFD800;
}

.delete-button:hover,
.delete-bg-button:hover {
  color: #ff4d4d;
}

/* Expanded Row Styles */
.expanded-row {
  background-color: #1e1e1e;
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

/* Ensure buttons are aligned to the right */
.theme-table td .buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.theme-table td .buttons button {
  margin-left: 5px;
  /* Add some spacing between buttons */
}

/* Table Controls Styles */
.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-hint {
  color: #999;
}


/* Pagination Styles */
.table-footer {
  display: flex;
  justify-content: space-between;
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

/* Add Theme Button Styles */
.add-theme-button {
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
  transition: color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  margin-left: auto; /* Keeps it positioned to the right */
}

.add-theme-button .material-symbols-outlined {
  font-size: 36px; /* Makes the icon bigger */
}

.add-theme-button:hover {
  color: #FFD800;
  transform: scale(1.1); /* Slightly enlarges the button on hover */
}


/* Editing Cell Styles */
.editing-cell {
  padding: 0 !important;
}

.edit-input {
  width: 100%;
  padding: 8px;
  background-color: #2a2a2a;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.icon-input {
  width: 40px;
  text-align: center;
}

.name-input {
  width: 100%;
}

/* Modal Styles */
.edit-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1e1e1e;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  width: 300px;
  color: white;
}

.edit-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.edit-modal-header h3 {
  margin: 0;
  font-size: 1.2em;
}

.edit-modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-modal-body label {
  font-weight: bold;
}

.edit-modal-body input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.edit-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.edit-modal-footer .button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-modal-footer .save-button {
  background-color: #4CAF50;
  color: white;
}

.edit-modal-footer .cancel-button {
  background-color: #f44336;
  color: white;
}

.add-theme-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
  width: 300px;
  color: white;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-header, .modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-body label {
  font-weight: bold;
}
.modal-body input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.modal-footer {
  gap: 10px;
  margin-top: 20px;
}


.modal-footer .button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px; /* Add margin to the right */
}
.modal-footer .save-button {
  background-color: #4caf50;
  color: white;
}

.modal-footer .cancel-button {
  background-color: #f44336;
  color: white;
}
</style>
