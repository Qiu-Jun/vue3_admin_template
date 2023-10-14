<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-10-14 15:33:17
 * @LastEditors: June
 * @LastEditTime: 2023-10-14 16:26:22
-->
<template>
  <div>nest2</div>
</template>

<script name="N2" lang="ts" setup>
onMounted(() => {
  console.log('nest2 mounted');
});

onActivated(() => {
  console.log('nest1-1 onActivated');
});
</script>
