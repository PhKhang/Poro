<template>
    <div>
      <!-- Top Bar -->
      <div class="topbar">
        <div class="account-control">
          <span class="account-name">John Doe</span>
          <button class="account-toggle">▼</button>
        </div>
      </div>
  
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="sidebar-header">
          <h2>Poro</h2>
        </div>
        <ul>
          <li><a href="#">User Management</a></li>
          <li><a href="#">Theme Management</a></li>
          <li><a href="#">Report Message</a></li>
        </ul>
      </div>
  
      <!-- Background Container -->
      <div class="background-container">
        <h1>Welcome to My Vue App</h1>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BackgroundWithSidebar",
  };
  </script>
  
  <style scoped>
  /* Top Bar Styles */
  .topbar {
    height: 50px; /* Adjusted height */
    width: calc(100% - 250px); /* Full width minus the sidebar width */
    background-color: #2a2a2a;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 15px; /* Adjusted padding */
    box-sizing: border-box;
  }
  
  .account-control {
    display: flex;
    align-items: center;
  }
  
  .account-name {
    color: #ecf0f1;
    font-size: 16px; /* Adjusted font size */
    margin-right: 8px; /* Adjusted margin */
  }
  
  .account-toggle {
    background-color: #2a2a2a;
    color: #ecf0f1;
    border: none;
    padding: 4px 8px; /* Adjusted padding */
    cursor: pointer;
  }
  
  .account-toggle:hover {
    background-color: #3b5998;
  }
  
  /* Sidebar Styles */
  .sidebar {
    width: 250px;
    height: 100vh; /* Ensure sidebar height fits within viewport minus topbar */
    background-color: #2a2a2a;
    position: fixed;
    top: 0; /* Positioned below the top bar */
    left: 0;
    padding: 10px 15px; /* Adjusted padding */
    box-sizing: border-box;
    overflow: auto; /* Allow scrolling if content overflows */
  }
  
  /* Sidebar Header Styles */
  .sidebar-header h2 {
    color: #f1c40f; /* Yellow color */
    font-size: 20px; /* Adjusted font size */
    margin-bottom: 20px;
    margin-top: 0;
    font-family: Poppins;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar ul li {
    margin: 15px 0; /* Adjusted margin */
  }
  
  .sidebar ul li a {
    color: #ecf0f1;
    text-decoration: none;
    font-size: 16px; /* Adjusted font size */
  }
  
  /* Background Container Styles */
  .background-container {
    height: 100vh; /* Ensure background container height fits within viewport minus topbar */
    background-color: #222222;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: Poppins;
    padding-left: 250px; /* Make room for the sidebar */
  }
  
  .background-container h1 {
    margin: 0;
    font-size: 24px; /* Adjusted font size */
  }
  </style>
  