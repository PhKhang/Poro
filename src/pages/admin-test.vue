<template>
  <div>
    <h1>User Stats</h1>
    <button @click="getUserStats">Load User Stats</button>
    <table v-if="data.length">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Session Count</th>
          <th>Total Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in data" :key="user._id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.sessionCount }}</td>
          <td>{{ user.totalHours }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>{{ data }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([]);

async function getUserStats() {
  console.log('loading');
  try {
    const response = await $fetch('/api/admin', {
      method: 'POST',
      body: {
        action: 'getUserStats',
      }
    });
    data.value = response.users;
    console.log('Received data:', response);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    data.value = 'Error fetching data';
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