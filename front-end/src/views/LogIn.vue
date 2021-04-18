<template>
  <div class="login-signup-container">
    <h1>Log in</h1>
    <div v-if="error" class="error-message">{{ error }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="input-block">
        <p class="form-field-title">Email</p>
        <input
          v-model="email"
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
          v-model="password"
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
  data() {
    return {
      email: "",
      password: "",
      error: "",
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
    ...mapActions(["changeLogInStatus"]),
    async handleSubmit() {
      const data = {
        email: this.email,
        password: this.password
      };
      console.log(data);
      this.changeLogInStatus();

      // try{
      // const response = await fetch('http://localhost:3000/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // }).then(res => { return res.json()})

      //localStorage.setItem('token', token);
      this.$router.push("/");
      // } catch(e){
      // this.errer = "Invalid email or password";
      // }
    }
  }
};
</script>
