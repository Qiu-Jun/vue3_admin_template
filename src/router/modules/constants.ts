/*
 * @Author: June
 * @Description:
 * @Date: 2023-10-14 13:34:39
 * @LastEditors: June
 * @LastEditTime: 2023-10-14 15:37:54
 */
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
      },
    ],
  },
  {
    path: '/nest',
    meta: { title: 'nest' },
    component: Layout,
    redirect: '/nest/nest1-1',
    children: [
      {
        path: '/nest/nest1-1',
        name: 'N1',
        component: () => import('@/pages/nest/nest1/nest1-1/index.vue'),
        meta: { title: 'nest1-1', icon: 'edit' },
      },
      {
        path: '/nest/nest1-2',
        name: 'N2',
        component: () => import('@/pages/nest/nest1/nest1-2/index.vue'),
        meta: { title: 'nest1-2', icon: 'edit' },
      },
    ],
  },
  {
    path: '/test',
    name: 'Test',
    component: Layout,
    children: [
      {
        path: 'test/1',
        name: 'DD',
        component: () => import('@/pages/test/index.vue'),
        meta: { title: 'test', icon: 'edit' },
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
