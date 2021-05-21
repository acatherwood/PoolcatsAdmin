import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/swimmers",
      name: "swimmers",
      component: () => import("./components/SwimmerList")
    },
    {
      path: "/swimmers/:id",
      name: "Swimmer-details",
      component: () => import("./components/Swimmer")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddSwimmer")
    }
  ]
});