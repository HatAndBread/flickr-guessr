import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Flickr from "@/views/Flickr.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/flickr-guessr",
    name: "Flickr",
    component: Flickr,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
