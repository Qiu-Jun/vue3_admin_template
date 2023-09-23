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
        name: 'Home',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: '首页', icon: 'edit', affix: true },
        // children: [
        //   {
        //     path: '/t1',
        //     name: 'T1',
        //     meta: {
        //       title: 't1',
        //     },
        //     component: () => import('@/pages/error-page/401.vue'),
        //   },
        // ],
      },
    ],
  },
  {
    path: '/a',
    meta: { title: '2' },
    component: Layout,
    redirect: '/t/t1',
    children: [
      {
        path: '/t/t1',
        name: 'T1',
        component: () => import('@/pages/error-page/401.vue'),
        meta: { title: '首页1', icon: 'edit' },
      },
      {
        path: '/t2',
        name: 'T2',
        component: () => import('@/pages/test/index.vue'),
        meta: { title: '首页2', icon: 'edit' },
      },
    ],
  },
  {
    path: '/401',
    component: () => import('@/pages/error-page/401.vue'),
    meta: { hidden: true },
  },
  {
    path: '/404',
    component: () => import('@/pages/error-page/404.vue'),
    meta: { hidden: true },
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   redirect: '/404',
  // },
];

export default constantsRouter;
