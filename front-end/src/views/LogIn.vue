<template>
  <div class="login-signup-container">
    <h1>Log in</h1>
    <div v-if="error" class="error-message">{{ error }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="input-block">
        <p class="form-field-title">Email</p>
        <input
          v-model.trim="email"
          class="form-field"
          :class="v$.email.$error ? 'invalid-input' : ''"
          type="text"
          name="email"
          placeholder="Email"
          id="email"
        />
        <p
          v-if="v$.email.$dirty && v$.email.required.$invalid"
          class="invalid-message"
        >
          Required field
        </p>
        <p
          v-if="v$.email.$dirty && v$.email.email.$invalid"
          class="invalid-message"
        >
          Shold be email: example "a@a.co"
        </p>
      </div>
      <div class="input-block">
        <p class="form-field-title">Password</p>
        <input
          v-model.trim="password"
          :type="show_password ? 'text' : 'password'"
          class="form-field"
          :class="v$.password.$error ? 'invalid-input' : ''"
          name="password"
          placeholder="Password"
          id="password"
        />
        <p
          v-if="v$.password.$dirty && v$.password.required.$invalid"
          class="invalid-message"
        >
          Required field
        </p>
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
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import ButtonSubmit from "@/components/ButtonSubmit.vue";

export default {
  name: "LogIn",
  setup() {
    return { v$: useVuelidate() };
  },
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
  validations() {
    return {
      email: { required, email },
      password: { required }
    };
  },
  methods: {
    ...mapActions(["changeLogInStatus", "fetchUser"]),
    ...mapActions("data_upload", ["changeDataUploadStatus"]),
    async handleSubmit() {
      this.v$.$touch();
      if (this.v$.$error) {
        return 0;
      }
      const data = {
        email: this.email,
        password: this.password
      };

      try {
        let response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(data)
        });
        if (response.status == 200) {
          response = await response.json();
          this.fetchUser();
          await this.$router.push("/");
          return;
        } else {
          response = await response.json();
          this.error = response.message;
          return 0;
        }
      } catch (e) {
        console.error(e);
        this.errer = "Invalid email or password";
      }
    }
  },
  created() {
    this.changeDataUploadStatus(true);
    if (this.isLoggedIn) {
      this.$router.push("/");
    }
  }
};
</script>
