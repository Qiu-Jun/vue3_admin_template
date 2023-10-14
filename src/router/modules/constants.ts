/*
 * @Author: June
 * @Description:
 * @Date: 2023-10-14 13:34:39
 * @LastEditors: June
 * @LastEditTime: 2023-10-14 16:32:32
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
    redirect: '/nest/nest1',
    children: [
      {
        path: '/nest/nest1',
        name: 'Nest1',
        meta: { title: 'nest1' },
        children: [
          {
            path: '/nest/nest1/nest1-1',
            name: 'N1-1',
            component: () => import('@/pages/nest/nest1/nest1-1/index.vue'),
            meta: { title: 'nest1-1', icon: 'edit' },
          },
          {
            path: '/nest/nest1/nest1-2',
            name: 'N1-2',
            component: () => import('@/pages/nest/nest1/nest1-2/index.vue'),
            meta: { title: 'nest1-2', icon: 'edit', keepAlive: false },
          },
        ],
      },
      {
        path: '/nest/nest2',
        name: 'N2',
        component: () => import('@/pages/nest/nest2/index.vue'),
        meta: { title: 'nest2', icon: 'edit', keepAlive: true },
      },
    ],
  },
  {
    path: '/test',
    name: 'T',
    component: Layout,
    children: [
      {
        path: 'test/1',
        name: 'Test',
        component: () => import('@/pages/test/index.vue'),
        meta: { title: 'test', icon: 'edit', keepAlive: true },
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
