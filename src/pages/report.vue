<template>
  <notallowGuest></notallowGuest>
  <div class="issue-report-screen">
    <header class="header"> 
      <NuxtLink to="/testing">
          <svg class="right-arrow-next" alt="Right arrow next" width="61" height="17" viewBox="0 0 61 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.188 15V1.8959H25.0832C25.9755 1.8959 26.7545 2.00244 27.4204 2.21551C28.0996 2.42859 28.6256 2.76818 28.9985 3.23428C29.3847 3.70038 29.5778 4.31963 29.5778 5.09202C29.5778 5.74456 29.4113 6.33718 29.0784 6.86987C28.7588 7.38924 28.286 7.7488 27.6601 7.94856V8.02846C28.4458 8.17495 29.085 8.50788 29.5778 9.02725C30.0838 9.54662 30.3369 10.2591 30.3369 11.1647C30.3369 12.017 30.1238 12.7294 29.6976 13.3021C29.2848 13.8747 28.7055 14.3008 27.9597 14.5805C27.214 14.8602 26.3484 15 25.3629 15H21.188ZM22.846 7.46914H24.7836C25.9022 7.46914 26.7079 7.27604 27.2007 6.88984C27.6934 6.50364 27.9398 5.97761 27.9398 5.31176C27.9398 4.55268 27.6801 4.01333 27.1607 3.69372C26.6547 3.37411 25.8889 3.2143 24.8635 3.2143H22.846V7.46914ZM22.846 13.6816H25.1232C26.2551 13.6816 27.1341 13.4752 27.76 13.0624C28.3859 12.6362 28.6988 11.9837 28.6988 11.1047C28.6988 10.2924 28.3859 9.69976 27.76 9.32688C27.1474 8.94069 26.2685 8.74759 25.1232 8.74759H22.846V13.6816ZM35.009 15.2397C34.1967 15.2397 33.5175 15 32.9715 14.5206C32.4388 14.0278 32.1724 13.3487 32.1724 12.4831C32.1724 11.4177 32.6452 10.6053 33.5907 10.046C34.5496 9.47337 36.0611 9.07386 38.1252 8.84747C38.1252 8.43463 38.0653 8.04178 37.9454 7.6689C37.8389 7.29602 37.6391 6.99638 37.3462 6.76999C37.0665 6.53028 36.6603 6.41042 36.1276 6.41042C35.5683 6.41042 35.0423 6.51696 34.5496 6.73003C34.0568 6.94311 33.6174 7.18282 33.2312 7.44916L32.5919 6.31054C33.0447 6.01757 33.5974 5.73791 34.2499 5.47156C34.9158 5.1919 35.6349 5.05207 36.4073 5.05207C37.5925 5.05207 38.4515 5.41829 38.9842 6.15074C39.5169 6.86987 39.7832 7.83536 39.7832 9.04722V15H38.4249L38.285 13.8414H38.2251C37.7723 14.2143 37.2729 14.5406 36.7269 14.8202C36.1942 15.0999 35.6216 15.2397 35.009 15.2397ZM35.4884 13.9213C35.9545 13.9213 36.394 13.8081 36.8068 13.5817C37.2197 13.3553 37.6591 13.0357 38.1252 12.6229V9.92616C36.5138 10.1259 35.3819 10.4256 34.7293 10.8251C34.0901 11.2246 33.7705 11.7373 33.7705 12.3632C33.7705 12.9092 33.937 13.3087 34.2699 13.5617C34.6028 13.8015 35.009 13.9213 35.4884 13.9213ZM46.673 15.2397C45.8207 15.2397 45.0483 15.04 44.3558 14.6404C43.6633 14.2409 43.1173 13.6616 42.7178 12.9025C42.3183 12.1435 42.1185 11.2312 42.1185 10.1659C42.1185 9.07386 42.3316 8.14831 42.7577 7.38924C43.1972 6.63016 43.7698 6.05086 44.4756 5.65134C45.1948 5.25183 45.9672 5.05207 46.7928 5.05207C47.4321 5.05207 47.9781 5.16527 48.4308 5.39166C48.8969 5.61805 49.2965 5.88439 49.6294 6.19069L48.7904 7.26938C48.5107 7.01635 48.2111 6.80994 47.8915 6.65013C47.5852 6.49033 47.239 6.41042 46.8528 6.41042C46.2668 6.41042 45.7408 6.57023 45.2747 6.88984C44.8219 7.19614 44.4623 7.6356 44.196 8.20824C43.943 8.76756 43.8164 9.4201 43.8164 10.1659C43.8164 11.2712 44.0894 12.1701 44.6354 12.8626C45.1948 13.5418 45.9206 13.8814 46.8128 13.8814C47.2656 13.8814 47.6851 13.7881 48.0713 13.6017C48.4575 13.4019 48.7971 13.1689 49.09 12.9025L49.8092 14.0012C49.3697 14.3874 48.8836 14.6937 48.3509 14.9201C47.8183 15.1332 47.2589 15.2397 46.673 15.2397ZM51.9477 15V0.777259H53.5657V10.4056H53.6256L57.7606 5.29178H59.5784L56.3224 9.18705L60.0179 15H58.2201L55.3835 10.3257L53.5657 12.4431V15H51.9477Z" fill="#EDEDED"/>
              <path d="M5.44684 8.84758L10.8577 14.2585C11.0501 14.4508 11.3609 14.4508 11.5533 14.2585C11.7456 14.0661 11.7456 13.7553 11.5533 13.5629L6.49016 8.49982L11.5533 3.43672C11.7456 3.24439 11.7456 2.93351 11.5533 2.74118C11.4573 2.64526 11.3314 2.59705 11.2055 2.59705C11.0796 2.59705 10.9536 2.64526 10.8577 2.74118L5.44682 8.15207C5.25452 8.34437 5.25452 8.65526 5.44684 8.84758Z" stroke="#EDEDED" stroke-width="1.41873"/>
          </svg>
      </NuxtLink>
    </header>
    <main class="main-content">
      <h1 class="title">Issue Report</h1>
      <p class="description">
        From tech to tilt, we're here to help you!<br />
        Report your current issues with Poro to our team by filling out this form, any provided information is greatly appreciated!
      </p>
      <form class="report-form" @submit.prevent="handleSave">
        <div class="form-group">
          <label for="subject" class="form-label">
            Subject<span class="required">*</span>
          </label>
          <input type="text" id="subject" class="form-input" v-model="subject" required />
        </div>
        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea id="description" class="form-textarea" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <label for="category" class="form-label">
            Choose the issue's category<span class="required">*</span>
          </label>
          <div class="select-wrapper">
            <select id="category" class="form-select" v-model="selectedCategory" required>
              <option value="" disabled>Select a category</option>
              <option v-for="category in categories" :key="category.value" :value="category.value">
                {{ category.text }}
              </option>
            </select>
          </div>
        </div>
        <p class="success-message" v-if="isSaved">Your Report has been sent successfully!</p>
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';



