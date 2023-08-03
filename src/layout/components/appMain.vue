<template>
  <section w-full relative class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="default">
        <keep-alive>
          <component :is="Component" :key="route.path" class="app-main" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  overflow: hidden;
}
</style>
