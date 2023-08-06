<template>
  <svg aria-hidden="true" class="svg-icon" :style="{ width, height }">
    <!-- xlink:href 是使用哪个svg的图标 fill是更改图标的颜色 -->

    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>
<script name="SvgIcon" lang="ts" setup>
defineProps({
  // xlink:href的属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 需要使用的svg的图标的名字
  name: {
    type: String,
    required: true,
  },
  // 需要使用的svg的图标的颜色
  color: {
    type: String,
    default: '',
  },
  // 需要使用的svg的图标的宽度
  width: {
    type: String,
    default: '1em',
  },
  // 需要使用的svg的图标的高度
  height: {
    type: String,
    default: '1em',
  },
});
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  outline: none;
  fill: currentcolor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
}
</style>
