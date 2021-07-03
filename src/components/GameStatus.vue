<template>
  <div class="game-status-container">
    <div class="GameStatus">
      <div class="lives-container b l br">
        <div class="label">Lives</div>
        <Hearts :lives="lives" />
      </div>
      <div class="round-number b br">
        <div class="label">Round</div>
        {{ roundNumber ? roundNumber : "--" }}
      </div>
      <div class="time-display-container b br">
        <div class="label">Time</div>
        {{ currentTime && currentTime > 0 ? currentTime.toFixed(1) : "--" }}
      </div>
      <div class="distance-away b r">
        <div class="label">Distance</div>
        {{ distanceAway && parseInt(distanceAway).toLocaleString() }} km
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hearts from "./Hearts.vue";

export default defineComponent({
  components: {
    Hearts,
  },
  props: {
    lives: Number,
    roundNumber: Number,
    currentTime: Number,
    distanceAway: String,
  },
});
</script>

<style scoped>
.game-status-container {
  display: flex;
  width: 100%;
  margin-top: 16px;
  justify-content: center;
}
.GameStatus {
  display: flex;
  width: 100%;
  justify-content: center;
  font-family: "Amatic SC", monospace;
  font-size: 24px;
}
.b {
  border-style: solid;
  border-width: 1px;
  padding: 8px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.l {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.r {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.br {
  border-right-style: none;
}
.label {
  text-decoration: underline;
}
@media only screen and (max-width: 500px) {
  .b {
    padding: 4px;
    font-size: 16px;
  }
}
</style>
