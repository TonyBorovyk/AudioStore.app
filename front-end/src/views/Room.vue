<template>
  <div class="room-wrapper">
    <button
      class="btn btn-margin"
      v-if="connection != null"
      @click="leaveRoom()"
    >
      Leave Room
    </button>
    <AdminRoom v-if="admin" />
    <UserRoom v-if="!admin" />
  </div>
</template>

<script>
import AdminRoom from "@/components/AdminRoom.vue";
import UserRoom from "@/components/UserRoom.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Room",
  components: {
    AdminRoom,
    UserRoom
  },
  data() {
    return {
      admin: false,
      user_exist: false,
      room_exist: false,
      connection: null
    };
  },
  methods: {
    ...mapActions(["fetchSongDetails", "fetchRoomData", "fetchUser"]),
    ...mapActions("data_upload", ["changeDataUploadStatus"]),
    sendMessage(message) {
      console.log(this.connection);
      this.connection.send(JSON.stringify(message));
    },
    leaveRoom() {
      this.connection.close();
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["getRoomData", "getUser", "getSongId"])
  },
  watch: {
    getUser() {
      if (this.getUser != { username: "" }) {
        this.user_exist = true;
        console.log("getUser", this.getUser);
        if (this.room_exist && this.connection === null) {
          this.connection = new WebSocket("ws://localhost:8081");
          if (this.getRoomData.admin_id === this.getUser.user_id) {
            this.admin = true;
          }
        }
      }
    },
    getRoomData() {
      if (this.getRoomData != {}) {
        this.room_exist = true;
        console.log("getRoomData", this.getRoomData);
        if (this.user_exist && this.connection === null) {
          this.connection = new WebSocket("ws://localhost:8081");
          if (this.getRoomData.admin_id === this.getUser.user_id) {
            this.admin = true;
          }
        }
      }
    },
    getSongId() {
      if (this.admin) {
        this.sendMessage({
          method: "new track",
          track_id: this.getSongId
        });
      }
    },
    connection() {
      this.connection.onopen = e => {
        this.changeDataUploadStatus(true);
        if (this.admin) {
          this.sendMessage({
            method: "create new room",
            roomId: this.$route.params.id,
            roomName: this.getRoomData.room_name,
            adminId: this.getUser.user_id
          });
        }
        if (!this.admin) {
          this.sendMessage({
            method: "connect user to the room",
            roomId: this.$route.params.id,
            adminId: this.getUser.user_id
          });
        }
        console.log(e);
        console.log("Successfully connected to websocket");
      };
      this.connection.onmessage = e => {
        console.log(e);
        console.log(JSON.parse(e.data));
      };
    }
  },
  beforeRouteLeave(to, from, next) {
    if (from.name == "RoomPage" && to != undefined) {
      if (this.connection != null) {
        this.connection.close();
      }
    }
    next();
  },
  created() {
    this.fetchRoomData();
    this.fetchUser();
  }
};
</script>

<style></style>