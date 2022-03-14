<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item
                v-for="(item, index) in levelList"
                :key="item.path"
            >
                <span
                    v-if="
                        item.redirect === 'noRedirect' ||
                        index === levelList.length - 1
                    "
                    class="no-redirect"
                >
                    {{ item.meta.title }}
                </span>
                <a v-else @click.prevent="handleLink(item)">{{
                    item.meta.title
                }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from '../../utils/common'

function isDashboard(route) {
    const name = route && route.name
    if (!name) return false
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

export default defineComponent({
    name: 'breadcrumb',
    setup() {
        const router = useRouter()

        const levelList = ref([])
        const getBreadcrumb = () => {
            let matched = router.currentRoute.value.matched.filter(
                (i) => i.meta && i.meta.title
            )
            const first = matched[0]
            if (!isDashboard(first)) {
                matched = [
                    { path: '/dashboard', meta: { title: '控制面板' } },
                    ...matched
                ]
            }
            levelList.value = [
                ...matched.filter(
                    (item) =>
                        item.meta &&
                        item.meta.title &&
                        item.meta.breadcrumb !== false
                )
            ]
        }

        // 监听路由变化更新breadcrumb
        watch(router.currentRoute, getBreadcrumb)

        const handleLink = debounce((item) => {
            const { redirect, path } = item
            if (redirect) {
                return router.push(redirect)
            }
            return router.push(path)
        }, 150)

        getBreadcrumb()
        return {
            levelList,
            handleLink
        }
    }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
