<template>
  <div class="search-box-container">
    <form action="" v-on:submit.prevent="SendSearch">
      <input type="search" name="search" id="search" v-model="searchRequest" />
      <button>Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "BaseSearch",
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
      console.log(this.searchRequest);
    }
  }
};
</script>

<style></style>
