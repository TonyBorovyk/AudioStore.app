<template>
  <teleport to="#pop-up" v-if="isCreateRoomPopUpActive">
    <div class="pop-up">
      <div class="pop-up-content-container">
        <button
          class="btn close-pop-btn btn-margin"
          @click="changeCreateRoomPopUpActivity"
        >
          <img src="../assets/icons/close.png" />
        </button>
        <form @submit.prevent="handleSubmit">
          <div class="input-block">
            <p class="form-field-title">Room name</p>
            <input
              v-model.trim="room_name"
              class="form-field"
              :class="v$.room_name.$error ? 'invalid-input' : ''"
              type="text"
              name="room_name"
              placeholder="Type room name"
              id="room_name"
            />
            <p
              v-if="v$.room_name.$dirty && v$.room_name.required.$invalid"
              class="invalid-message"
            >
              Required field
            </p>
            <p v-if="room_exist" class="invalid-message">Room already exist</p>
          </div>
          <ButtonSubmit :btn_text="'Create room'" />
        </form>
      </div>
    </div>
  </teleport>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import ButtonSubmit from "./ButtonSubmit.vue";

export default {
  name: "CreateRoomPopUp",
  components: {
    ButtonSubmit
  },
  props: ["username"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      room_name: "",
      room_exist: false
    };
  },
  validations() {
    return {
      room_name: { required }
    };
  },
  computed: {
    ...mapGetters(["isCreateRoomPopUpActive"])
  },
  methods: {
    ...mapActions(["changeCreateRoomPopUpActivity"]),
    async handleSubmit() {
      this.v$.$touch();
      if (this.v$.$error) {
        return 0;
      }
      const data = {
        room_name: this.room_name,
        username: this.username
      };

      this.changeCreateRoomPopUpActivity();
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
  }
};
</script>

<style lang="scss"></style>
