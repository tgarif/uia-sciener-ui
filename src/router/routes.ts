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
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('Access-Token')) {
            next('/rent');
            return;
          } else {
            next();
          }
        },
      },
      {
        path: '/rent',
        component: () => import('@views/Rent.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/rent/:id',
        component: () => import('@views/RentDetails.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
          if (to.params.id) {
            next();
            return;
          } else {
            next('/rent');
          }
        },
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
      {
        path: '/rent',
        component: () => import('@views/Rent.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/rent/:id',
        component: () => import('@views/RentDetails.vue'),
        meta: { requiresAuth: true },
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
