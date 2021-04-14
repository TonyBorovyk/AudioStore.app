<template>
  <div class="about">
    <h1>This is an about page</h1>
    <BasePlayer
      :song="getSongDetails"
      :song_exist="true"
      :autoplay="true"
      :list="true"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BasePlayer from "@/components/BasePlayer.vue";

export default {
  components: {
    BasePlayer
  },

  computed: {
    ...mapGetters(["getSongDetails"])
  },
  methods: {
    ...mapActions(["fetchSongDetails"])
  },
  created() {
    this.fetchSongDetails();
  }
};
</script>
