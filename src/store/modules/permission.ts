import { defineStore } from 'pinia';
import constantRouter from '@/router/modules/constants';
// import { getRolePermission } from '@/api/role';
// import type { RouteRecordRaw } from 'vue-router';

// import Layout from '@/layout/index.vue';

// 给RouteRecordRaw添加_id属性

//双星号是递归解释器遍历文件和文件夹的占位符或指令。它是一个简单的递归通配符，而只有一个星号表示全部没有递归
// const modules = import.meta.glob('../views/**/**.vue');
const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: constantRouter,
    permissions: [],
  }),
  actions: {
    async getAccessRoutes() {
      this.routes = constantRouter;
    },
  },
});

export default usePermissionStore;
