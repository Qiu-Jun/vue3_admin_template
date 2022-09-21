<!--
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-24 17:38:22
 * :Description:
-->
<template>
    <el-card> 控制面板 </el-card>
</template>

<script>
import { defineComponent, onMounted, reactive, toRaw } from 'vue'
import { userInfo } from '@/apis/user.js'
import { exchangeArrPos } from '@/utils/common'

export default defineComponent({
    name: 'Dashboard',
    setup() {
        onMounted(() => {
            console.log('home')
            userInfo()
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => console.log(err))
        })

        const arr = reactive([{ a: 1 }, { a: 2 }, { a: 3 }])
        console.log(toRaw(arr))

        const newArr = exchangeArrPos.call(toRaw(arr), 2, 1)
        console.log(newArr)
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    width: 750rem;
    height: 100px;
    background: red;
    .inner {
        width: 50px;
        height: 50px;
    }
}
</style>
