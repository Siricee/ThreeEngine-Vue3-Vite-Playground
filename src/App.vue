<template>
  <ThreeView></ThreeView>
</template>

<script lang="ts">
import ThreeView from "./components/ThreeView.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ThreeView,
  },
});
</script>

<style>
  *{
    margin:0;
    padding:0;
  }
  html,body{
    width: 100%;
    height: 100%;
  }
  #app{
    width: 100%;
    height: 100%;
  }
</style>
