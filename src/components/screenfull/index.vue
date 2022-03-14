<template>
    <div @click.stop="handleClick">
        <svg-icon :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import screenfull from 'screenfull'
import { debounce } from '@/utils/common'

const isFullscreen = ref(false)
const handleClick = debounce(() => {
    if (!screenfull.isEnabled) return false
    return screenfull.toggle()
}, 300)
const change = () => {
    isFullscreen.value = screenfull.isFullscreen
}
const init = () => {
    if (screenfull.enabled) {
        screenfull.on('change', change)
    }
}
const destroy = () => {
    if (screenfull.enabled) {
        screenfull.off('change', change)
    }
}

onMounted(init)
onBeforeUnmount(destroy)
</script>

<style scoped>
.screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
}
</style>
