<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <router-link to="/">web终端</router-link>
        <router-link to="/file">文件上传</router-link>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  gap: 30px;
  align-items: center;
  height: 60px;
  background-color: rgb(88 88 255);
  color: #ffffff;
}
.main{
  width: 100%;
  height: calc(100vh - 80px);
}
</style>
