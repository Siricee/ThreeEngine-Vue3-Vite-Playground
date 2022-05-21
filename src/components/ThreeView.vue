<template>
  <div class="three-canvas" ref="threeTarget"></div>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import { TEngine } from "../libs/TEngine";
import lightArray from "../libs/TLight";
import helperArray from "../libs/THelper";
import geometryArray from "../libs/TBasicObject";
import modelByCodeArray from "../libs/TCodeObject";
import { setController } from "../libs/TController";

import testObjects from "../libs/Ttest";

export default defineComponent({
  setup() {
    const threeTarget = ref(null);
    let TE: TEngine;
    onMounted(() => {
      TE = new TEngine(threeTarget.value!);
      // useful codes
      TE.addObjects(...lightArray);
      TE.addObjects(...helperArray);
      TE.addObjects(...geometryArray);
      // TE.addObjects(...modelByCodeArray);

      // for test codes
      // TE.addObjects(...testObjects);

      setController(TE);
      TE.render();
    });
    onBeforeUnmount(() => {
      TE.dispose();
    });
    return {
      threeTarget,
    };
  },
});
</script>
<style>
.three-canvas {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
