<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色名称" name="role">
            <el-row type="flex" align="middle" style="height: 60px">
              <el-col>
                <el-button size="small" type="primary">新增角色</el-button>
              </el-col>
            </el-row>
            <el-table :data="roleList" style="width: 100%">
              <el-table-column prop="date" label="序号" />
              <el-table-column prop="name" label="角色名" />
              <el-table-column prop="address" label="描述" />
              <el-table-column label="操作">
                编辑角色 | 删除角色
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end" align="middle" style="height: 60px;">
              <el-pagination
                layout="prev, pager, next"
                :total="50"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="company">公司信息</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'role',
      roleList: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style>

</style>
