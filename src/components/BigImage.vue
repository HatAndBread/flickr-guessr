<template>
  <div>
    <img
      ref="bigImage"
      :src="src"
      alt="Error loading image. Sorry 😔"
      class="large-image"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
      @mousemove="moveMagPos"
      @touchmove="handleTouchMove"
      @touchstart="handleTouchDown"
      @touchend="handleMouseUp"
      :draggable="false"
    />
    <div
      class="magnified"
      v-show="magnifiedOpen"
      ref="magnifiedDiv"
      :style="magnifiedStyle"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import magCursor from "@/assets/magnifying-glass.png";

export default defineComponent({
  props: {
    src: String,
  },
  data(): {
    magnifiedOpen: boolean;
    magOffsetX: number;
    magOffsetY: number;
    magnifiedStyle: { "background-image": string };
  } {
    return {
      magnifiedOpen: false,
      magOffsetX: 0,
      magOffsetY: 0,
      magnifiedStyle: {
        "background-image": this.src ? `url(${this.src})` : "",
      },
    };
  },
  methods: {
    moveMagPos: function(e: MouseEvent) {
      if (this.magnifiedOpen) {
        const big = this.$refs.bigImage as HTMLImageElement;
        const mag = this.$refs.magnifiedDiv as HTMLDivElement;
        big.style.cursor = "none";
        mag.style.backgroundPositionX = `${(e.offsetX * -2470) / big.width}px`;
        mag.style.backgroundPositionY = `${(e.offsetY * -2470) / big.width}px`;
        mag.style.left = `${e.x - 130}px`;
        mag.style.top = `${e.y - 130}px`;
      }
    },
    handleMouseDown: function(e: MouseEvent) {
      this.magnifiedOpen = true;
      this.moveMagPos(e);
    },
    handleTouchMove: function(e: TouchEvent) {
      const big = this.$refs.bigImage as HTMLImageElement;
      const mag = this.$refs.magnifiedDiv as HTMLDivElement;
      big.style.cursor = "none";
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      mag.style.backgroundPositionX = `${((big.getBoundingClientRect().left -
        x) *
        -1 *
        -2600) /
        big.width}px`;
      mag.style.backgroundPositionY = `${((big.getBoundingClientRect().top -
        y) *
        -1 *
        -2600) /
        big.width}px`;
      mag.style.left = `${x - 130}px`;
      mag.style.top = `${y - 130}px`;
    },
    handleTouchDown: function(e: TouchEvent) {
      this.magnifiedOpen = true;
      this.handleTouchMove(e);
    },
    handleMouseUp: function() {
      const big = this.$refs.bigImage as HTMLImageElement;
      this.magnifiedOpen = false;
      big.style.cursor = `url("${magCursor}"), auto`;
    },
  },
});
</script>

<style scoped>
.large-image {
  cursor: url("~@/assets/magnifying-glass.png"), auto;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.magnified {
  border-radius: 50%;
  position: fixed;
  width: 260px;
  height: 260px;
  overflow: hidden;
  pointer-events: none;
  touch-action: none;
  background-size: 1000%;
  background-repeat: no-repeat;
  box-shadow: rgba(60, 60, 60, 0.7) 1px 2px 2px 2px;
}
</style>
