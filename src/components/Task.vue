<template>
    <section class="task-management">
      <div class="title">Task Management</div>
      <div class="header">
        <div class="calendar">
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" style="padding-left: 14px; padding-right: 14px; padding-top:4.8px">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6 4.80005C12.1523 4.80005 12.6 5.24777 12.6 5.80005V6.80005H20.6V5.80005C20.6 5.24777 21.0477 4.80005 21.6 4.80005C22.1522 4.80005 22.6 5.24777 22.6 5.80005V6.80005H25.6C27.2568 6.80005 28.6 8.1432 28.6 9.80005V25.8C28.6 27.4568 27.2568 28.8 25.6 28.8H7.59998C5.94312 28.8 4.59998 27.4568 4.59998 25.8V9.80005C4.59998 8.1432 5.94312 6.80005 7.59998 6.80005H10.6V5.80005C10.6 5.24777 11.0477 4.80005 11.6 4.80005ZM6.59998 12.8H26.6V9.80005C26.6 9.24777 26.1522 8.80005 25.6 8.80005H22.6V9.80005C22.6 10.3523 22.1522 10.8 21.6 10.8C21.0477 10.8 20.6 10.3523 20.6 9.80005V8.80005H12.6V9.80005C12.6 10.3523 12.1523 10.8 11.6 10.8C11.0477 10.8 10.6 10.3523 10.6 9.80005V8.80005H7.59998C7.0477 8.80005 6.59998 9.24777 6.59998 9.80005V12.8Z" fill="#EDEDED"/>
            </svg>
            <div class="day">{{ currentDay }}</div>
            <div class="month-year">{{ currentMonth }}</div>
        </div>
        <div class="total-done-tasks">
            <div class="progress">
                <svg width="68.8" height="68.8" viewBox="0 0 250 250" class="circular-progress" :style="{ '--progress': progress }">
                <p> {{progress}} %</p>
                <circle class="bg"></circle>
                <circle class="fg"></circle>
                <text x="125" y="135" text-anchor="middle" fill="#ededed" font-weight="800" font-size="50px" font-family="Poppins">{{ Math.round(progress) }}%</text>
                </svg>
            </div>
            <div class="total-done-display" style="color:#ffd800;">
                <div>Total</div>
                <p>{{ totalTasks }}</p>
            </div>
            <div class="total-done-display" style="color: #03AC13; padding-right: 20px">
                <div>Done</div>
                <p>{{ doneTasks }}</p>
            </div>
        </div>
    </div>
    <TaskList />
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none" class="add-task-icon">
        <circle cx="26" cy="26" r="26" fill="#222222" />
        <g transform="translate(11.5, 11)">
            <path d="M14.5999 8.19985C14.5999 4.55477 11.645 1.59985 7.9999 1.59985C4.35482 1.59985 1.3999 4.55477 1.3999 8.19985C1.3999 11.8449 4.35482 14.7999 7.9999 14.7999C11.645 14.7999 14.5999 11.8449 14.5999 8.19985ZM8.60068 8.79987L8.60123 11.8041C8.60123 12.1354 8.3326 12.4041 8.00123 12.4041C7.66987 12.4041 7.40123 12.1354 7.40123 11.8041L7.40068 8.79987H4.39521C4.06384 8.79987 3.79521 8.53123 3.79521 8.19987C3.79521 7.8685 4.06384 7.59987 4.39521 7.59987H7.40045L7.3999 4.59898C7.3999 4.26761 7.66853 3.99898 7.9999 3.99898C8.33127 3.99898 8.5999 4.26761 8.5999 4.59898L8.60045 7.59987H11.6035C11.9349 7.59987 12.2035 7.8685 12.2035 8.19987C12.2035 8.53123 11.9349 8.79987 11.6035 8.79987H8.60068Z" fill="#EDEDED"/>
            <path d="M21.4999 5.8H15.4237C15.217 5.15984 14.9296 4.55585 14.5738 4H21.4999C23.6538 4 25.3999 5.74608 25.3999 7.9V16.1544C25.3999 16.8705 25.1154 17.5572 24.6091 18.0636L17.8636 24.8092C17.3572 25.3155 16.6704 25.6 15.9544 25.6H7.69993C5.54601 25.6 3.79993 23.8539 3.79993 21.7V14.7738C4.35578 15.1296 4.95976 15.417 5.59993 15.6238V21.7C5.59993 22.8598 6.54013 23.8 7.69993 23.8H15.7999V19.9C15.7999 17.8204 17.4277 16.121 19.4786 16.0061L19.6999 16H23.5999V7.9C23.5999 6.7402 22.6597 5.8 21.4999 5.8ZM22.3267 17.8H19.6999C18.5981 17.8 17.6945 18.6485 17.6069 19.7278L17.5999 19.9V22.5268L22.3267 17.8Z" fill="#EDEDED"/>
        </g>
    </svg>
    </section>
