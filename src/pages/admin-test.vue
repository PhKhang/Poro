<template>
  <div>
    <h1>User Stats</h1>
    <button @click="getUserStats">Load User Stats</button>
    <table v-if="userData.length">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Session Count</th>
          <th>Total Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userData" :key="user._id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.sessionCount }}</td>
          <td>{{ user.totalHours }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>{{ userData }}</p>

    <h1>Theme Data</h1>
    <button @click="getThemeData">Load Theme Data</button>
    <table v-if="themeData.length">
      <thead>
        <tr>
          <th>Theme ID</th>
          <th>Icon</th>
          <th>Name</th>
          <th>Video</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="theme in themeData" :key="theme._id">
          <td>{{ theme.themeId }}</td>
          <td>{{ theme.icon }}</td>
          <td>{{ theme.name }}</td>
          <td>{{ theme.video }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>{{ themeData }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const userData = ref([]);
const themeData = ref([]);

async function getUserStats() {
  console.log('loading user stats');
  try {
    const response = await $fetch('/api/admin', {
      method: 'POST',
      body: {
        action: 'getUserStats',
      }
    });
    userData.value = response.users;
    console.log('Received user data:', response);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    userData.value = 'Error fetching data';
  }
}

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
    console.log('Received theme data:', response);
  } catch (error) {
    console.error('Error fetching theme data:', error);
    themeData.value = 'Error fetching data';
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>