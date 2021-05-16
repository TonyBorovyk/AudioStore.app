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
    ...mapActions([
      "fetchSongDetails",
      "fetchRoomData",
      "fetchUser",
      "changePlay",
      "changeSongTime",
      "deleteRoom"
    ]),
    ...mapActions("data_upload", ["changeDataUploadStatus"]),
    sendMessage(message) {
      console.log(this.connection);
      this.connection.send(JSON.stringify(message));
    },
    leaveRoom() {
      if (this.admin) {
        this.deleteRoom(this.$route.params.id);
      }
      this.connection.close();
      this.$router.push("/");
    },
    wsConenction() {
      this.connection = new WebSocket("ws://localhost:8081");
      if (this.getRoomData.admin_id == this.getUser.user_id) {
        this.admin = true;
      }
    }
  },
  computed: {
    ...mapGetters([
      "getRoomData",
      "getUser",
      "getSongId",
      "getPlay",
      "getSongTime",
      "getCurrentTime"
    ])
  },
  watch: {
    getUser() {
      if (this.getUser != { username: "" }) {
        this.user_exist = true;
        if (this.room_exist && this.connection === null) {
          this.wsConenction();
        }
      }
    },
    getRoomData() {
      if (this.getRoomData != {}) {
        this.room_exist = true;
        if (this.user_exist && this.connection === null) {
          this.wsConenction();
        }
      }
    },
    getPlay() {
      if (this.admin) {
        if (this.getPlay) {
          this.sendMessage({
            method: "play"
          });
        }
        if (!this.getPlay) {
          this.sendMessage({
            method: "pause"
          });
        }
      }
    },
    getSongTime() {
      if (this.admin) {
        this.sendMessage({
          method: "new time",
          new_time: this.getSongTime
        });
      }
    },
    getSongId() {
      if (this.admin) {
        this.sendMessage({
          method: "new track",
          track_id: this.getSongId
        });
        this.sendMessage({
          method: "play"
        });
      }
    },
    connection() {
      this.connection.onopen = () => {
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
            userId: this.getUser.user_id
          });
        }
        console.log("Successfully connected to websocket");
      };
      this.connection.onmessage = e => {
        const data = JSON.parse(e.data);
        console.log(data);
        if (this.admin) {
          if (
            data.method === "connect user to the room" &&
            this.getSongId != ""
          ) {
            this.sendMessage({
              method: "just connected",
              userId: data.userId,
              roomId: this.getRoomData.room_id,
              songId: this.getSongId,
              new_time: this.getCurrentTime,
              play: this.getPlay
            });
          }
        }
        if (!this.admin) {
          if (data.method === "Connection is closed") {
            alert("Admin close the room!");
            this.leaveRoom();
          }
          if (data.method === "new track") {
            this.fetchSongDetails(data.track_id);
          }
          if (data.method === "play") {
            this.changePlay(true);
          }
          if (data.method === "pause") {
            this.changePlay(false);
          }
          if (data.method === "new time") {
            this.changeSongTime(data.new_time);
          }
        }
      };
    }
  },
  beforeRouteLeave(to, from, next) {
    if (from.name == "RoomPage" && to != undefined) {
      if (this.connection != null) {
        if (this.admin) {
          this.deleteRoom(this.$route.params.id);
        }
        this.connection.close();
      }
    }
    next();
  },
  created() {
    this.fetchRoomData(this.$route.params.id);
    this.fetchUser();
  }
};
</script>

<style></style>
