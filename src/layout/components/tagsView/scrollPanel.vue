<!--
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-16 15:03:10
 * :Description:
-->
<template>
    <el-scrollbar
        ref="scrollContainer"
        class="scroll-container"
        @mousewheel.prevent="handleScroll"
    >
        <slot />
    </el-scrollbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { throttle } from '@/utils/common'

// const tagAndTagSpacing = 4
const scrollContainer = ref(null)
let scrollWrapper = null

onMounted(() => {
    scrollWrapper = scrollContainer.value.$refs.wrap$
})

const handleScroll = throttle((e) => {
    const eventDelta = e.wheelDelta || -e.deltaY * 40
    scrollWrapper.scrollLeft += eventDelta / 4
}, 150)
</script>

<style lang="scss" scoped>
.scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;

    :deep(.el-scrollbar__bar) {
        bottom: 0px;
    }
    :deep(.el-scrollbar__wrap) {
        height: 49px;
    }
}
</style>
