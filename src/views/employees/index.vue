<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools>
        <span slot="before">共{{ pageSetting.total }}条数据</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </pageTools>
      <el-table :data="userList" border>
        <el-table-column label="序号" sortable="">
          <template slot-scope="scope">
            {{ (scope.$index + 1) + (asyncPageSetting.page - 1) * asyncPageSetting.size }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="username" sortable="" />
        <el-table-column label="工号" prop="workNumber" sortable="" />
        <el-table-column label="聘用形式" prop="formOfEmployment" sortable="" :formatter="formatterEnableState" />
        <el-table-column label="部门" prop="departmentName" sortable="" />
        <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
          <template slot-scope="scope">
            {{ scope.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState" sortable="" />
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" align="middle" style="height: 60px;">
        <el-pagination
          layout="prev, pager, next , sizes"
          :total="pageSetting.total"
          :page-sizes="[5,10,20,50]"
          :page-size="10"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { getUserList } from '@/api/employees'
import EmploymentEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      pageSetting: {
        page: 1,
        size: 10,
        total: 0
      },
      asyncPageSetting: {
        page: 1,
        size: 10
      },
      userList: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { rows, total } = await getUserList(this.pageSetting)
      this.pageSetting.total = total
      this.userList = rows
    },
    async currentChange(page) {
      this.pageSetting.page = page
      await this.getUserList(this.pageSetting)
      this.asyncPageSetting.page = page
    },
    async sizeChange(size) {
      this.pageSetting.size = size
      await this.getUserList(this.pageSetting)
      this.asyncPageSetting.size = size
    },
    formatterEnableState(row, column, cellValue, index) {
      const obj = EmploymentEnum.hireType.find(item => cellValue === item.id)
      return obj ? obj.value : '不存在的形式'
    }
  }
}
</script>

<style>

</style>
