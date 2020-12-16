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
              <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" plain>编辑角色</el-button>
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
        title="新增角色"
        :visible.sync="showDialog"
        width="50%"
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
    </div>
  </div>
</template>

<script>
import { getCompanyDetail, getRoleList, delRoleById, addRole } from '@/api/settings'
import { mapGetters } from 'vuex'
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
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
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
    }
  },
  created() {
    this.getRoleList()
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
          await addRole(this.roleFormData)
          this.$message.success('新增成功')
          this.btnCancel()
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.showDialog = false
      this.$refs.roleForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-dialog__header {
    background: #ff69a7;
}
</style>
