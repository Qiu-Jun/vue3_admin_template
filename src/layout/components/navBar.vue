<template>
    <div class="navbar">
        <hamburger
            id="hamburger-container"
            :is-active="opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
        />

        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

        <div class="right-menu">
            <template v-if="'mobile' !== device">
                <!-- <search id="header-search" class="right-menu-item" /> -->

                <screenfull
                    id="screenfull"
                    class="right-menu-item hover-effect"
                />
            </template>

            <el-dropdown
                class="avatar-container right-menu-item hover-effect"
                trigger="click"
            >
                <div class="avatar-wrapper">
                    <img
                        :src="
                            avatar ||
                            'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
                        "
                        class="user-avatar"
                    />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <router-link to="/">
                            <el-dropdown-item>面板</el-dropdown-item>
                        </router-link>
                        <el-dropdown-item @click.stop="handleSettings">
                            设置
                        </el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, toRef } from 'vue'
import hamburger from '@/components/hamburger/index.vue'
import breadcrumb from '@/components/breadcrumb/index.vue'
import screenfull from '@/components/screenfull/index.vue'
import useApp from '@/store/modules/app'
import { debounce } from '@/utils/common'
import useSettings from '@/store/modules/settings'
import useUser from '@/store/modules/user'

export default defineComponent({
    name: 'sideNavbar',
    components: {
        hamburger,
        breadcrumb,
        screenfull
    },
    setup() {
        const app = useApp()
        const opened = toRef(app.sidebar, 'opened')
        const device = toRef(app, 'device')

        const toggleSideBar = debounce(() => {
            app.toggleSideBar()
        }, 250)

        const settings = useSettings()
        const handleSettings = debounce(() => {
            settings.changeSetting({
                key: 'showSettings',
                value: true
            })
        }, 250)
        const avatar = ref(null)

        const userStore = useUser()
        const handleLogout = debounce(() => {
            userStore.logout()
        }, 300)

        return {
            device,
            opened,
            toggleSideBar,
            avatar,
            handleSettings,
            handleLogout
        }
    }
})
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 20px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 32px;
                    height: 32px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
