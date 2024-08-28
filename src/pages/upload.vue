<template>
  <div>
    <form @submit.prevent="upload" enctype="multipart/form-data">
      <input @input="event => file = event.target.value" type="file" name="file" id="file"><br>
      <input type="submit" value="Submit">
    </form>
    
    <h3></h3>
  </div>
</template>

<script lang="ts" setup>

let file = ref()
const file_name = ref('')
function upload() {
  const formData = new FormData();

  formData.append('file', file.value);

  useFetch('/api/upload', {
    method: 'POST',
    // headers: {
    //     'Content-Type': 'multipart/form-data',
    // },

    body: formData
  }).then(() => {
    file_name.value = file.value
  })
}

</script>

<style></style>