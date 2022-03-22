<!--
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-22 13:57:33
 * :Description:
-->
<template>
    <el-config-provider>
        <router-view />
    </el-config-provider>
</template>

<script>
document.title = import.meta.env.VITE_APP_TITLE
</script>
