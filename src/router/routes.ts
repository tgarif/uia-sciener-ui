import { Platform } from 'quasar';
import { RouteRecordRaw } from 'vue-router';

const webRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@layouts/WebLayout.vue'),
    children: [
      {
        path: '/credential',
        component: () => import('@views/Credentials.vue'),
        alias: '',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'notfound',
    redirect: '/credential',
  },
];

const electronRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@layouts/ElectronLayout.vue'),
    children: [
      {
        path: '/credential',
        component: () => import('@views/Credentials.vue'),
        alias: '',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'notfound',
    redirect: '/credential',
  },
];

export const routes: RouteRecordRaw[] = Platform.is.electron
  ? electronRoutes
  : webRoutes;
