<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("data_upload", ["changeDataUploadStatus"])
  },
  created() {
    this.changeDataUploadStatus(true);
  }
};
</script>
