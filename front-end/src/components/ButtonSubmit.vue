<template>
  <button class="btn btn-submit" type="submit">{{ btn_text }}</button>
</template>

<script>
export default {
  name: "ButtonSubmit",
  props: ["btn_text"]
};
</script>

<style>
.btn-submit {
  height: 50px;
  width: 150px;
  font-size: 20px;
  color: white;
  background-color: var(--third-button-color);
  margin: 20px;
}
.btn-submit:hover {
  background: var(--third-button-hover-color);
}
</style>
