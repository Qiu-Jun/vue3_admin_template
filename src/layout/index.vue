<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <SideBar />

    <div :class="{ hasTagsView: true }" class="main-container">
      <div :class="{ 'fixed-header': false }">
        <!-- <navbar /> -->
        <!-- <tags-view v-if="showTagsView" /> -->
      </div>

      <!--主页面-->
      <AppMain />
    </div>
  </div>
</template>

<script name="Layout" lang="ts" setup>
import { AppMain, SideBar } from './components';
</script>

<style lang="scss" scoped></style>
