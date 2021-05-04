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
  props: ["user_id"],
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
    ...mapActions(["changeAddPlaylistActivity"]),
    async handleSubmit() {
      this.v$.$touch();
      if (this.v$.$error) {
        return 0;
      }
      const data = {
        playlist_name: this.room_name,
        user_id: this.user_id
      };

      this.changeAddPlaylistActivity();
      console.log(data);
      //   try {
      //     let response = await fetch("http://localhost:3000/signup", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json"
      //       },
      //       body: JSON.stringify(data)
      //     });
      //     if (response.status == 201) {
      //       response = await response.json();
      //       this.$router.push("/login");
      //     } else {
      //       response = await response.json();
      //       if (response.message == "email exist") {
      //         this.email_exist = true;
      //       }
      //       if (response.message == "username exist") {
      //         this.username_exist = true;
      //       }
      //       return 0;
      //     }
      //   } catch (e) {
      //     console.log(e.message);
      //     return;
      //   }
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
