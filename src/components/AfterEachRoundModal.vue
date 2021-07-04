<template>
  <div :class="`modal ${showAfterRoundModal ? 'fade-in' : 'fade-out'}`">
    <div class="modal-closer" @click="closeModalWithoutGoingToNextRound">
      X
    </div>
    <div class="modal-box">
      <p class="m" v-if="winMessage">
        {{ winMessage }}
      </p>
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
    winMessage: String || null,
    pointsThisRound: Number,
    distanceAway: String,
    closeAfterRoundModal: Function,
    activateNextRoundButton: Function,
    startGame: Function,
  },
  methods: {
    nextRound: function() {
      if (this.startGame && this.closeAfterRoundModal) {
        this.startGame();
        this.closeAfterRoundModal();
      }
    },
    closeModalWithoutGoingToNextRound: function() {
      if (this.closeAfterRoundModal && this.activateNextRoundButton) {
        this.closeAfterRoundModal();
        this.activateNextRoundButton();
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
