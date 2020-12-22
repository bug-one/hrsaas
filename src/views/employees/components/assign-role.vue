<template>
  <el-dialog title="编辑角色" :visible="showRoleDialog" @close="btnCancel">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-button @click="btnCancel">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/settings'
import { getUserInfoById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean
    },
    userId: {
      type: String,
      default: null
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
    },
    async getUserInfoById(id) {
      const { roleIds } = await getUserInfoById(id)
      this.roleIds = roleIds
    },
    async confirm() {
      try {
        await assignRoles({ id: this.userId, roleIds: this.roleIds })
        this.$message.success('更新成功')
        this.$emit('update:showRoleDialog', false)
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>

</style>
