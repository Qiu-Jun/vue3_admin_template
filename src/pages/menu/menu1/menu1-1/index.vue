<template>
    <el-card>menu1-1</el-card>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
    name: 'Menu1-1',
    setup() {
        onMounted(() => {
            console.log('menu1-1 onMounted')
        })
    }
})
</script>
