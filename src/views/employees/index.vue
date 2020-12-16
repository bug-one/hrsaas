<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools>
        <span slot="before">共66条数据</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </pageTools>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
