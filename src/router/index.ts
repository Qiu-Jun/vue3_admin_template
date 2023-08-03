import { createRouter, createWebHashHistory } from 'vue-router';
import constantsRouter from './modules/constants';
import type { App } from 'vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantsRouter,
});

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Login'];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
};

export const setupRouter = (app: App<Element>) => app.use(router);

export default router;