const subject = ref('');
const description = ref('');

const categories = ref([
  { value: 'themes', text: 'Themes' },
  { value: 'timer', text: 'Timer' },
  { value: 'sound', text: 'Sound' },
  { value: 'music', text: 'Music' },
  { value: 'stats', text: 'Stats' },
  { value: 'leaderboard', text: 'Leaderboard' },
  { value: 'other', text: 'Other' },
]);

const selectedCategory = ref('');

const handleCategoryChange = () => {
  console.log(`Selected category: ${selectedCategory.value}`);
};

const isSaved = ref(false);
const handleSave = () => {
  isSaved.value = true;
  setTimeout(() => isSaved.value = false, 3000); 
  subject.value = '';
  description.value = '';
  selectedCategory.value = '';
};


</script>

<style>

html, body {
  margin: 0; 
  padding: 0; 
  background-color: #222; 
}

.issue-report-screen {
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100%;
  z-index: 0;
}

.header {
  cursor: pointer;
  align-self: flex-start;
  display: flex;
  color: #ededed;
  font: 400 20px 'Source Sans 3', sans-serif;
  padding-left: 15px;
  
  padding-top:15px;
}

.back-icon {
  aspect-ratio: 1;
  object-fit: contain;
  width: 16px;
}

.main-content {
  align-self: center;
  display: flex;
  margin-top: 47px;
  width: 670px;
  max-width: 100%;
  flex-direction: column;
  align-items: center;
}

.title {
  color: #ededed;
  text-align: center;
  margin: 0px 0;
  font: 800 26px 'Poppins', sans-serif;
}

.description {
  margin: 0;
  color: #ededed;
  text-align: center;
  align-self: stretch;
  font: 400 16px 'Poppins', sans-serif;
}

.report-form {
  width: 100%;
  max-width: 548.8px;
}

.form-group {
  margin-top: 22px;
}

.form-label {
  padding-left: 15px;
  color: #ededed;
  font: 600 16px 'Poppins', sans-serif;
  display: block;
}

.required {
  color: #ff5b5b;
}

.form-input,
.form-textarea,
.form-select {
  border-radius: 4px;
  background-color: #222;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #444;
  color: #ededed;
  font: 400 16px 'Source Sans 3', sans-serif;
  padding-left: 15px;
}

.form-input {
  height: 52px;
}

.form-textarea {
  height: 89px;
  resize: vertical;
}

.select-wrapper {
  width: 549px;
  height: 52px; 
  position: relative;
  z-index: 0;
}

.right-arrow-next {
  margin-right: 8px; /* Tạo khoảng cách giữa icon và văn bản */
}

.back-text {
  margin: 0; 
}

.success-message {
  color: #fff;
  margin-top: 22px;
  font: 500 16px 'Poppins', sans-serif;
  text-align: center;
}

.submit-button {
  display: flex;
  justify-content: center; 
  align-items: center; 
  border-radius: 8px;
  background-color: #ffd800;
  margin: 0px auto;
  margin-top: 22px;
  color: #222;
  font: 600 16px 'Poppins', sans-serif;
  border: none;
  cursor: pointer;
  width: 96px;
  height: 40px;
}

@media (max-width: 991px) {
  .main-content {
    margin-top: 40px;
  }

  .form-label {
    margin-left: 10px;
  }
}
</style>