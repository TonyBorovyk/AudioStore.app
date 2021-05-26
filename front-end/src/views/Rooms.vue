<template>
  <div class="rooms-container">
    <h1>Rooms</h1>
    <h3 v-if="getRooms.length == 0">No rooms</h3>
    <RoomsList :rooms="getRooms" />
    <ButtonTenMore v-if="getTotalPages" :AskMore="moreRooms" />
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
    ...mapGetters(["getAlbums", "getRooms"]),
    ...mapGetters("page", ["getTotalPages"])
  },
  methods: {
    ...mapActions(["fetchRooms", "moreRooms"])
  },
  created() {
    this.fetchRooms();
  }
};
</script>
