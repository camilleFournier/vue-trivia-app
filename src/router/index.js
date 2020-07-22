import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("../views/Home.vue");
const  Quizz = () => import("../views/Quizz.vue");
const Score = () => import("../views/Score.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/quizz",
    name: "Quizz",
    component: Quizz
  },
  {
    path: "/score",
    name: "Score",
    component: Score,
    beforeEnter: (to, from, next) => {
      if (from.name == "Quizz") {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: "*",
    name: "404",
    beforeEnter: (to, from, next) => { next('/') }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
