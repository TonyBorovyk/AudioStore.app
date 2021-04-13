<template>
  <div class="rooms-container">
    <h1>Rooms</h1>
    <RoomsList :rooms="rooms_temp" />
    <ButtonTenMore />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RoomsList from "@/components/RoomsList.vue";
import ButtonTenMore from "@/components/ButtonTenMore.vue";

export default {
  name: "Albums",
  data() {
    return {
      rooms_temp: [
        {
          room_id: 1,
          room_name: "Temp",
          count_of_users: 3
        }
      ]
    };
  },
  components: {
    RoomsList,
    ButtonTenMore
  },
  computed: {
    ...mapGetters(["getAlbums"])
  },
  methods: {
    ...mapActions(["fetchAllAlbums"])
  },
  created() {
    this.fetchAllAlbums();
  }
};
</script>
