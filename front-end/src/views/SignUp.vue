<template>
  <div class="login-signup-container">
    <h1>Sign up</h1>
    <form @submit.prevent="changeLogInStatus">
      <div class="input-block">
        <p class="form-field-title">Name</p>
        <input
          class="form-field"
          type="text"
          name="first_name"
          placeholder="Name"
        />
      </div>
      <div class="input-block">
        <p class="form-field-title">Surname</p>
        <input
          class="form-field"
          type="text"
          name="second_name"
          placeholder="Surname"
        />
      </div>
      <div class="input-block">
        <p class="form-field-title">Username</p>
        <input
          class="form-field"
          type="text"
          name="username"
          placeholder="Usename"
        />
      </div>
      <div class="input-block">
        <p class="form-field-title">Email</p>
        <input
          class="form-field"
          type="text"
          name="email"
          placeholder="Email"
          id="email"
        />
      </div>
      <div class="input-block">
        <p class="form-field-title">Password</p>
        <input
          :type="show_password ? 'text' : 'password'"
          class="form-field"
          name="password"
          placeholder="Password"
          id="password"
        />
      </div>
      <div class="show-password-block">
        <input type="checkbox" id="show_password" v-model="show_password" />
        <label for="show_password">Show Password</label>
      </div>
      <ButtonSubmit :btn_text="'Sign up'" />
    </form>
    <p>
      If registered, please
      <router-link to="/login">Log in</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ButtonSubmit from "@/components/ButtonSubmit.vue";

export default {
  name: "LogIn",
  data() {
    return {
      show_password: false
    };
  },
  components: {
    ButtonSubmit
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapActions(["changeLogInStatus"])
  }
};
</script>
