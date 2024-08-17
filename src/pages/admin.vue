<template>
    <div>
      <!-- Top Bar -->
      <div class="topbar">
        <div class="account-info">
          <span class="account-name">Quang Huy</span>
          <span class="account-type">Admin</span>
        </div>
        <dif><button class="account-toggle">▼</button></dif>
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
        <h1>Welcome to UI Admin</h1>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BackgroundWithSidebar",
  };
  </script>

  <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');

/* Top Bar Styles */
.topbar {
  height: 50px; 
  width: calc(100% - 250px); 
  background-color: #2a2a2a;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 15px; 
  box-sizing: border-box;
}

.account-info {
  display: flex;
  align-items: center;
  flex-direction: column; /* Align items horizontally */
}

.account-name {
  color: #ecf0f1;
  font-size: 16px; 
  margin: 0; 
  font: 800 16px 'Poppins', sans-serif;
}

.account-type {
  font-size: smaller;
  color: gray;
  margin: 0; 
}

.account-toggle {
  background-color: #2a2a2a;
  color: #ecf0f1;
  border: none;
  padding: 0px 8px; 
  cursor: pointer;
  margin-top: 0px;
}

.account-toggle:hover {
  background-color: #3b5998;
}
/* Sidebar Styles */
.sidebar {
  width: 250px;
  height: 100vh; 
  background-color: #2a2a2a;
  position: fixed;
  top: 0; 
  left: 0;
  padding: 10px 15px; 
  box-sizing: border-box;
  overflow: auto; 
}

/* Sidebar Header Styles */
.sidebar-header h2 {
  color: #FFD800; 
  font-size: 20px;
  margin-bottom: 20px;
  margin-top: 0;
  font: 800 26px 'Poppins', sans-serif;
}

/* Sidebar List Styles */
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  margin: 15px 0; 
  padding: 10px; 
  background-color: #2a2a2a; 
  border-radius: 4px; 
}

.sidebar ul li a {
  display: block; /* Make <a> fill the entire <li> */
  padding: 10px; /* Add padding to create space around the text */
  background-color: #2a2a2a; 
  color: #FFFFFF;
  text-decoration: none;
  font-size: 16px; 
  border-radius: 4px; 
  box-sizing: border-box; 
}
.sidebar ul li a:hover {
  color: #2A2A2A;
  background-color: #FFD800;
}
/* Background Container Styles */
.background-container {
  height: 100vh;
  background-color: #222222;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: Poppins;
  padding-left: 250px; 
}

.background-container h1 {
  margin: 0;
  font-size: 24px; 
}
</style>
