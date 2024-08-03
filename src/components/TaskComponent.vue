<template>
  <DraggableComponent>
    <article class="task-card">
      <header class="task-header">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b25406cb27732f8bcf2f4023dfd35411b368fbe6dbb761ec7b882192888a8b3?apiKey=545ab95c981142d1bbd97a1c1468bbd1&&apiKey=545ab95c981142d1bbd97a1c1468bbd1" alt="" class="close-icon" />
      </header>
      <div class="divider"></div>
      <main class="task-content">
        <section class="task-name-section">
          <h2 class="task-name">{{task.name}}</h2>
        </section>
        <section class="tag-section">
          <label for="tagSelect" class="tag-label">Tag</label>
          <div class="tag-selector">
            <span class="tag-placeholder">{{task.priorityText}}</span>
          </div>
        </section>
        <section class="description-section">
          <h3 class="description-label">Task Description</h3>
          <p class="description-content">Write description here...</p>
        </section>
        <section class="date-section">
          <label for="dateInput" class="date-label">Date</label>
          <div class="date-input-wrapper">
            <input type="text" id="dateInput" class="date-input" value="30/06/2024" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9fb2d24f9c4921d97450f52318bb815206c1e80b06cf2a931d9df479b98ad8a5?apiKey=545ab95c981142d1bbd97a1c1468bbd1&&apiKey=545ab95c981142d1bbd97a1c1468bbd1" alt="" class="calendar-icon" />
          </div>
        </section>
        <section class="time-section">
          <label for="timeInput" class="time-label">Time</label>
          <div class="time-input-wrapper">
            <input type="text" id="timeInput" class="time-input" value="12:00 AM" />
            <span class="time-separator">to</span>
            <div class="end-time-wrapper">
              <input type="text" id="endTimeInput" class="time-input" value="01:00 AM" />
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3079666f06874f70e7a572e097a11052491fd43dfd379c04223c1bba4086bf4b?apiKey=545ab95c981142d1bbd97a1c1468bbd1&&apiKey=545ab95c981142d1bbd97a1c1468bbd1" alt="" class="clock-icon" />
            </div>
          </div>
        </section>
        <section class="due-date-section">
          <label for="dueDateInput" class="due-date-label">Due Date</label>
          <div class="due-date-input-wrapper">
            <input type="text" id="dueDateInput" class="date-input" value="30/06/2024" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9fb2d24f9c4921d97450f52318bb815206c1e80b06cf2a931d9df479b98ad8a5?apiKey=545ab95c981142d1bbd97a1c1468bbd1&&apiKey=545ab95c981142d1bbd97a1c1468bbd1" alt="" class="calendar-icon" />
          </div>
        </section>
        <button class="delete-task-btn">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/21a9ca3245295af93b68fba926b55955afd9cf1b520f06719b4a227dd2c57836?apiKey=545ab95c981142d1bbd97a1c1468bbd1&&apiKey=545ab95c981142d1bbd97a1c1468bbd1" alt="" class="delete-icon" />
          <span>Delete task</span>
        </button>
      </main>
    </article>
  </DraggableComponent>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import DraggableComponent from './hoverMove.vue';
  
  export default defineComponent({
    name: 'TaskComponent',
    components: {
      DraggableComponent
    },
    props: {
      task: {
        type: Object as PropType<{id: number, name: string; date: string; isOverdue: boolean; priorityClass: string; priorityText: string; isDone: boolean; isSetting: boolean }>,
        required: true
      }
    },
  });
  </script>
  
  <style scoped>
  .task-card {
    border-radius: 16px;
    background-color: #222;
    display: flex;
    max-width: 400px;
    padding-bottom: 14px;
    flex-direction: column;
  }
  
  .task-header {
    display: flex;
    justify-content: flex-end;
  }
  
  .close-icon {
    width: 32px;
    height: 32px;
  }
  
  .divider {
    height: 1px;
    width: 100%;
    border: 1px solid #7a7a7a;
  }
  
  .task-content {
    display: flex;
    margin-top: 12px;
    width: 100%;
    flex-direction: column;
    padding: 0 13px;
  }
  
  .task-name-section {
    display: flex;
    gap: 8px;
    font-size: 14px;
    color: #fff;
    font-weight: 400;
  }
  
  .task-icon {
    width: 16px;
    height: 16px;
  }
  
  .task-name {
    font-family: Poppins, sans-serif;
    margin: auto 0;
  }
  
  .tag-section {
    display: flex;
    margin-top: 13px;
    gap: 9px;
    font-size: 10px;
    font-weight: 600;
  }
  
  .tag-label {
    font-family: Poppins, sans-serif;
    color: #7a7a7a;
    flex-grow: 1;
    margin: auto 0;
  }
  
  .tag-selector {
    display: flex;
    flex-direction: column;
    color: #ededed;
    justify-content: center;
  }
  
  .tag-placeholder {
    font-family: Poppins, sans-serif;
    border-radius: 2px;
    background-color: #515151;
    padding: 3px;
  }
  
  .description-label {
    color: #7a7a7a;
    margin-top: 15px;
    font: 600 10px Poppins, sans-serif;
  }
  
  .description-content {
    border-radius: 5px;
    background-color: #222;
    margin-top: 9px;
    color: #fff;
    padding: 10px 0 40px;
    font: 400 14px Source Sans Pro, sans-serif;
    border: 1px solid #7a7a7a;
  }
  
  .date-section,
  .time-section,
  .due-date-section {
    display: flex;
    margin-top: 9px;
    gap: 20px;
    white-space: nowrap;
  }
  
  .date-label,
  .time-label,
  .due-date-label {
    color: #7a7a7a;
    flex-grow: 1;
    margin: auto 0;
    font: 600 10px Poppins, sans-serif;
  }
  
  .date-input-wrapper,
  .time-input-wrapper,
  .due-date-input-wrapper {
    display: flex;
    font-size: 14px;
    color: #fff;
    font-weight: 400;
    flex-grow: 1;
    flex-basis: auto;
  }
  
  .date-input,
  .time-input {
    font-family: Poppins, sans-serif;
    border-radius: 4px;
    background-color: #222;
    margin: auto 0;
    padding: 5px 9px;
    border: 1px solid #7a7a7a;
  }
  
  .calendar-icon,
  .clock-icon {
    width: 32px;
    height: 32px;
  }
  
  .time-separator {
    color: #ededed;
    align-self: stretch;
    margin: auto 8px;
    font: 600 11px Poppins, sans-serif;
  }
  
  .end-time-wrapper {
    display: flex;
  }
  
  .delete-task-btn {
    align-self: flex-start;
    display: flex;
    margin-top: 9px;
    gap: 6px;
    font-size: 11px;
    color: #ededed;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .delete-icon {
    width: 18px;
    height: 18px;
  }
  
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  </style>