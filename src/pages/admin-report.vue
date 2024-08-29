<script lang="ts" setup>
// const reportList = ref();
const reportList = ref<any[]>([]);
const data = await $fetch("/api/admin", {
  method: "POST",
  body: {
    action: "getReport",
  },
}).then((data) => {
  reportList.value = data.reports;
  console.log("Reports:", data.reports);
});

const popupData = ref({
  // _id: "",
  subject: "",
  category: "",
  from: "",
  description: "",
});

const popUp = ref(false);
const selectedRow = ref<HTMLElement | null>(null);

function showPopUp(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const row = target.closest("tr") as HTMLTableRowElement;
  if (!row) return;

  if (selectedRow.value) {
    selectedRow.value.classList.remove("highlighted"); // Gỡ lớp khỏi thẻ trước đó
  }

  selectedRow.value = target.closest("td"); // Lưu trữ thẻ td hiện tại
  if (selectedRow.value) {
    selectedRow.value.classList.add("highlighted"); // Thêm lớp cho thẻ td hiện tại
  }
  const checkbox = row.querySelector(
    "input[type='checkbox']"
  ) as HTMLInputElement;
  if (checkbox) {
    checkbox.checked = true;
  }
  
  const subject = row.querySelector(".content_report")?.textContent || "";
  const category = row.querySelector(".category_form")?.textContent || "";
  const from = row.querySelector(".name_form")?.textContent || "";
  const description = row.querySelector(".description_form")?.textContent || "";

  popupData.value = { subject, category, from, description };
  console.log(popupData.value);
  popUp.value = true;
}

// async function deleteReport() {
//   if (!popupData.value.) return;

//   try {
//     const response = await $fetch("/api/admin", {
//       method: "POST",
//       body: {
//         action: "deleteReport",
//         reportID: popupData.value.id,
//       },
//     });

//     if (response.success) {
//       reportList.value = reportList.value.filter(report => report.id !== popupData.value.id);
//       closePopUp();
//     } else {
//       console.error("Xóa report thất bại.");
//     }
//   } catch (error) {
//     console.error("Lỗi khi xóa report:", error);
//   }
// }

function closePopUp() {
  popUp.value = false;
}
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
              <tr class="title_table">
                <th class="check_form"></th>
                <th class="name_form">Username</th>
                <th class="category_form">Category</th>
                <th class="content_report">Subject</th>
                <th class="description_form">Description</th>
                <th class="time-form">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(report, index) in reportList"
                :key="index"
                class="report-content"
              >
                <td class="check_form">
                  <input type="checkbox" class="row-check" />
                </td>
                <td @click="showPopUp" class="name_form">
                  {{ report.name[0] }}
                </td>
                <td @click="showPopUp" class="category_form">
                  {{ report.reportCategory }}
                </td>
                <td @click="showPopUp" class="content_report">
                  {{ report.reportSubject }}
                </td>
                <td @click="showPopUp" class="description_form">
                  {{ report.reportBody }}
                </td>
                <td @click="showPopUp" class="time_form">
                  {{ report.reportTime }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-if="popUp" class="popup_content">
    <div class="top_b">
      <span class="material-symbols-outlined" @click="closePopUp"> close </span>
    </div>
    <div class="content_on_popup">
      <div class="subject_popup">
        <p>Subject:</p>
        <div class="subject_popup_content">{{ popupData.subject }}</div>
      </div>
      <div class="category_popup">
        <p>Category:</p>
        <div class="category_popup_content">{{ popupData.category }}</div>
      </div>
      <div class="from_popup">
        <p>From:</p>
        <div class="from_popup_content">{{ popupData.from }}</div>
      </div>
      <div class="description_popup">
        <p>Report Description:</p>
        <div class="description_popup_content">{{ popupData.description }}</div>
      </div>
      <div class="clear_btn">
        <span class="material-symbols-outlined"> delete </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");

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
  content: "";
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
  top: 2em;
  left: 5em;
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

.report-table {
  border-collapse: collapse;
  width: 100%;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  overflow-y: scroll;
  top: 0;
}

.report-table::-webkit-scrollbar {
  display: none;
}

/*.report-table .title_table,
.report-table tbody tr {
  width: 100%;
  table-layout: fixed;
} 


.title_table {
  display: flex;
}
*/

.report-content {
  cursor: pointer;
}

.report-table th,
.report-table td {
  text-align: left;
  padding: 20px 0;
  border-bottom: 1px solid #2a2a2a;
  font-weight: bold;
}

.report-content .check_form {
  text-align: center;
  width: 50px;
}

.report-table .check_form:has(input:checked) ~ * {
  font-weight: normal;
}

.report-table .description_form {
  width: auto;
  max-width: auto;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-wrap: break-word;
  word-break: normal;
}
.popup_content {
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 500px;
  width: 500px;
  background-color: #2a2a2a;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

.top_b {
  flex: 0.5;
  padding: 10px;
  border-bottom: 2px solid #ffffff;
  text-align: right;
}

.top_b .material-symbols-outlined {
  font-family: "Material Symbols Outlined", sans-serif;
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  cursor: pointer;
  font-weight: 800;
  color: #ffffff;
}

.top_b .material-symbols-outlined:hover {
  color: red;
}

.content_on_popup {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  flex: 9.5;
  color: #ffffff;
}

.subject_popup,
.category_popup,
.from_popup {
  display: flex;
  justify-content: flex-start;
}

.subject_popup p,
.category_popup p,
.from_popup p {
  width: 50%;
}

.subject_popup_content {
  overflow-x: hidden;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-wrap: break-word;
  word-break: normal;
}

.description_popup {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.description_popup_content {
  border: 2px solid #ffffff;
  border-radius: 5px;
  max-height: 250px;
  height: 250px;
  width: auto;
  overflow: hidden;
  overflow-y: scroll;
}

.description_popup_content::-webkit-scrollbar {
  display: none;
}

.clear_btn {
  text-align: right;
  margin-top: -5px;
  margin-right: 5px;
}

.clear_btn .material-symbols-outlined {
  font-family: "Material Symbols Outlined", sans-serif;
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  cursor: pointer;
  font-weight: 800;
  color: #ffffff;
}
</style>
