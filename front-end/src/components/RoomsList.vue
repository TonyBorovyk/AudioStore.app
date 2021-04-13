<template>
  <div class="list-margin list-container">
    <div class="list-item flex-row" v-for="room in rooms" :key="room.room_id">
      <router-link :to="`/rooms/${room.room_id}`"
        ><h3>{{ room.room_name }}</h3></router-link
      >
      <p>Users: {{ room.count_of_users }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomsList",
  props: ["rooms"]
};
</script>

<style></style>
