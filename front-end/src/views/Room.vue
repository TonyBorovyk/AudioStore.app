<template>
  <div class="room-wrapper">
    <AdminRoom />
  </div>
</template>

<script>
import AdminRoom from "@/components/AdminRoom.vue";
import { mapActions } from "vuex";

export default {
  name: "Room",
  components: {
    AdminRoom
  },
  methods: {
    ...mapActions("data_upload", ["changeDataUploadStatus"])
  },
  created() {
    this.changeDataUploadStatus(true);
  }
};
</script>

<style></style>
