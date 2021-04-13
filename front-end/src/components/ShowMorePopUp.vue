<template>
  <div class="background-visible pop-up">
    <div class="show-more-block">
      <button
        class="btn btn-pop-up btn-margin"
        @click="changeShowMorePopUpActivity"
      >
        <img src="../assets/icons/close.png" />
      </button>
      <div class="show-more-data">
        {{ data }}
      </div>
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

<style lang="scss">
.show-more-block {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  height: 80vh;
  background: var(--second-button-color);
  .btn-pop-up {
    width: 40px;
    border-radius: 50%;
    background: var(--first-button-color);
    img {
      height: 16px;
      width: 16px;
    }
  }
  .btn-pop-up:hover {
    background: var(--first-button-hover-color);
  }
  .show-more-data {
    color: var(--first-text-color);
  }
}
</style>
