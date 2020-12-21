<template>
  <el-dialog title="编辑角色" :visible="showRoleDialog">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-button>取消</el-button>
      <el-button type="primary">确认</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/settings'
export default {
  props: {
    showRoleDialog: {
      type: Boolean
    }
  },
  data() {
    return {
      roleIds: [],
      roleList: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList()
      this.roleList = rows
    }
  }
}
</script>

<style>

</style>
