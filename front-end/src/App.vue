<template>
  <div class="wrapper">
    <NavBar />
    <div class="main-screen">
      <BaseSearch />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "@/views/NavBar.vue";
import BaseSearch from "@/components/BaseSearch.vue";

export default {
  components: {
    NavBar,
    BaseSearch
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --first-button-color: #4a4a4a;
  --first-button-hover-color: #5a5a5a;
  --second-button-color: #343d52;
  --second-button-hover-color: #40444e;
  --third-button-color: #858b8b;
  --third-button-hover-color: #737a7a;
  --first-text-color: #e2e0e0;
  --first-text-hover-color: #b4b0b0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #777f88;
  list-style: none;
  min-height: 100vh;
  background: #212e3a;
  .background-visible {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(128, 128, 128, 0.338);
    z-index: 110;
  }
  .login-signup-container {
    position: relative;
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
    form {
      p,
      label {
        user-select: none;
      }
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
      .show-password-block {
        text-align: left;
        label {
          margin-left: 10px;
        }
      }
    }
  }

  .btn-margin {
    margin: 10px;
  }
  a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    color: var(--first-text-color);
  }
  a.router-link-exact-active {
    color: #42b983;
  }
  .list-container {
    display: grid;
    align-items: center;
  }
  .main-screen {
    position: relative;
    min-height: 100vh;
    margin-left: 70px;
  }
  .list-margin {
    margin: 20px 40px;
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--second-button-color);
    margin-bottom: 10px;
    padding: 10px 20px;
    h3 {
      margin: 0;
    }
  }
  .items-container {
    width: 100%;
    grid-template-columns: repeat(auto-fill, 250px);
    justify-content: center;
  }
  .text {
    cursor: default;
  }
  .btn {
    border: none;
    outline: none;
    padding: 10px 10px;
    cursor: pointer;
  }
  h1 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .grid {
    display: grid;
  }
  .pop-up {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
