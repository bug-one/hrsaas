<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
    <el-col>
      <span>{{ data.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ data.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">查看部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/department'
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean
    }
  },
  methods: {
    handleCommand(option) {
      if (option === 'del') {
        this.$confirm('此操作将永久删除该部门, 是否继续?', '小心点啊', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDepartments(this.data.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$emit('delDepartment')
          }).catch(() => {})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '你挽救了一个部门'
          })
        })
      }
      if (option === 'add') {
        this.$emit('addDepartment', this.data)
      }
    }
  }

}
</script>

<style>

</style>
