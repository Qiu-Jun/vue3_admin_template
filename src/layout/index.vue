<template>
    <div :class="classObj" class="app-wrapper clearfix">
        <side-bar class="sidebar-container" />

        <div :class="{ hasTagsView: needTagsView }" class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <nav-bar />
                <tags-view v-if="needTagsView" />
            </div>
            <app-main />
            <right-panel>
                <settings />
            </right-panel>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import rightPanel from '@/components/rightPanel/index.vue'
import sideBar from './components/sidebar/index.vue'
import navBar from './components/navBar.vue'
import settings from './components/settings/index.vue'
import tagsView from './components/tagsView/index.vue'
import appMain from './components/AppMain.vue'

export default defineComponent({
    name: 'Layout',
    components: {
        sideBar,
        appMain,
        navBar,
        tagsView,
        rightPanel,
        settings
    },
    setup() {
        const store = useStore()
        const { sidebar, device } = store.getters
        const classObj = computed(() => ({
            hideSidebar: !sidebar.opened,
            openSidebar: sidebar.opened,
            withoutAnimation: sidebar.withoutAnimation,
            mobile: device === 'mobile'
        }))

        const {
            showSettings,
            fixedHeader,
            tagsView: needTagsView
        } = toRefs(store.state.settings)
        return {
            classObj,
            showSettings,
            fixedHeader,
            needTagsView
        }
    }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
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
</style>
