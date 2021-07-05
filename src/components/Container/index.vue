<template>
  <div class="manage">
    <el-card class="box-card container">
      <slot />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.manage {
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 56px;
  .container {
    width: 98%;
    margin-top: 40px;
    padding: 10px;
    height: 98%;
    .pagination {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>>

