<template>
  <div class="nav-bar-container" :class="small ? 'small' : ''">
    <div class="menu-toggle-container">
      <img
        src="../assets/icons/menu.png"
        v-if="small"
        @click="small = !small"
      />
      <img
        src="../assets/icons/cancel.png"
        v-if="!small"
        @click="small = !small"
      />
    </div>
    <div class="nav-bar-logo">
      <router-link to="/">
        <h3>A</h3>
        <p :class="small ? 'hidden' : ''">AudioStore.app</p>
      </router-link>
    </div>
    <ul class="main-routes-list">
      <li v-if="isLoggedIn">
        <router-link :to="'/profile/' + username"
          ><img src="../assets/icons/user.png" />
          <p :class="small ? 'hidden' : ''">{{ username }}</p></router-link
        >
      </li>
      <li v-if="!isLoggedIn">
        <router-link to="/"
          ><img src="../assets/icons/home.png" />
          <p :class="small ? 'hidden' : ''">Home</p></router-link
        >
      </li>
      <li>
        <router-link to="/songs"
          ><img src="../assets/icons/musical-note.png" />
          <p :class="small ? 'hidden' : ''">Songs</p></router-link
        >
      </li>
      <li>
        <router-link to="/artists"
          ><img src="../assets/icons/music-teacher.png" />
          <p :class="small ? 'hidden' : ''">Artists</p></router-link
        >
      </li>
      <li>
        <router-link to="/albums"
          ><img src="../assets/icons/music-album.png" />
          <p :class="small ? 'hidden' : ''">Albums</p></router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <router-link to="/rooms"
          ><img src="../assets/icons/group.png" />
          <p :class="small ? 'hidden' : ''">Rooms</p></router-link
        >
      </li>
      <li v-if="isLoggedIn" @click="changeCreateRoomPopUpActivity">
        <div class="add-room-block">
          <img src="../assets/icons/add-friend.png" />
          <p :class="small ? 'hidden' : ''">Add Room</p>
        </div>
      </li>
    </ul>
    <div class="nav-bar-login">
      <router-link to="/login" v-if="!isLoggedIn"
        ><img src="../assets/icons/login.png" />
        <p :class="small ? 'hidden' : ''">Log In</p></router-link
      >
      <div class="log-out-block" @click="handleClick" v-if="isLoggedIn">
        <img src="../assets/icons/logout.png" />
        <p :class="small ? 'hidden' : ''">Log Out</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      small: true,
      username: ""
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getUser", "isCreateRoomPopUpActive"])
  },
  methods: {
    ...mapActions([
      "changeLogInStatus",
      "changeCreateRoomPopUpActivity",
      "fetchUser"
    ]),
    async handleClick() {
      try {
        await fetch(`${process.env.VUE_APP_URL}/logout`, {
          method: "POST",
          credentials: "include"
        });
      } catch (e) {
        console.error(e);
      }
      this.changeLogInStatus(false);
      this.$router.push("/");
    }
  },
  watch: {
    $route() {
      this.small = true;
    },
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.fetchUser();
        this.username = this.getUser.username;
      }
    }
  },
  created() {
    this.fetchUser();
  }
};
</script>

<style lang="scss">
.nav-bar-container {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #343d52;
  width: 200px;
  transition: 0.5s;
  display: grid;
  padding: 40px 10px;
  text-align: left;
  .menu-toggle-container {
    margin-left: 10px;
    img {
      height: 30px;
      width: 30px;
    }
  }
  .nav-bar-logo {
    h3 {
      font-size: 26px;
      height: 45px;
      width: 45px;
      margin-right: 10px;
      border: solid 3px white;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
    }
  }
  .main-routes-list {
    a {
      margin-bottom: 20px;
    }
  }
  a,
  .log-out-block,
  .add-room-block {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  p {
    overflow: hidden;
    width: 115px;
    transition: 0.5s;
    white-space: nowrap;
  }
  p:hover,
  .log-out-block:hover {
    transition: 0.1s;
    color: var(--first-text-hover-color);
  }
  img {
    height: 40px;
    width: 40px;
    margin-right: 25px;
  }
  .hidden {
    width: 0;
  }
}
.nav-bar-container.small {
  width: 70px;
}
</style>
