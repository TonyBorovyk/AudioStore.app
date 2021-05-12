<template>
  <teleport to="#pop-up" v-if="isAddPlaylistActive">
    <div class="pop-up">
      <div class="pop-up-content-container" v-if="isLoggedIn">
        <button
          class="btn close-pop-btn btn-margin"
          @click="changeAddPlaylistActivity"
        >
          <img src="../assets/icons/close.png" />
        </button>
        <form @submit.prevent="handleSubmit">
          <div class="input-block">
            <p class="form-field-title">Playlist name</p>
            <input
              v-model.trim="playlist_name"
              class="form-field"
              :class="v$.playlist_name.$error ? 'invalid-input' : ''"
              type="text"
              name="playlist_name"
              placeholder="Type room name"
              id="playlist_name"
            />
            <p
              v-if="
                v$.playlist_name.$dirty && v$.playlist_name.required.$invalid
              "
              class="invalid-message"
            >
              Required field
            </p>
          </div>
          <ButtonSubmit :btn_text="'Add Playlist'" />
        </form>
      </div>
    </div>
  </teleport>
</template>

<script>
import ButtonSubmit from "./ButtonSubmit";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BaseSongItem",
  components: {
    ButtonSubmit
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      playlist_name: ""
    };
  },
  validations() {
    return {
      playlist_name: { required }
    };
  },
  methods: {
    ...mapActions([
      "changeAddPlaylistActivity",
      "createPlaylist",
      "fetchAllUserPlaylists"
    ]),
    async handleSubmit() {
      this.v$.$touch();
      if (this.v$.$error) {
        return 0;
      }
      const data = {
        playlist_title: this.playlist_name
      };
      await this.createPlaylist(data);
      this.fetchAllUserPlaylists();
      this.changeAddPlaylistActivity();
    }
  },
  computed: {
    ...mapGetters(["isAddPlaylistActive", "isLoggedIn", "getUser"])
  }
};
</script>

<style lang="scss">
.pop-up-playlist-container {
  .btn-playlist-pop-up {
    border-radius: 50%;
    background: var(--first-button-color);
    img {
      height: 16px;
      width: 16px;
      margin: 0;
    }
  }
  .btn-playlist-pop-up:hover {
    background: var(--first-button-color);
  }
}
</style>
