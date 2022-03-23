<!--
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-23 23:45:28
 * :Description:
-->
<template>
    <div class="app-wrapper" :class="{ 'has-logo': showLogo }">
        <logo v-if="showLogo" :collapse="!opened" />

        <el-scrollbar wrap-class="scrollbar-wrapper">
            <!-- 直接用了router 根据路由跳转 -->
            <el-menu
                :default-active="activeMenu"
                :collapse="!opened"
                :unique-opened="false"
                :collapse-transition="false"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#409eff"
                router
            >
                <sidebar-item
                    v-for="route in routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                    :collapse="!opened"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { computed, defineComponent, ref, toRef } from 'vue'
import { useRoute } from 'vue-router'
import useApp from '@/store/modules/app'
import usePermission from '@/store/modules/permission'
import useSettings from '@/store/modules/settings'
import sidebarItem from './sidebarItem.vue'
import Logo from './logo.vue'

export default defineComponent({
    name: 'sideBar',
    components: {
        sidebarItem,
        Logo
    },
    setup() {
        const app = useApp()
        const opened = toRef(app.sidebar, 'opened')

        const permission = usePermission()
        const routes = computed(() => permission.routes)

        // 刷新页面时 高亮当前路由
        const activeMenu = ref('/dashboard')
        const route = useRoute()
        const { path } = route
        activeMenu.value = path

        // 后面有空处理
        const settings = useSettings()
        const showLogo = computed(() => settings.sidebarLogo)

        return {
            opened,
            activeMenu,
            showLogo,
            routes
        }
    }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
    // @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
</style>
