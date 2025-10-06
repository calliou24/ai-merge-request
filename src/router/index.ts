import { createRouter, createWebHistory } from "vue-router";
import ProcessWrapper from "../components/ProcessWrapper/ProcessWrapper.vue";

const routes = [
  {
    path: "/home",
    component: ProcessWrapper,
  },
  {
    path: "/",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
