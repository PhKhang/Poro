<template>
  <div class="app-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <h1 class="logo">Poro</h1>
      <nav>
        <ul>
          <li class="active"><a href="#">User Management</a></li>
          <li><a href="#">Theme Management</a></li>
          <li><a href="#">Report Message</a></li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar -->
      <div class="topbar">
        <h1>User Management</h1>
        <div class="account-info">
          <span class="account-name">Moni Roy</span>
          <span class="account-type">Admin</span>
        </div>
        <dif><button class="account-toggle">▼</button></dif>
      </div>

      <!-- Metrics Dashboard -->
      <div class="dashboard">
        <div class="metric-card">
          <div class="metric-info">
            <span>Total User</span>
            <h2>40,689</h2>
            <p><span class="metric-change up">8.5% Up from yesterday</span></p>
          </div>
          <div class="metric-icon users-icon"></div>
        </div>

        <div class="metric-card">
          <div class="metric-info">
            <span>Total Hours</span>
            <h2>18,911</h2>
            <p><span class="metric-change up">1.8% Up from yesterday</span></p>
          </div>
          <div class="metric-icon hours-icon"></div>
        </div>

        <div class="metric-card">
          <div class="metric-info">
            <span>Total Sessions</span>
            <h2>10,293</h2>
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
                <th>NAME</th>
                <th>TOTAL TIME</th>
                <th>SESSIONS</th>
                <th>TYPE</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedItems" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.first_name }}</td>
              <td>{{ item.last_name }}</td>
              <td>{{ item.total_time }}</td>
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
            <button @click="prevPage" :disabled="currentPage === 1">Previous </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      items: [
      { id: '00001', name: 'Nhi Trần Ngọc Uyên', totalTime: 655, sessions: 10, type: 'User' },
        { id: '00002', name: 'Trần Nguyễn Phúc Khang', totalTime: 240, sessions: 10, type: 'User' },
        { id: '00003', name: 'Nguyễn Minh Hoàng', totalTime: 23.2, sessions: 10, type: 'User' },
        { id: '00004', name: 'Lương Quốc Dũng', totalTime: 342.2, sessions: 10, type: 'User' },
        { id: '00005', name: 'Nguyễn Quang Huy', totalTime: 12.7, sessions: 10, type: 'User' },
        { id: '00006', name: 'Alfred Murray', totalTime: 123, sessions: 10, type: 'User' },
        { id: '00007', name: 'Maggie Sullivan', totalTime: 34, sessions: 10, type: 'User' },
        { id: '00008', name: 'John Doe', totalTime: 100, sessions: 5, type: 'User' },
        { id: '00009', name: 'Jane Smith', totalTime: 50, sessions: 3, type: 'User' },
        { id: '00010', name: 'Michael Johnson', totalTime: 200, sessions: 8, type: 'User' },
        { id: '00011', name: 'Emily Davis', totalTime: 150, sessions: 6, type: 'User' },
        { id: '00012', name: 'Robert Wilson', totalTime: 75, sessions: 4, type: 'User' },
        { id: '00013', name: 'Sophia Anderson', totalTime: 300, sessions: 12, type: 'User' },
        { id: '00014', name: 'William Martinez', totalTime: 250, sessions: 10, type: 'User' },
        { id: '00015', name: 'Olivia Taylor', totalTime: 180, sessions: 7, type: 'User' },
        { id: '00016', name: 'James Brown', totalTime: 90, sessions: 3, type: 'User' },
        { id: '00017', name: 'Ava Thomas', totalTime: 120, sessions: 5, type: 'User' },
        { id: '00018', name: 'Benjamin Clark', totalTime: 220, sessions: 9, type: 'User' },
        { id: '00019', name: 'Emma Lewis', totalTime: 160, sessions: 6, type: 'User' },
        { id: '00020', name: 'Daniel Walker', totalTime: 80, sessions: 4, type: 'User' }
      ]
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.perPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.items.slice(start, end);
    },
    rows() {
      return this.items.length;
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    }
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
}

.topbar h1 {
  font-size: 28px;
}

.account-info {
  display: flex;
  align-items: center;
}

.account-name {
  margin-right: 10px;
}

.account-type {
  color: #999;
  margin-right: 10px;
}

.account-toggle {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
}

/* Dashboard Styles */
.dashboard {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.metric-card {
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 20px;
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-info h2 {
  font-size: 36px;
  margin: 10px 0;
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
  padding: 20px;
}

.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #3a3a3a;
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
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
  margin-left: 10px;
}
</style>
