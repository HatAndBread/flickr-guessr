<template>
  <div :class="`modal ${showAfterGameModal ? 'fade-in' : 'fade-out'}`">
    <div class="modal-closer" @click="closeModal">
      X
    </div>
    <div class="modal-box">
      <p class="m" v-if="winMessage">
        {{ winMessage }}
      </p>
      <h3>Final Results</h3>
      <result-summary :points="points" :allRoundsResults="allRoundsResults" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ResultSummary from "@/components/ResultSummary.vue";
export default defineComponent({
  components: {
    ResultSummary,
  },
  props: {
    showAfterGameModal: Boolean,
    winMessage: String || null,
    points: Number,
    closeModal: Function,
    allRoundsResults: Array as PropType<number[]>,
  },
});
</script>

<style scoped>
.modal-box {
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  min-width: 250px;
  min-height: 180px;
  padding: 8px;
  box-shadow: darkgray 0px 0px 2px 2px;
}
.m {
  margin: 8px;
}
h3 {
  text-decoration: underline;
}
.modal {
  transition: 0.3s;
}
.fade-in {
  opacity: 1;
  pointer-events: all;
}
.fade-out {
  opacity: 0;
  pointer-events: none;
}
</style>
