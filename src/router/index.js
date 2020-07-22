import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/quizz",
    name: "Quizz",
    component: () => import("../views/Quizz.vue"),
  },
  {
    path: "/score",
    name: "Score",
    component: () => import("../views/Score.vue"),
    beforeEnter: (to, from, next) => {
      if (from.name == "Quizz") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "*",
    name: "404",
    beforeEnter: (to, from, next) => {
      next("/");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
