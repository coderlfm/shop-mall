import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/product-detail/index.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search/index.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/index.vue'),
    children: [
      {
        path: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/user/profile/index.vue'),
      },
      {
        path: 'info',
        component: () => import(/* webpackChunkName: "info" */ '../views/user/info/index.vue'),
      },
      {
        path: 'address',
        component: () => import(/* webpackChunkName: "address" */ '../views/user/address/index.vue'),
      },
      {
        path: 'order',
        component: () => import(/* webpackChunkName: "order" */ '../views/user/order/index.vue'),
      },
    ],
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/cart/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
