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
        meta: { title: '首页', icon: 'shouye', affix: true, sort: '99.99' },
      },
    ],
    meta: {
      sort: '99',
    },
  },
];

export default constantsRouter;
