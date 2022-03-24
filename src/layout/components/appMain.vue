<!--
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-24 17:28:40
 * :Description:
-->
<template>
    <section class="app-main">
        <router-view v-slot="{ Component, route }">
            <transition name="fade-transform" mode="out-in">
                <keep-alive :include="cachedViews" :max="10">
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
            </transition>
        </router-view>
    </section>
</template>

<script>
import { computed, defineComponent } from 'vue'
import useTagsViews from '@/store/modules/tagsView'

export default defineComponent({
    name: 'appMain',
    setup() {
        const tagsViews = useTagsViews()
        const cachedViews = computed(() => tagsViews.cachedViews)
        return {
            cachedViews
        }
    }
})
</script>

<style lang="scss" scoped>
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}

.fixed-header + .app-main {
    padding-top: 50px;
}

.hasTagsView {
    .app-main {
        /* 84 = navbar + tags-view = 50 + 34 */
        min-height: calc(100vh - 84px);
    }

    .fixed-header + .app-main {
        padding-top: 84px;
    }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
