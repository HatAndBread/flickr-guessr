<template>
  <div></div>
  <button @click="startGame">Start</button>
  <p>{{ currentTime }}</p>
  <div class="images-container">
    <Image
      v-for="(url, index) in imageUrls"
      :key="index"
      :src="url"
      alt="error!"
    />
  </div>
  {{ imageUrls }}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getPictures } from "./Flickr/getPictures";
import { getUrlString } from "./Flickr/getUrlString";
import Image from "@/components/Image.vue";
export default defineComponent({
  name: "Flickr",
  components: {
    Image,
  },
  setup() {
    let imageUrls = ref<string[]>([]);
    const currentTime = ref(0);
    const startGame = async () => {
      const pictures = await getPictures();
      console.log(pictures);
      const urls: string[] = [];
      while (urls.length < 5 && pictures.photos.photo.length > 4) {
        const item =
          pictures.photos.photo[
            Math.floor(Math.random() * pictures.photos.photo.length)
          ];
        urls.push(getUrlString(item, "s"));
      }
      imageUrls.value = urls;
      const interval = setInterval(() => {
        console.log(currentTime.value);
        if (currentTime.value < 10) {
          currentTime.value += 1;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    };
    return {
      currentTime,
      startGame,
      getPictures,
      imageUrls,
    };
  },
});
</script>

<style scoped></style>
