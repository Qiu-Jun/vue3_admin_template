<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <!-- 左侧面包屑 -->
    <div class="flex">
      <Hamburger
        :is-active="appStore.sidebar.opened"
        @toggle-click="toggleSideBar"
      />
      <Breadcrumb />
    </div>

    <!-- 右侧导航设置 -->
    <div class="flex">
      <!-- 导航栏设置(窄屏隐藏)-->
      <div v-if="device !== 'mobile'" class="setting-container">
        <!--全屏 -->
        <div class="setting-item" @click="toggle">
          <SvgIcon :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
        </div>
      </div>

      <!-- 用户头像 -->
      <el-dropdown trigger="click">
        <div class="avatar-container">
          <img :src="userStore.avatar + '?imageView2/1/w/80/h/80'" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/Qiu-Jun/vue3_admin_template.git"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>

            <el-dropdown-item divided @click="logout"> 退出 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script name="Navbar" lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useFullscreen } from '@vueuse/core';
import { useUserStore, useAppStore } from '@/store';
// import { useRoute, useRouter } from 'vue-router';
import Hamburger from './Hamburger/index.vue';
import Breadcrumb from './Breadcrumb/index.vue';

const appStore = useAppStore();
const userStore = useUserStore();

const { device } = storeToRefs(appStore); // 设备类型：desktop-宽屏设备 || mobile-窄屏设备

// const route = useRoute();
// const router = useRouter();

/**
 * 左侧菜单栏显示/隐藏
 */
function toggleSideBar() {
  appStore.toggleSidebar(true);
}

/**
 * vueUse 全屏
 */
const { isFullscreen, toggle } = useFullscreen();

/**
 * 注销
 */
function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    console.log('loginout');
    // userStore
    //   .logout()
    //   .then(() => {
    //     tagsViewStore.delAllViews();
    //   })
    //   .then(() => {
    //     router.push(`/login?redirect=${route.fullPath}`);
    //   });
  });
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 0 1px #0003;

  .setting-container {
    display: flex;
    align-items: center;

    .setting-item {
      display: inline-block;
      width: 30px;
      height: 50px;
      line-height: 50px;
      color: #5a5e66;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: rgb(249 250 251 / 100%);
      }
    }
  }

  .avatar-container {
    display: flex;
    align-items: center;
    justify-items: center;
    margin: 0 5px;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
  }
}
</style>
