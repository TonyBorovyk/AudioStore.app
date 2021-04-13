<template>
  <div class="show-more pop-up">
    <div class="close-show-more" @click="changeShowMorePopUpActivity">
      <img src="../assets/logo.png" />
    </div>
    <div class="show-more-data">
      {{ data }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ShowMorePopUp",
  props: ["data"],
  methods: {
    ...mapActions(["changeShowMorePopUpActivity"])
  }
};
</script>

<style></style>
