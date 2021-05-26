<template>
  <div class="profile-container">
    <div class="profile-title">
      <h3 class="profile-name">{{ fullname }}</h3>
      <p class="username">{{ getUser.username }}</p>
      <span class="email">{{ getUser.email }}</span>
    </div>
    <div class="playlists-block" v-if="getPlaylists != [{}]">
      <div class="list-margin list-container">
        <h3>Playlists</h3>
        <div
          class="list-item flex-row"
          v-for="playlist in getPlaylists"
          :key="playlist.playlist_id"
        >
          <router-link
            :to="
              `/profile/${getUser.username}/playlists/${playlist.playlist_id}`
            "
          >
            <h3>{{ playlist.playlist_title }}</h3>
          </router-link>
          <button
            class="btn btn-delete"
            @click="handleClick(playlist.playlist_id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <button
      class="create-room btn btn-margin"
      @click="changeCreateRoomPopUpActivity"
    >
      Create room
    </button>
    <button
      class="create-room btn btn-margin"
      @click="changeAddPlaylistActivity"
    >
      Add Playlist
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Profile",
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "getUser",
      "isCreateRoomPopUpActive",
      "getPlaylists"
    ]),
    fullname() {
      return this.getUser.first_name + " " + this.getUser.last_name;
    }
  },
  methods: {
    ...mapActions([
      "fetchUser",
      "changeCreateRoomPopUpActivity",
      "changeAddPlaylistActivity",
      "fetchAllUserPlaylists",
      "deletePlaylist"
    ]),
    ...mapActions("data_upload", ["changeDataUploadStatus"]),
    async handleClick(id) {
      const res = await this.deletePlaylist(id);
      if (res.success) {
        this.fetchAllUserPlaylists();
      }
    }
  },
  created() {
    this.fetchUser();
    this.changeDataUploadStatus(true);
    if (!this.isLoggedIn) {
      alert("Not logged in");
      this.$router.push("/login");
    }
    this.fetchAllUserPlaylists();
  }
};
</script>

<style>
.create-room {
  background: var(--third-button-color);
  color: white;
  font-size: 20px;
}
.create-room:hover {
  background: var(--third-button-hover-color);
}

.btn-delete {
  background: var(--third-button-color);
  color: white;
}

.btn-delete:hover {
  background: var(--third-button-hover-color);
}
</style>
