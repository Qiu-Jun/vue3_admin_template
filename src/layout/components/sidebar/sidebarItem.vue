<template>
    <template v-if="!item.hidden">
        <template
            v-if="
                hasOneShowingChild(item, item.children) &&
                (!onlyOneChild.state.children ||
                    onlyOneChild.state.noShowingChildren)
            "
        >
            <!-- 只有一项或者无 -->
            <side-link
                v-if="onlyOneChild.state.meta"
                :to="resolvePath(onlyOneChild.state.path)"
            >
                <el-menu-item
                    class="submenu-title-noDropdown"
                    :index="resolvePath(onlyOneChild.state.path)"
                >
                    <svg-icon
                        v-if="
                            onlyOneChild.state.meta.icon ||
                            (item.meta && item.meta.icon)
                        "
                        :name="
                            onlyOneChild.state.meta.icon ||
                            (item.meta && item.meta.icon)
                        "
                    />
                    <span>{{ onlyOneChild.state.meta.title }}</span>
                </el-menu-item>
            </side-link>
        </template>

        <el-sub-menu
            v-else
            :index="resolvePath(item.path)"
            popper-append-to-body
        >
            <template #title>
                <div v-if="item.meta" class="sub-el-icon">
                    <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                    <span v-show="!collapse">{{ item.meta.title }}</span>
                </div>
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :item="child"
                :base-path="resolvePath(child.path)"
            />
        </el-sub-menu>
    </template>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { isExternal } from '@/utils/validate.js'
import path from 'path-browserify'
import sideLink from './sideLink.vue'

export default defineComponent({
    name: 'sidebarItem',
    props: {
        item: {
            type: Object,
            required: true
        },
        collapse: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    components: { sideLink },
    setup(props) {
        const { item, basePath } = toRefs(props)
        const onlyOneChild = reactive({
            state: null
        })
        const hasOneShowingChild = (parent, children = []) => {
            const showingChildren = children.filter((i) => {
                if (i.hidden) {
                    return false
                }
                onlyOneChild.state = i
                return true
            })
            const len = showingChildren.length
            // 只有一个子路由
            if (len === 1) {
                return true
            }
            // 没有路由的情况
            if (!len) {
                onlyOneChild.state = {
                    ...parent,
                    path: '',
                    noShowingChildren: true
                }
                return true
            }
            return false
        }
        const resolvePath = (routePath) => {
            if (isExternal(routePath)) {
                return routePath
            }
            if (isExternal(basePath)) {
                return basePath
            }
            return path.join(basePath.value, routePath)
        }
        return {
            item,
            basePath,
            onlyOneChild,
            hasOneShowingChild,
            resolvePath
        }
    }
})
</script>

<style scoped>
.sub-el-icon {
    color: currentColor;
}
</style>
