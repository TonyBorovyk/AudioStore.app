<template>
  <div class="login-container">
    <h1>Log in</h1>
    <form @submit.prevent="changeLogInStatus">
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
          class="form-field"
          type="password"
          name="password"
          placeholder="Password"
          id="password"
        />
      </div>
      <ButtonSubmit :btn_text="'Log in'" />
    </form>
    <p>
      If not registered yet, please
      <router-link to="/signup">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ButtonSubmit from "@/components/ButtonSubmit.vue";

export default {
  name: "LogIn",
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

<style lang="scss">
.login-container {
  position: relative;
  max-width: 500px;
  left: 50%;
  transform: translate(-50%, 50%);
  margin: 0 20px 0 0px;
  form {
    .input-block {
      text-align: left;
      display: grid;
      grid-row-gap: 10px;
      margin: 20px 0;
      input {
        border: none;
        outline: none;
        background: white;
        color: black;
        padding: 10px 20px;
        border-radius: 16px;
        margin-right: 5px;
      }
    }
    .input-block:focus-within {
      color: white;
    }
  }
}
</style>
