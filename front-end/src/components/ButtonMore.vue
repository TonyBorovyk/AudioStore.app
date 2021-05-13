<template>
  <router-link class="btn btn-more-link" :to="route">More</router-link>
</template>

<script>
export default {
  name: "ButtonMore",
  props: ["route"]
};
</script>

<style lang="scss">
.btn-more-link {
  background: var(--first-button-color);
  border-radius: 16px;
  margin: 10px;
  transition: 0.3s;
}
.btn-more-link:hover {
  background: var(--first-button-hover-color);
}
</style>
