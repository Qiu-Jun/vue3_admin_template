<template>
    <div id="tags-view-container" class="tags-view-container clearfix">
        <scroll-panel ref="scrollPane" class="tags-view-wrapper">
            <router-link
                ref="tagItem"
                v-for="tag in visitedViews"
                :key="tag.path"
                :to="{
                    path: tag.path,
                    query: tag.query,
                    fullPath: tag.fullPath
                }"
                custom
                v-slot="{ href }"
            >
                <a
                    class="tags-view-item"
                    :class="isActive(tag) ? 'active' : ''"
                    :href="href"
                    >{{ tag.title }}
                    <span
                        v-if="!isAffix(tag)"
                        class="el-icon-close"
                        @click.prevent.stop="closeSelectedTag(tag)"
                        >x</span
                    ></a
                >
            </router-link>
        </scroll-panel>
        <ul class="tag-view-menu">
            <li @click="refreshSelectedTag(selectedTag)">刷新</li>
            <li @click="closeOthersTags">关闭其他</li>
            <li @click="closeAllTags(selectedTag)">关闭全部</li>
        </ul>
    </div>
</template>

<script>
import { computed, defineComponent, nextTick, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { debounce } from '@/utils/common'
import path from 'path-browserify'
import scrollPanel from './scrollPanel.vue'

function filterAffixTags(routes, basePath = '/') {
    let tags = []
    routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
            const tagPath = path.join(basePath, route.path)
            tags.push({
                fullPath: tagPath,
                path: tagPath,
                name: route.name,
                meta: { ...route.meta }
            })
        }
        if (route.children) {
            const tempTags = filterAffixTags(route.children, route.path)
            if (tempTags.length >= 1) {
                tags = [...tags, ...tempTags]
            }
        }
    })
    return tags
}

export default defineComponent({
    name: 'tagsViews',
    components: { scrollPanel },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()

        const selectedTag = computed(() => route)
        const visitedViews = computed(() => store.getters.visitedViews)
        const routes = computed(() => store.state.permission.routes)

        let affixTags = []
        const initTags = () => {
            affixTags = filterAffixTags(routes.value)
            for (const tag of affixTags) {
                if (tag.name) {
                    store.dispatch('tagsView/addVisitedView', tag)
                }
            }
        }

        const addTags = () => {
            const { name } = route
            if (name) {
                store.dispatch('tagsView/addView', route)
            }
            return false
        }

        // 监听路由的变化
        watch(() => route.path, addTags)

        const isAffix = (tag) => {
            return tag.meta && tag.meta.affix
        }

        const isActive = (r) => {
            return r.path === route.path
        }

        onMounted(() => {
            initTags()
            addTags()
        })

        const toLastView = (visitViews, view) => {
            const latestView = visitViews.slice(-1)[0]
            if (latestView) {
                router.push(latestView.fullPath)
            } else if (view.name === 'Dashboard') {
                router.replace({ path: `/redirect${view.fullPath}` })
            } else {
                router.push('/')
            }
        }
        // 关闭Tag
        const closeSelectedTag = debounce((view) => {
            store.dispatch('tagsView/delView', view).then((res) => {
                const visitViews = res.visitedViews
                if (isActive(view)) {
                    toLastView(visitViews, view)
                }
            })
        }, 250)

        // 刷新Tag
        const refreshSelectedTag = debounce((tag) => {
            store.dispatch('tagsView/delCachedView', tag).then(() => {
                const { fullPath } = tag
                nextTick(() => {
                    router.replace({
                        path: fullPath
                    })
                })
            })
        }, 250)

        // 关闭其他
        const closeOthersTags = () => {
            store.dispatch('tagsView/delOthersViews', selectedTag.value)
        }

        // 关闭全部
        const closeAllTags = (tag) => {
            store.dispatch('tagsView/delAllViews').then((res) => {
                const visitViews = res.visitedViews
                if (affixTags.some((v) => v.path === tag.path)) return
                toLastView(visitViews, tag)
            })
        }
        return {
            visitedViews,
            isAffix,
            isActive,
            closeSelectedTag,
            selectedTag,
            refreshSelectedTag,
            closeOthersTags,
            closeAllTags
        }
    }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags-view-wrapper {
        width: 76%;
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            user-select: none;
            text-decoration: none;
            .el-icon-close {
                display: inline-block;
                width: 16px;
                height: 16px;
                line-height: 16px;
                border-radius: 50%;
                text-align: center;
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                transform-origin: 100% 50%;
                &:before {
                    transform: scale(0.6);
                    display: inline-block;
                }
                &:hover {
                    background-color: #b4bccc;
                    color: #fff;
                }
            }
            &:first-of-type {
                margin-left: 15px;
            }
            &:last-of-type {
                margin-right: 15px;
            }
            &.active {
                background-color: #42b983;
                color: #fff;
                border-color: #42b983;
                &::before {
                    content: '';
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
        }
    }
    .tag-view-menu {
        width: 24%;
        list-style: none;
        margin: 0;
        overflow: hidden;
        li {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            user-select: none;
        }
    }
    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
</style>
