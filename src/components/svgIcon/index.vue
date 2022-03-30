<!--
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-30 00:02:43
 * :Description:
-->
<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" :fill="color" />
    </svg>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: ''
    }
})
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
    if (props.name) return `svg-icon icon-${props.name}`
    return 'svg-icon'
})
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    position: relative;
    fill: currentColor;
    vertical-align: -2px;
}
</style>
