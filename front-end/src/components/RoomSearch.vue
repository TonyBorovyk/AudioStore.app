<template>
  <div class="room-search">
      <form action="" v-on:submit.prevent="SendSearch">
      <input
        type="search"
        placeholder="Search songs by name"
        name="search"
        id="search"
        v-model="searchRequest"
      />
      <button class="btn btn-search">
        <img src="../assets/icons/loupe.png" />
      </button>
    </form>
  </div>
</template>

<script>
export default {
    name: "RoomSearch",
  data() {
    return {
      searchRequest: ""
    };
  },
  methods: {
    SendSearch() {
      //type code here
      if (this.searchRequest == "") {
        return;
      }
      //fetch songs by name in vuex songs.js
      console.log(this.searchRequest);
    }
  }
}
</script>

<style lang="scss">
    .room-search{
        form {
    padding: 20px;
    #search {
      border: none;
      outline: none;
      background: rgb(133, 139, 139);
      color: white;
      padding: 10px 20px;
      border-radius: 16px;
      margin-right: 5px;
    }
    #search::placeholder {
      color: rgb(226, 224, 224);
    }
    .btn-search {
      background: var(--third-button-color);
      color: white;
      border-radius: 50%;
      img {
        height: 14px;
      }
    }
    .btn-search:hover {
      background: var(--third-button-hover-color);
    }
    }
    }
</style>