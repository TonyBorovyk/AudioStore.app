<template>
  <teleport to="#pop-up">
    <div class="pop-up">
      <div class="pop-up-content-container show-more">
        <button
          class="btn close-pop-btn btn-margin"
          @click="changeShowMorePopUpActivity"
        >
          <img src="../assets/icons/close.png" />
        </button>
        <div class="show-more-data">
          {{ data }}
        </div>
      </div>
    </div>
  </teleport>
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
.show-more {
  top: 50px !important;
  transform: translate(-50%, 0%) !important;
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
}
.show-more-data {
  color: var(--first-text-color);
}
</style>
