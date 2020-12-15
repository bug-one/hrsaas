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
              <el-table-column prop="date" label="序号" width="200px">
                <template slot-scope="scope">
                  {{ scope.$index +1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="角色名" width="200px" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作" width="200px">
                <template>
                  <el-button size="small" type="primary" plain>编辑角色</el-button>
                  <el-button size="small" type="primary" plain>删除角色</el-button>
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
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input disabled style="width: 400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/settings'
export default {
  data() {
    return {
      activeName: 'role',
      roleList: [],
      pageSetting: {
        page: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      getRoleList(this.pageSetting).then(res => {
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
    }
  }
}
</script>

<style>

</style>
