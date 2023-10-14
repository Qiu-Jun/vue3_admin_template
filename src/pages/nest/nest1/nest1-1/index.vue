<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-10-14 15:32:38
 * @LastEditors: June
 * @LastEditTime: 2023-10-14 16:13:37
-->
<template>
  <div>nest1-1</div>
</template>

<script lang="ts" setup>
onMounted(() => {
  console.log('nest1-1 mounted');
});

onActivated(() => {
  console.log('nest1-1 onActivated');
});
</script>
