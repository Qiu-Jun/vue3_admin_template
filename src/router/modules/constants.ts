import Layout from '@/layout/index.vue';
import { type RouteRecordRaw } from 'vue-router';

const constantsRouter: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/pages/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: '首页', icon: 'homepage', affix: true },
      },
      {
        path: '401',
        component: () => import('@/pages/error-page/401.vue'),
        meta: { hidden: true },
      },
      {
        path: '404',
        component: () => import('@/pages/error-page/404.vue'),
        meta: { hidden: true },
      },
    ],
  },
];

export default constantsRouter;
