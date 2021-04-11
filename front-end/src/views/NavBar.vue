<template>
  <div class="nav-bar-container">
    <div class="nav-bar-logo small">
      <router-link to="/">
        <h3>A</h3>
        <p class="hidden">AudioStore.app</p>
      </router-link>
    </div>
    <ul>
      <li v-if="isLoggedIn">
        <router-link to="/profile"
          ><img src="../assets/icons/user.png" />
          <p class="hidden">Username</p></router-link
        >
      </li>
      <li v-if="!isLoggedIn">
        <router-link to="/"
          ><img src="../assets/icons/user.png" />
          <p class="hidden">Home</p></router-link
        >
      </li>
      <li>
        <router-link to="/songs"
          ><img src="../assets/icons/user.png" />
          <p class="hidden">Songs</p></router-link
        >
      </li>
      <li>
        <router-link to="/artists"
          ><img src="../assets/icons/user.png" />
          <p class="hidden">Artists</p></router-link
        >
      </li>
      <li>
        <router-link to="/albums"
          ><img src="../assets/icons/user.png" />
          <p class="hidden">Albums</p></router-link
        >
      </li>
      <li>
        <router-link to="/rooms"
          ><img src="../assets/icons/user.png" />
          <p class="hidden">Rooms</p></router-link
        >
      </li>
    </ul>
    <div class="nav-bar-login">
      <router-link to="/login" v-if="!isLoggedIn"
        ><img src="../assets/icons/user.png" />
        <p class="hidden">Log In</p></router-link
      >
      <div class="log-out-block" v-if="isLoggedIn" @click="changeLogInStatus">
        <img src="../assets/icons/user.png" />
        <p class="hidden">Log Out</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapActions(["changeLogInStatus"])
  }
};
</script>

<style></style>
