<template>
  <div class="errPage-container">
    <el-button type="primary" @click="back"> 返回 </el-button>
    <el-row>
      <el-col :span="12">
        <h2>你没有权限去该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li>
            <router-link to="/home"> 回首页 </router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img src="@/assets/imgs/401_images/401.gif" width="313" height="428" />
      </el-col>
    </el-row>
  </div>
</template>

<script name="Page401" lang="ts" setup>
const router = useRouter();

const back = () => router.back();
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }
  }
}
</style>
