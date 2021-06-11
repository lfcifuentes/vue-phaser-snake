import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import GameMain from "../views/GameMain.vue";
import BestScores from "../views/BestScores.vue";
import store from "@/store";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresName: false,
      title: "Home",
    },
  },
  {
    path: "/game",
    name: "Game",
    component: GameMain,
    meta: {
      requiresName: true,
      title: "Snake game",
    },
  },
  {
    path: "/best-scores",
    name: "BestScores",
    component: BestScores,
    meta: {
      requireName: false,
      title: "Best Scores",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  if (nearestWithTitle) {
    document.title = `${nearestWithTitle.meta.title} - Phaser Test`;
  }

  if (to.matched.some((record) => record.meta.requiresName)) {
    if (store.state.user.Id == "") {
      next({
        path: "/",
      });
      return;
    }
  }
  next();
});

export default router;
