<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色名称" name="role">
            <el-row type="flex" align="middle" style="height: 60px">
              <el-col>
                <el-button size="small" type="primary" @click="addRole">新增角色</el-button>
              </el-col>
            </el-row>
            <el-table :data="roleList" style="width: 100%">
              <el-table-column prop="date" label="序号" width="200px">
                <template slot-scope="scope">
                  {{ scope.$index +1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="角色名" width="200px" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" plain @click="assignPermission(scope.row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" plain @click="editRole(scope.row.id)">编辑角色</el-button>
                  <el-button size="small" type="primary" plain @click="delRole(scope.row.id)">删除角色</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end" align="middle" style="height: 60px;">
              <el-pagination
                layout="prev, pager, next,sizes"
                :page-sizes="[2, 5, 10, 20]"
                :total="total"
                :page-size="pageSetting.pagesize"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="company">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :show-icon="true"
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input v-model="companyDetail.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyDetail.companyAddress" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="companyDetail.companyPhone" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyDetail.mailbox" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyDetail.remarks" disabled style="width: 400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog
        :title="handleTitle"
        :visible.sync="showDialog"
        width="50%"
        @close="btnCancel"
      >
        <el-form ref="roleForm" :model="roleFormData" label-width="80px" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleFormData.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleFormData.description" />
          </el-form-item>
        </el-form>

        <template slot="footer">
          <el-button @click="btnCancel">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </template>
      </el-dialog>
      <el-dialog title="编辑权限" :visible="showPermissionDialog" @close="permissionBtnCancel">
        <el-tree ref="tree" default-expand-all :data="permissionList" :props="{label:'name'}" show-checkbox check-strictly node-key="id" :default-checked-keys="permIds" />
        <template slot="footer">
          <el-row type="flex" justify="center">
            <el-button @click="permissionBtnCancel">取消</el-button>
            <el-button type="primary" @click="permissionBtnConfirm">确定</el-button>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCompanyDetail, getRoleList, delRoleById, addRole, getRoleDetail, editRole, assignPerm } from '@/api/settings'
import { mapGetters } from 'vuex'
import { getPermissionList } from '@/api/permission'
import { convertTreeData } from '@/utils'
export default {
  data() {
    return {
      activeName: 'role',
      roleList: [],
      pageSetting: {
        page: 1,
        pagesize: 5
      },
      total: 0,
      companyDetail: {},
      showDialog: false,
      roleFormData: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '角色名不能为空' },
          { min: 3, max: 12, trigger: 'blur', message: '角色名需3-12位字符' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' },
          {
            min: 5,
            max: 100,
            message: '角色描述在5-100字符之间',
            trigger: 'blur'
          }
        ]
      },
      showPermissionDialog: false,
      permissionList: [],
      permIds: [],
      userId: ''
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    handleTitle() {
      return this.roleFormData.id ? '编辑角色' : '新增角色'
    }
  },
  watch: {
    companyId: {
      async handler() {
        if (this.companyId) {
          const companyDetail = await getCompanyDetail(this.companyId)
          this.companyDetail = companyDetail
        }
      },
      immediate: true
    },
    permIds(val) {
      console.log(val)
    }
  },
  created() {
    this.getRoleList()
    this.getPermissionList()
  },
  methods: {
    getRoleList() {
      return getRoleList(this.pageSetting).then(res => {
        this.roleList = res.rows
        this.total = res.total
      })
    },
    handleCurrentChange(page) {
      this.pageSetting.page = page
      this.getRoleList()
    },
    handleSizeChange(pagesize) {
      this.pageSetting.pagesize = pagesize
      this.getRoleList()
    },
    async delRole(id) {
      try {
        await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delRoleById(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        await this.getRoleList()
        if (this.total % this.pageSetting.pagesize === 0) {
          this.pageSetting.page--
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    addRole() {
      this.showDialog = true
    },
    async confirm() {
      try {
        const isValid = await this.$refs.roleForm.validate()
        if (isValid) {
          if (this.roleFormData.id) {
            await editRole(this.roleFormData)
            this.$message.success('编辑成功')
          } else {
            await addRole(this.roleFormData)
            this.$message.success('新增成功')
          }
          this.btnCancel()
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.showDialog = false
      this.roleFormData = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
    },
    async editRole(id) {
      try {
        const roleDetail = await getRoleDetail(id)
        this.roleFormData = roleDetail
        this.showDialog = true
      } catch (error) {
        console.log(error)
      }
    },
    async getPermissionList() {
      const data = await getPermissionList()
      this.permissionList = convertTreeData(data, '0')
    },
    async assignPermission(id) {
      this.userId = id
      const { permIds } = await getRoleDetail(id)
      this.permIds = permIds
      this.showPermissionDialog = true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.permIds)
      })
    },
    permissionBtnCancel() {
      this.permIds = []
      this.showPermissionDialog = false
    },
    async permissionBtnConfirm() {
      try {
        const id = this.userId
        const permIds = this.$refs.tree.getCheckedKeys()
        const data = { id, permIds }
        await assignPerm(data)
        this.$message.success('修改成功')
        this.showPermissionDialog = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-dialog__header {
    background: #ff69a7;
}
</style>
