<script setup>
import LayoutHeader from './header.vue';

</script>

<template>
  <div class="layout-container">
    <el-container>
      <el-header class="layout-header">
        <LayoutHeader></LayoutHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.layout-container {
  background-color: #f6f6f6;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden; /* 核心：强制禁止横向滚动 */
}

@media screen and (max-width: 768px) {
  .layout-header {
    padding: 0 5px; /* 手机端导航栏外边距极小化 */
  }
}

.layout-container :deep(.el-container) {
  background-color: #f6f6f6;
}

.layout-header {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 0 20px;
}

.layout-header :deep(.el-header) {
  background-color: #fff;
  height: 60px;
  padding: 0;
}

.layout-container :deep(.el-main) {
  background-color: #f6f6f6;
  padding: 0;
}
</style>
