import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';
import { routes } from '@router/routes';
import { applicationStore } from '@stores/application.store';
import { Platform } from 'quasar';

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: Platform.is.electron ? createWebHashHistory() : createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const application = applicationStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (application.hasAccessToken) {
      next();
      return;
    }
    next('/credential');
  } else {
    next();
  }
});

export default router;
