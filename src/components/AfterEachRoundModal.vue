<template>
  <div class="modal" v-if="showAfterRoundModal">
    <div class="modal-box">
      <div class="m">
        Points this round:
        {{ pointsThisRound && pointsThisRound.toLocaleString() }}
      </div>
      <div class="m" v-if="distanceAway">
        Distance Away: {{ parseInt(distanceAway).toLocaleString() }} km
      </div>
      <button @click="nextRound">Next Round</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    showAfterRoundModal: Boolean,
    pointsThisRound: Number,
    distanceAway: String,
    closeAfterRoundModal: Function,
    startGame: Function,
  },
  methods: {
    nextRound: function() {
      console.log("fuck");
      if (this.startGame && this.closeAfterRoundModal) {
        this.startGame();
        this.closeAfterRoundModal();
      }
    },
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
</style>
