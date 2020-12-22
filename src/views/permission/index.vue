<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template slot="before">
          <span>权限设置，请谨慎</span>
        </template>
        <template slot="after">
          <el-button>新增权限</el-button>
        </template>
      </PageTools>
      <el-card>
        <el-table border :data="permissionList" row-key="id">
          <el-table-column label="权限名称" prop="name" width="160px" />
          <el-table-column align="center" label="权限标识" prop="code" />
          <el-table-column align="center" label="权限描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template>
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getPermissionList } from '@/api/permission'
import { convertTreeData } from '@/utils'
export default {
  components: {
    PageTools
  },
  data() {
    return {
      permissionList: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const data = await getPermissionList()
      this.permissionList = convertTreeData(data, '0')
    }
  }
}
</script>

<style>

</style>
