<script lang="ts" setup>
// const dep = ref("TRhibn rthin thib g");

// const reportList = ref();
// const data = await $fetch("/api/admin", {
//   method: "POST",
//   body: {
//     action: "getReport",
//   },
// }).then(data => {
//   reportList.value = data.result
//   console.log('Reports:', data.result)
// });
</script>

<template>
  <div class="app-container">
    <div class="sidebar">
      <h1 class="logo">Poro</h1>
      <nav>
        <ul>
          <li><RouterLink to="/admin-user">User Management</RouterLink></li>
          <li><RouterLink to="/admin-theme">Theme Management</RouterLink></li>
          <li class="active"><a href="#">Report Message</a></li>
        </ul>
      </nav>
    </div>

    <div class="main-content">
      <div class="topbar">
        <h1>Report Message</h1>
        <div class="account-section">
          <div class="account-info">
            <span class="account-name">Quang Huy</span>
            <span class="account-type">Admin</span>
          </div>
          <button class="account-toggle">🌌</button>
        </div>
      </div>
      <div class="main-content">
        <div class="dashboard_report">
          <div class="search-container">
            <div class="search_icon">
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 30 30"
              >
                <path
                  fill="white"
                  d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-input"
              placeholder="Search report message"
            />
          </div>

          <!-- Table -->
          <div class="report-table">
            <table id="list_report">
              <thead>
                <tr>
                  <th class="check_form"></th>
                  <th class="name_form">Username</th>
                  <th class="category_form">Category</th>
                  <th class="content_report">Subject</th>
                  <th class="description_form">Description</th>
                  <th class="time-form">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="check_form">
                    <input type="checkbox" class="row-check" />
                  </td>
                  <td class="name_form">Quang Huy</td>
                  <td class="category_form">Music</td>
                  <td class="content_report">Music is not playing</td>
                  <td class="description_form">
                    I cannot press the play button on the music display, ...
                  </td>
                  <td class="time_form">5:38 PM</td>
                </tr>
                <tr>
                  <td class="check_form">
                    <input type="checkbox" class="row-check" />
                  </td>
                  <td class="name_form">Quang Huy</td>
                  <td class="category_form">Music</td>
                  <td class="content_report">Music is not playing</td>
                  <td class="description_form">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae culpa sit quasi adipisci sed repellendus
                    voluptatibus non labore ratione repudiandae praesentium
                    mollitia consequuntur, error ducimus delectus. Reiciendis
                    dolorem sapiente ea.
                  </td>
                  <td class="time_form">5:38 PM</td>
                </tr>
                <tr>
                  <td class="check_form">
                    <input type="checkbox" class="row-check" />
                  </td>
                  <td class="name_form">Quang Huy</td>
                  <td class="category_form">Music</td>
                  <td class="content_report">Music is not playing</td>
                  <td class="description_form">
                    I cannot press the play button on the music display, ...
                  </td>
                  <td class="time_form">5:38 PM</td>
                </tr>

                <tr>
                  <td class="check_form">
                    <input type="checkbox" class="row-check" />
                  </td>
                  <td class="name_form">Quang Huy</td>
                  <td class="category_form">Music</td>
                  <td class="content_report">Music is not playing</td>
                  <td class="description_form">
                    I cannot press the play button on the music display, ...
                  </td>
                  <td class="time_form">5:38 PM</td>
                </tr>
                <tr>
                  <td class="check_form">
                    <input type="checkbox" class="row-check" />
                  </td>
                  <td class="name_form">Quang Huy</td>
                  <td class="category_form">Music</td>
                  <td class="content_report">Music is not playing</td>
                  <td class="description_form">
                    I cannot press the play button on the music display, ...
                  </td>
                  <td class="time_form">5:38 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="popup_content">
      <div class="top_b">
        <span class="material-symbols-outlined"> close </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.app-container {
  position: relative;
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
  color: #ffd800;
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
  background-color: #ffd800;
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
  color: #ffd800;
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

.expanded-row li {
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-button {
  background-color: #ffd800;
  color: #2a2a2a;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.dashboard_report {
  position: relative;
  border-radius: 20px;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ffffff;
}

.search-container {
  border: 2px solid #ffffff;
  border-radius: 10px;
  display: flex;
  gap: 5px;
  position: absolute;
  top: 50px;
  left: 200px;
  height: 40px;
  width: 332px;
  justify-content: flex-start;
  align-items: center;
  padding: -20px;
  text-align: center;
}
.search_icon {
  padding: 0 10px;
  text-align: center;
}

#search-input {
  color: #ffffff;
  background-color: #1e1e1e;
  border: none;
  outline: none;
}

#list_report {
  border-collapse: collapse;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#list_report th,
#list_report td {
  text-align: left;
  padding: 20px 0;
  border-bottom: 1px solid #2a2a2a;
  font-weight: bold;
}

#list_report .check_form {
  text-align: center;
  width: 50px;
}

#list_report .check_form:has(input:checked) ~ * {
  font-weight: normal;
}

#list_report .name_form {
  width: 200px;
}

#list_report .category_form {
  width: 150px;
}

#list_report .content_report {
  width: 300px;
}

#list_report .description_form {
  width: 600px;
  max-width: 600px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-wrap: break-word;
  word-break: normal;
}
.popup_content {
  position: absolute;
  height: 500px;
  width: 500px;
  background-color: #2e2e2e;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.top_b .material-symbols-outlined {
  background-color: red;
  color: red;
}
</style>