</template>
  
<script lang="ts">
    import { ref, computed } from 'vue';
    import { defineComponent } from 'vue';
    import TaskList from './TaskList.vue';

    const currentDate = new Date();
    const currentDay = ref(currentDate.getDate());
    const currentMonth = ref(currentDate.toLocaleString('default', { month: 'short' }));

    const totalTasks = ref(3);
    const doneTasks = ref(1);

    export default defineComponent({
        name: 'TaskManagement',
        components: {
            TaskList,
        },
        setup() {
            const progress = computed(() => (doneTasks.value / totalTasks.value) * 100);
            return {
                currentDay,
                currentMonth,
                progress,
                totalTasks,
                doneTasks,
            };
        },
    });
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
  
.task-management {
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    float: left;
    font-family: 'Poppins', sans-serif;
    padding: 0px;
    width: 340px;
    height: 440px;
    align-items: left;
}

.title {
    color: #EDEDED;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    align-content: left;
    margin-left: 14.4px;
    margin-top: 10px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 7.2px;
    margin-left: 10px;
    margin-bottom: 10px;
    width: 313px;
}

.calendar {
    border-radius: 12px;
    background: #222;
    text-align: center;
}

.day {
    margin: -10px;
    font-size: 24px;
    font-weight: bold;
}

.month-year {
    font-size: 14px;
    margin-bottom: 6.2px;
}

.progress {
    margin-left: 12.8px;
    padding-top: 9.6px;
    padding-bottom: 9.6px;
    display: flex;
    align-items: center;
}

.circular-progress {
    --size: 240px;
    --half-size: calc(var(--size) / 2);
    --stroke-width: 30px;
    --radius: calc((var(--size) - var(--stroke-width)) / 2);
    --circumference: calc(var(--radius) * 3.14159265359 * 2);
    --dash: calc((var(--progress) * var(--circumference)) / 100);
    animation: progress-animation 5s linear 0s 1 forwards;
}

.circular-progress circle {
    cx: var(--half-size);
    cy: var(--half-size);
    r: var(--radius);
    stroke-width: var(--stroke-width);
    fill: none;
    stroke-linecap: round;
}

.circular-progress circle.bg {
    stroke: #2a2a2a;
}

.circular-progress circle.fg {
    transform: rotate(-90deg);
    transform-origin: var(--half-size) var(--half-size);
    stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
    transition: stroke-dasharray 0.3s linear 0s;
    stroke: #ffd800;
}

@property --progress {
    syntax: "<number>";
    inherits: false;
    initial-value: progress;
}

.total-done-tasks {
    width: 242px;
    height: 88px;
    flex-shrink: 0;
    text-align: center;
    border-radius: 12px;
    background: #222;
    display: flex;
    text-align: center;
    justify-content: space-between;

}

.total-done-display {
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    align-items: center;
    margin-top: 12.8px;
}

.total-done-display div {
    margin-bottom: -5px; /* Giảm khoảng cách giữa tiêu đề và số */
}

.total-done-display p {
    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
}

.task-list {
    padding-left: 10px;
    border-radius: 10px;
    height: 231px; 
    overflow-y: auto;  /* Enable vertical scrolling */
}

.task {
    background-color: #222222;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px; 
}

.add-task-icon {
    align-self: end;
    cursor: pointer;
    margin-top: 5px;
    margin-right: 16.8px;
}
</style>