<template>
  <div class="main-wrapper">
    <router-link to="/signup">
      <h1 class="sign-up-link">SignUp</h1>
    </router-link>
    <h1>Recently Added</h1>
    <BaseSongsGridContainer :songs="getSongs" />
  </div>
</template>

<script>
// @ is an alias to /src
import BaseSongsGridContainer from "@/components/BaseSongsGridContainer.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    BaseSongsGridContainer
  },
  computed: {
    ...mapGetters(["getSongs"])
  },
  methods: {
    ...mapActions(["fetchRecAddedSongs"])
  },
  created() {
    this.fetchRecAddedSongs();
  }
};
</script>
