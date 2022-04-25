import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@layouts/MainLayout.vue'),
    children: [
      { path: '/auth', component: () => import('@views/Index.vue'), alias: '' },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'notfound',
    redirect: '/auth',
  },
];
