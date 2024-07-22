<template>
  <ul class="task-list">
    <li v-for="task in tasks" :key="task.name" :class="['task-item', { 'setting-active': task.isSetting }]">
      <div class="task-content">
        <h3 class="task-name">{{ task.name }}</h3>
        <p :class="['task-date', { overdue: task.isOverdue }]">{{ task.date }}</p>
        <span :class="['task-priority', task.priorityClass]">{{ task.priorityText }}</span>
      </div>
      <div class="icons">
        <svg alt="Settings" class="task-icon" width="16" height="16.7" viewBox="0 0 17 18" fill="none"
          xmlns="http://www.w3.org/2000/svg" @click="toggleSetting(task)">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M7.98102 0.799984C6.79012 0.799984 5.82468 1.76543 5.82468 2.95636C5.82468 3.12895 5.70566 3.35923 5.42119 3.51372C5.33366 3.56126 5.24733 3.6107 5.16226 3.66198C4.87855 3.83301 4.61222 3.82203 4.45585 3.73256C3.41731 3.13834 2.09389 3.49294 1.49158 4.52681L0.893793 5.55291C0.290331 6.58877 0.646463 7.91795 1.687 8.51326C1.83786 8.59965 1.9797 8.81919 1.9728 9.14582C1.97181 9.1925 1.97131 9.23934 1.97131 9.28618C1.97131 9.33311 1.97181 9.37987 1.9728 9.42655C1.9797 9.75327 1.83787 9.9728 1.68702 10.0591C0.646489 10.6544 0.290357 11.9836 0.893819 13.0194L1.49162 14.0456C2.09393 15.0795 3.41734 15.434 4.45588 14.8398C4.61224 14.7504 4.87856 14.7393 5.16226 14.9104C5.24733 14.9617 5.33366 15.0111 5.42119 15.0587C5.70566 15.2131 5.82468 15.4434 5.82468 15.616C5.82468 16.8069 6.79012 17.7724 7.98102 17.7724H9.2189C10.4099 17.7724 11.3752 16.8069 11.3752 15.616C11.3752 15.4434 11.4943 15.2131 11.7788 15.0587C11.8663 15.0111 11.9526 14.9617 12.0377 14.9104C12.3214 14.7393 12.5877 14.7504 12.7441 14.8398C13.7826 15.434 15.106 15.0795 15.7083 14.0456L16.3062 13.0194C16.9096 11.9836 16.5534 10.6544 15.5129 10.0591C15.3621 9.9728 15.2203 9.75327 15.2271 9.42655C15.2282 9.37987 15.2287 9.33303 15.2287 9.28618C15.2287 9.23934 15.2282 9.1925 15.2271 9.14582C15.2203 8.81911 15.3621 8.59957 15.5129 8.51326C16.5535 7.91795 16.9096 6.58876 16.3062 5.5529L15.7084 4.5268C15.106 3.49293 13.7826 3.13833 12.7441 3.73255C12.5878 3.82203 12.3214 3.833 12.0377 3.66197C11.9526 3.61069 11.8663 3.56126 11.7788 3.51372C11.4943 3.35923 11.3752 3.12895 11.3752 2.95636C11.3752 1.76543 10.4099 0.799984 9.2189 0.799984H7.98102ZM8.59992 6.74032C7.19384 6.74032 6.05406 7.88011 6.05406 9.28618C6.05406 10.6923 7.19384 11.832 8.59992 11.832C10.006 11.832 11.1458 10.6923 11.1458 9.28618C11.1458 7.88011 10.006 6.74032 8.59992 6.74032Z"
            fill="#222222" />
        </svg>
        <svg alt="Mark Done" class="task-icon" width="16" height="16"
          viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"
          @click="toggleDone(task)">
          <rect :class="{ 'icon-done': !task.isDone }" x="0.599976" y="0.200012" width="16" height="16" rx="3.04762" fill="#FFD800" />
          <path v-show="task.isDone" d="M3.86108 9.04582L6.71054 11.8952L13.0723 5.53336" stroke="white" stroke-width="1.90476"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TaskList',
  data() {
    return {
      tasks: [
        {
          name: 'Write Use-case Specification',
          date: 'Nov 18, 2024',
          isOverdue: false,
          priorityClass: 'urgent-important',
          priorityText: 'urgent and important',
          isDone: false,
          isSetting: false
        },
        {
          name: 'Clean room',
          date: '23:00 - 23:59 May 29, 2024 | Due: May 30,20242222',
          isOverdue: true,
          priorityClass: 'not-urgent-important',
          priorityText: 'not urgent and important',
          isDone: true,
          isSetting: false
        },
        {
          name: 'Buy snacks',
          date: 'Jun 30, 2024',
          isOverdue: false,
          priorityClass: 'not-urgent-not-important',
          priorityText: 'not urgent and not important',
          isDone: false,
          isSetting: false
        }
      ]
    };
  },
  computed: {
    totalTask() {
      return this.tasks.length;
    },
    doneTask() {
      return this.tasks.filter(task => task.isDone).length;
    }
  },
  methods: {
    toggleDone(task: { isDone: boolean }) {
      task.isDone = !task.isDone;
      this.emitTaskUpdate();
    },
    toggleSetting(task: { isSetting: boolean }) {
      task.isSetting = !task.isSetting;
    },
    emitTaskUpdate() {
      this.$emit('task-update', {
        total: this.tasks.length,
        done: this.tasks.filter(task => task.isDone).length
      });
    }
  },
  watch: {
    tasks: 'emitTaskUpdate'
  }
});
</script>

<style scoped>
.task-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.task-item {
  width: 308px;
  height: 68px;
  border-radius: 4.8px;
  border-left: 4.8px solid #ededed;
  background-color: #222;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0;
  margin-bottom: 9px;
  position: relative;
  transition: width 0.3s ease, border-left 0.3s ease;
}

.task-item:hover {
  width: 284.8px;
}

.task-content {
  width: 100%;
  padding-right: 40px; 
}

.task-content {
  padding-right: 10px; 
  box-sizing: border-box;
  overflow: hidden;
}

.task-name, .task-date, .task-priority {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Ensure text does not overflow */
}

.task-name {
  color: #fff;
  font: 400 12.8px Poppins, sans-serif;
  padding-left: 6px;
  padding-top: 3px;
  margin: 0;
}

.task-date {
  color: #ededed;
  margin-bottom: -3px;
  padding-left: 6px;
  margin-top: 0;
  font: 800 11.2px Poppins, sans-serif;
}

.overdue {
  color: #ff6b6b;
}

.task-priority {
  font-family: Poppins, sans-serif;
  border-radius: 2.8px;
  font-size: 10.4px;
  color: #ededed;
  font-weight: 600;
  padding-left: 3px;
  padding-right: 3px;
  margin-left: 5px;
}

.urgent-important {
  background-color: #b04239;
}

.not-urgent-important {
  background-color: #009320;
}

.not-urgent-not-important {
  background-color: #7a7a7a;
}

.icons {
  display: none;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: -20.2px; /* Position to the right of the task item */
  top: 50%;
  transform: translateY(-50%);
  gap: 5px;
  padding: 2px;
}

.task-item:hover .icons {
  display: flex;
}

.task-icon:hover {
  color: #7a7a7a;
}

.icon-done {
  fill: #222222;
}

.setting-active {
  border-left: 4.8px solid #FFD700;
}
</style>
