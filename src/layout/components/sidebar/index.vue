<template>
  <el-scrollbar>
    <el-menu
      :default-active="currRoute.path"
      :collapse="!appStore.sidebar.opened"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"
      mode="vertical"
    >
      <SidebarItem
        v-for="route in menus"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="!appStore.sidebar.opened"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script name="SideBar" lang="ts" setup>
import { useRoute } from 'vue-router';
import SidebarItem from './SidebarItem.vue';
import { useAppStore, usePermissionStore } from '@/store';
import variables from '@/styles/variables.module.scss';

const permissionStore = usePermissionStore();
const appStore = useAppStore();
const currRoute = useRoute();
const menus = permissionStore.routes;
</script>
