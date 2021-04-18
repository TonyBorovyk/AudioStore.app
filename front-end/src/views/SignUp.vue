<template>
  <div class="login-signup-container">
    <h1>Sign up</h1>
    <form @submit.prevent="handleSubmit">
      <div class="input-block">
        <p class="form-field-title">Name</p>
        <input
          v-model="first_name"
          class="form-field"
          type="text"
          name="first_name"
          placeholder="Name"
        />
      </div>
      <div class="input-block">
        <p class="form-field-title">Surname</p>
        <input
          v-model="last_name"
          class="form-field"
          type="text"
          name="last_name"
          placeholder="Surname"
        />
      </div>
      <div class="input-block">
        <p class="form-field-title">Username</p>
        <input
          v-model="username"
          class="form-field"
          type="text"
          name="username"
          placeholder="Usename"
        />
      </div>
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
      <div class="input-block">
        <p class="form-field-title">Password confirmation</p>
        <input
          v-model="password_confirm"
          :type="show_password ? 'text' : 'password'"
          class="form-field"
          name="password_confirm"
          placeholder="Password confirmation"
          id="password_confirm"
        />
      </div>
      <div class="show-password-block">
        <input type="checkbox" id="show_password" v-model="show_password" />
        <label for="show_password">Show Password</label>
      </div>
      <ButtonSubmit :btn_text="'Sign up'" />
    </form>
    <p>
      If you are already registered, please
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
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      password_confirm: "",
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
    ...mapActions(["changeLogInStatus", "data_upload/changeDataUploadStatus"]),
    ...mapActions("data_upload", ["changeDataUploadStatus"]),
    handleSubmit() {
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        username: this.username,
        password: this.password,
        password_confirm: this.password_confirm
      };
      console.log(data);

      // fetch('http://localhost:3000/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // }).then(res => {
      //   console.log(res.json());
      // }).catch(error => {
      //   console.error(error);
      // });
      //this.$router.push('/login');
    }
  },
  created() {
    this.changeDataUploadStatus(true);
  }
};
</script>
