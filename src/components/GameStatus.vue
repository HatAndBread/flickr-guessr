<template>
  <div class="game-status-container">
    <div class="GameStatus">
      <div :class="`lives-container b l br`">
        <div class="label">Chances remaining</div>
        <Hearts :lives="lives" />
      </div>
      <div class="round-number b br">
        <div class="label">Round</div>
        {{ roundNumber }}/5
      </div>
      <div class="time-display-container b br">
        <div class="label">Time</div>
        {{ currentTime && currentTime > 0 ? currentTime.toFixed(1) : "--" }}
      </div>
      <div class="distance-away b br">
        <div class="label">Distance</div>
        {{ distanceAway ? parseInt(distanceAway).toLocaleString() : "-- " }} km
      </div>
      <div :class="`total-points b r`">
        <div class="label">Points</div>
        <span v-if="points">
          {{
            roundStarted && typeof countryBonus === "number"
              ? (points + countryBonus).toLocaleString()
              : points.toLocaleString()
          }}
        </span>
        <span v-else>0</span>
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
    points: Number,
    countryBonus: Number,
    roundStarted: Boolean,
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
  margin: 0px 32px;
  border-radius: 8px;
}
.b {
  flex-grow: 1;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  padding: 8px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.l {
  border-top-left-radius: 8px;
}
.r {
  border-top-right-radius: 8px;
}
.br {
  border-right-style: none;
}
.label {
  text-decoration: underline;
  white-space: nowrap;
}

@media only screen and (max-width: 700px) {
  .b {
    padding: 4px;
    font-size: 14px;
  }
}
@media only screen and (max-width: 350px) {
  .GameStatus {
    margin: 0px 16px;
    padding: 0px;
  }
  .b {
    padding: 8px 0px;
  }
}
</style>
