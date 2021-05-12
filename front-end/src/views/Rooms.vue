<template>
  <div class="rooms-container">
    <h1>Rooms</h1>
    <RoomsList :rooms="getRooms" />
    <ButtonTenMore :AskMore="moreRooms" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RoomsList from "@/components/RoomsList.vue";
import ButtonTenMore from "@/components/ButtonTenMore.vue";

export default {
  name: "Albums",
  components: {
    RoomsList,
    ButtonTenMore
  },
  computed: {
    ...mapGetters(["getAlbums", "getRooms"])
  },
  methods: {
    ...mapActions(["fetchRooms", "moreRooms"])
  },
  created() {
    this.fetchRooms();
  }
};
</script>
