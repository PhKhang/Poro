<template>
    <div class="issue-report-container">
      <header class="header">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a48be705df6ff2523bc2616dd75428c7f4597db075183e112b486f1f3da6b27?apiKey=545ab95c981142d1bbd97a1c1468bbd1&" alt="Back arrow" class="back-arrow" />
        <span class="back-text">Back</span>
      </header>
      <main class="main-content">
        <h1 class="title">Issue Report</h1>
        <p class="description">
          From tech to tilt, we're here to help you!<br />Report your current issues with Poro to our team by filling out this form, any provided information is greatly appreciated
        </p>
        <form class="issue-form">
          <div class="form-group">
            <label for="subject" class="form-label">
              Subject<span class="required">*</span>
            </label>
            <input type="text" id="subject" class="form-input" required />
          </div>
          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea id="description" class="form-textarea"></textarea>
          </div>
          <div class="form-group">
            <label for="category" class="form-label">
              Choose the issue's category<span class="required">*</span>
            </label>
            <div class="select-wrapper">
              <select id="category" class="form-select" required>
                <option value="" disabled selected>Select a category</option>
              </select>
            </div>
          </div>
          <p class="success-message">Your Report has been sent successfully!</p>
          <button type="submit" class="submit-button">Submit</button>
        </form>
      </main>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'IssueReport',
    // Add any necessary component logic here
  });
  </script>
  
  <style scoped>
  .issue-report-container {
    background-color: #222;
    display: flex;
    flex-direction: column;
    padding: 34px 80px 80px 34px;
  }
  
  .header {
    align-self: flex-start;
    display: flex;
    gap: 11px;
    font-size: 25px;
    color: #ededed;
    font-weight: 400;
    white-space: nowrap;
    text-align: right;
  }
  
  .back-arrow {
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 20px;
  }
  
  .back-text {
    font-family: Source Sans Pro, sans-serif;
  }
  
  .main-content {
    align-self: center;
    display: flex;
    margin-top: 58px;
    width: 838px;
    max-width: 100%;
    flex-direction: column;
    align-items: center;
  }
  
  .title {
    color: #ededed;
    text-align: center;
    font: 800 32px Poppins, sans-serif;
  }
  
  .description {
    color: #ededed;
    text-align: center;
    align-self: stretch;
    margin-top: 15px;
    font: 400 20px Poppins, sans-serif;
  }
  
  .issue-form {
    display: flex;
    margin-top: 93px;
    width: 686px;
    max-width: 100%;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 30px;
  }
  
  .form-label {
    color: #ededed;
    font: 600 20px Poppins, sans-serif;
    display: block;
    margin-bottom: 8px;
  }
  
  .required {
    color: #ff5b5b;
  }
  
  .form-input,
  .form-textarea,
  .form-select {
    border-radius: 5px;
    border: 1px solid #7a7a7a;
    background-color: #222;
    width: 100%;
    padding: 10px;
    color: #ededed;
    font-family: Poppins, sans-serif;
  }
  
  .form-input {
    height: 65px;
  }
  
  .form-textarea {
    height: 111px;
    resize: vertical;
  }
  
  .select-wrapper {
    position: relative;
  }
  
  .select-wrapper::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #ededed;
    pointer-events: none;
  }
  
  .form-select {
    appearance: none;
    padding-right: 30px;
  }
  
  .success-message {
    color: #fff;
    align-self: center;
    margin-top: 34px;
    font: italic 500 20px Poppins, sans-serif;
    display: none;
  }
  
  .submit-button {
    border-radius: 10px;
    background-color: #b04239;
    align-self: center;
    margin-top: 21px;
    color: #ededed;
    text-align: center;
    padding: 17px 24px;
    font: 600 20px Poppins, sans-serif;
    border: none;
    cursor: pointer;
  }
  
  @media (max-width: 991px) {
    .issue-report-container {
      padding: 20px;
    }
  
    .header {
      white-space: initial;
    }
  
    .main-content {
      margin-top: 40px;
    }
  
    .description,
    .issue-form,
    .form-group,
    .form-input,
    .form-textarea,
    .form-select {
      max-width: 100%;
    }
  
    .submit-button {
      padding: 17px 20px;
      white-space: normal;
    }
  }
  </style>