import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/layout",
    component: () => import("./layout/layout.vue"),
    children: [
      {
        path: "/home",
        component: () => import("./pages/home.vue"),
      },
      {
        path: "/customerService",
        component: () => import("./pages/customerService.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
