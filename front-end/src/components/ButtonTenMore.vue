<template>
  <button class="btn btn-ten-more" @click="AskMore">Show More</button>
</template>

<script>
export default {
  name: "ButtonTenMore",
  props: ["AskMore"]
};
</script>

<style>
.btn-ten-more {
  height: 50px;
  width: 150px;
  color: white;
  background-color: var(--second-button-color);
  margin: 20px;
}
.btn-ten-more:hover {
  background: var(--second-button-hover-color);
}
</style>
