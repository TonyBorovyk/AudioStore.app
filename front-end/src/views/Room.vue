<template>
  <div class="room-wrapper">
    <AdminRoom v-if="admin" />
    <UserRoom v-if="!admin" />
  </div>
</template>

<script>
import AdminRoom from "@/components/AdminRoom.vue";
import UserRoom from "@/components/UserRoom.vue";
import { mapActions } from "vuex";

export default {
  name: "Room",
  components: {
    AdminRoom,
    UserRoom
  },
  data() {
    return {
      admin: false,
      connection: null
    };
  },
  methods: {
    ...mapActions(["fetchSongDetails", "fetchRoomData"]),
    ...mapActions("data_upload", ["changeDataUploadStatus"]),
    sendMessage(message) {
      console.log(this.connection);
      this.connection.send(message);
    }
  },
  created() {
    this.fetchRoomData();
    if (!this.admin) {
      this.fetchSongDetails(1);
    }
    this.changeDataUploadStatus(true);
    this.connection = new WebSocket("ws://localhost:8081");

    this.connection.onopen = e => {
      console.log(e);
      console.log("Successfully connected to websocket");
    };

    this.connection.onmessage = e => {
      console.log(e);
    };
  }
};
</script>

<style></style>
