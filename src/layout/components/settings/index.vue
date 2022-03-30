<template>
    <div class="drawer-container">
        <div>
            <h3 class="drawer-title">页面设置</h3>

            <div class="drawer-item">
                <span>开启Tags-View</span>
                <el-switch v-model="tagsView" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>固定Header</span>
                <el-switch v-model="fixedHeader" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>显示logo</span>
                <el-switch v-model="sidebarLogo" class="drawer-switch" />
            </div>

            <div class="drawer-close">
                <el-button @click.stop="handleClose">关闭</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import useSettings from '@/store/modules/settings'

export default defineComponent({
    name: 'settings',
    setup() {
        const settings = useSettings()
        const tagsView = computed({
            get() {
                return settings.tagsView
            },
            set(val) {
                settings.changeSetting({
                    key: 'tagsView',
                    value: val
                })
            }
        })

        const fixedHeader = computed({
            get() {
                return settings.fixedHeader
            },
            set(val) {
                settings.changeSetting({
                    key: 'fixedHeader',
                    value: val
                })
            }
        })

        const sidebarLogo = computed({
            get() {
                return settings.sidebarLogo
            },
            set(val) {
                settings.changeSetting({
                    key: 'sidebarLogo',
                    value: val
                })
            }
        })

        const handleClose = () => {
            settings.changeSetting({
                key: 'showSettings',
                value: false
            })
        }

        return {
            tagsView,
            fixedHeader,
            sidebarLogo,
            handleClose
        }
    }
})
</script>

<style lang="scss" scoped>
.drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
    }

    .drawer-item {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        padding: 12px 0;
    }

    .drawer-close {
        text-align: center;
    }

    .drawer-switch {
        float: right;
    }
}
</style>
