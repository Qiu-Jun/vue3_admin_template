<template>
    <div class="login-container">
        <el-form :model="loginForm" class="login-form" label-position="right">
            <div class="title-container">
                <h3 class="title">June</h3>
            </div>

            <el-form-item>
                <span class="svg-container">
                    <svg-icon name="user" />
                </span>
                <el-input
                    v-model="loginForm.username"
                    placeholder="请输入用户名(admin or editor)"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>

            <el-tooltip content="目前无密码，随便输入" placement="right" manual>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon name="password" />
                    </span>
                    <el-input
                        :key="passwordType"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="请输入密码"
                        tabindex="2"
                        autocomplete="on"
                        @keyup="checkCapslock"
                        @keyup.enter="handleLogin"
                    />

                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>

            <el-button
                type="primary"
                style="width: 100%; margin-bottom: 30px; padding: 20px 0"
                @click.prevent="handleLogin"
                >登 录</el-button
            >
        </el-form>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userLogin } from '@/apis/user'
import { debounce } from '@/utils/common'
import { setToken } from '@/utils/auth'

export default defineComponent({
    name: 'login',

    setup() {
        const router = useRouter()
        const route = useRoute()
        const capsTooltip = ref(false)
        const passwordType = ref('password')

        const loginForm = reactive({
            username: '',
            password: ''
        })
        const loginRules = reactive({})

        // 密码显示隐藏
        const showPwd = () => {
            if (passwordType.value === 'password') {
                passwordType.value = ''
            } else {
                passwordType.value = 'password'
            }
        }

        const checkCapslock = debounce((e) => {
            const { key } = e
            capsTooltip.value = key && key.length === 1 && key >= 'A' && key <= 'Z'
        }, 300)

        // 登录
        const handleLogin = debounce(() => {
            userLogin(loginForm)
                .then(({ code, data }) => {
                    if (code === 200) {
                        setToken(data)
                        const { query } = route
                        router.push(query.redirect || '/')
                    }
                })
                .catch((err) => console.log(err))
        }, 250)

        return {
            capsTooltip,
            checkCapslock,
            passwordType,
            loginForm,
            loginRules,

            showPwd,
            handleLogin
        }
    }
})
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
    position: relative;
    min-height: 100vh;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
}
</style>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    height: 100vh;
    overflow: hidden;
    .el-input {
        display: inline-block;
        height: 47px;
        width: 83.5%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    position: relative;
    min-height: 100vh;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 520px;
        max-width: 100%;
        padding: 16px 35px 0;
        margin: 0 auto;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3);
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>
