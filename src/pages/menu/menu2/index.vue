<template>
    <el-card>菜单2</el-card>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
    name: 'Menu2',
    setup() {
        onMounted(() => {
            console.log(33)
        })
    }
})
</script>
