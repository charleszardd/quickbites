import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { isLoggedIn } from '@/pages/AdminCMS/adminAuthServiceProvider/adminAuthService';

import NotFound from '@/pages/404.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { token } = isLoggedIn();
  const isAuthenticated = !!token;

  console.log('Current Path:', to.path);
  console.log('Token:', token);
  console.log('Is Authenticated:', isAuthenticated);

  const isAdminRoute = to.path.startsWith('/admincms');

  if (!isAuthenticated && isAdminRoute && to.path !== '/admincms') {
    return next('/admincms');
  }

  if (isAuthenticated && to.path === '/admincms') {
    return next('/admincms/dashboard');
  }

  next();
});

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
