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
    <el-tree :data="companyTree" :props="defaultProps">
      <el-row slot-scope="scope" type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
        <el-col>
          <span>{{ scope.data.name }}</span>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end">
            <!-- 两个内容 -->
            <el-col>{{ scope.data.manager }}</el-col>
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
    </el-tree>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      companyTree: [
        {
          name: '总裁办',
          manager: '董明珠'
        },
        {
          name: '行政部',
          manager: '刘强东'
        },
        {
          name: '财务部',
          manager: '马云',
          children: [
            { name: '财务核算部' },
            { name: '税务管理部',
              manager: '马化腾'
            }
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
