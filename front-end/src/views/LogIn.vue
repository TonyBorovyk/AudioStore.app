<template>
  <div class="login-container">
    <form @submit.prevent="changeLogInStatus">
      <div class="email-block">
        <p class="form-field-title">Email</p>
        <input
          class="form-field"
          type="text"
          name="email"
          placeholder="Email"
          id="email"
        />
      </div>
      <div class="password-block">
        <p class="form-field-title">Email</p>
        <input
          class="form-field"
          type="password"
          name="password"
          placeholder="Password"
          id="password"
        />
      </div>
      <button type="submit">Log in</button>
    </form>
    <p>
      If not registered yet, please
      <router-link to="/signup">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LogIn",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapActions(["changeLogInStatus"])
  }
};
</script>

<style></style>
