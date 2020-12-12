<template>
  <el-card class="tree-card">
    <!-- 用了一个行列布局 -->
    <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
      <el-col>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <!-- 两个内容 -->
          <el-col>负责人</el-col>
          <el-col>
            <!-- 下拉菜单 element -->
            <el-dropdown>
              <span>
                操作<i class="el-icon-arrow-down" />
              </span>
              <!-- 下拉菜单 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-tree :data="companyTree" :props="defaultProps" />
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      companyTree: [
        {
          name: '总裁办'
        },
        {
          name: '行政部'
        },
        {
          name: '财务部',
          children: [
            { name: '财务核算部' },
            { name: '税务管理部' }
          ]
        },
        {
          name: '技术部'
        }

      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  }
}
</script>

<style>

</style>
