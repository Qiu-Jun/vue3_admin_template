<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-10-14 15:33:07
 * @LastEditors: June
 * @LastEditTime: 2023-10-14 16:14:46
-->
<template>
  <div>nest1-1</div>
</template>

<script lang="ts" setup>
onMounted(() => {
  console.log('nest1-2 mounted');
});

onActivated(() => {
  console.log('nest1-2 onActivated');
});
</script>
