<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template slot="before">
          <span>权限设置，请谨慎</span>
        </template>
        <template slot="after">
          <el-button @click="addPermission(1,'0')">新增权限</el-button>
        </template>
      </PageTools>
      <el-card>
        <el-table border :data="permissionList" row-key="id" default-expand-all>
          <el-table-column label="权限名称" prop="name" width="160px" />
          <el-table-column align="center" label="权限标识" prop="code" />
          <el-table-column align="center" label="权限描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button v-if="row.type === 1" type="text" @click="addPermission(2,row.id)">添加</el-button>
              <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
              <el-button type="text" @click="delPermission(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
        <el-form label-width="80px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="激活状态">
            <el-switch
              v-model="formData.enVisible"
              active-color="#fa5298"
              inactive-color="#e4e4e4"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="btnConfirm">确认</el-button>
          <el-button @click="btnCancel">取消</el-button>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getPermissionList, addPermission, getPermissionDetail, updatePermission, delPermission } from '@/api/permission'
import { convertTreeData } from '@/utils'
export default {
  components: {
    PageTools
  },
  data() {
    return {
      permissionList: [],
      showDialog: false,
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: '',
        type: '',
        pid: ''
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑权限' : '增加权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const data = await getPermissionList()
      this.permissionList = convertTreeData(data, '0')
    },
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    async btnConfirm() {
      try {
        if (this.formData.id) {
          await updatePermission(this.formData)
        } else {
          await addPermission(this.formData)
        }
        this.$message.success(this.formData.id ? '权限修改成功' : '权限添加成功')

        await this.getPermissionList()
        this.btnCancel()
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        enVisible: '',
        type: '',
        pid: ''
      }
      this.showDialog = false
    },
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    async delPermission(id) {
      try {
        await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delPermission(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getPermissionList()
      } catch (error) {
        if (error === 'cancel') {
          this.$message({
            type: 'info',
            message: '你挽救了一个部门!'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
 ::v-deep .el-dialog__header {
    background: #ff69a7;
}
</style>
