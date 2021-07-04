<template>
  <div class="result-summary" v-if="allRoundsResults">
    <div v-for="(result, index) in allRoundsResults" :key="index">
      Round
      {{ index + 1 }}:
      {{ result.toLocaleString() }}
      points
    </div>
    <div>
      Total:
      <span v-if="points">
        {{ points.toLocaleString() }}
      </span>
      <span v-else>0</span>
      points
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    points: Number,
    allRoundsResults: Array as PropType<number[]>,
  },
});
</script>

<style scoped>
.result-summary {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Amatic SC", monospace;
  font-size: 24px;
  font-weight: 900;
  text-align: left;
}
</style>
