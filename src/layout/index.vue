<template>
  <div class="app-wrapper" :class="classObj">
    <!-- 侧边栏 -->
    <SideBar class="sidebar-container" />

    <div :class="{ hasTagsView: showTagsViews }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <TagsView v-if="showTagsViews" />
      </div>

      <!--主页面-->
      <AppMain />
    </div>
  </div>
</template>

<script name="Layout" lang="ts" setup>
import { AppMain, SideBar, Navbar, TagsView } from './components';
import { useAppStore } from '@/store';

const appStore = useAppStore();
const showTagsViews = computed(() => appStore.showTagsViews);
const fixedHeader = computed(() => appStore.fixedHeader);
const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened,
  openSidebar: appStore.sidebar.opened,
  withoutAnimation: appStore.sidebar.withoutAnimation,
  mobile: appStore.device === 'mobile',
}));
</script>

<style lang="scss" scoped>
.app-wrapper {
  &::after {
    display: table;
    clear: both;
    content: '';
  }

  position: relative;
  width: 100%;
  height: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}
</style>
