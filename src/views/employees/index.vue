<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools>
        <span slot="before">共{{ pageSetting.total }}条数据</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
        </template>
      </pageTools>
      <el-table :data="userList" border>
        <el-table-column label="序号" sortable="">
          <template slot-scope="scope">
            {{ (scope.$index + 1) + (asyncPageSetting.page - 1) * asyncPageSetting.size }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="username" sortable="" />
        <el-table-column label="头像" prop="staffPhoto" sortable="">
          <template slot-scope="{row}">
            <img v-imageerror="require('@/assets/common/img.jpeg')" :src="row.staffPhoto" alt="" style="border-radius: 50%; width: 100px; height: 100px; padding: 10px" @click="showQrCodeDialog(row.staffPhoto)">
          </template>
        </el-table-column>
        <el-table-column label="工号" prop="workNumber" sortable="" />
        <el-table-column label="聘用形式" prop="formOfEmployment" sortable="" :formatter="formatterEnableState" />
        <el-table-column label="部门" prop="departmentName" sortable="" />
        <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
          <template slot-scope="scope">
            {{ scope.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState" sortable="">
          <template slot-scope="{row}">
            <el-switch
              :value="row.enableState === 1"
              active-color="#fb5399"
              inactive-color="#ddd"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="$router.push('/employees/detail/'+row.id)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
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
      <addEmployee :show-dialog.sync="showDialog" @getUserList="getUserList" />
      <el-dialog :visible.sync="showCodeDialog" title="头像二维码" @opened="showQrCode">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
        <img src="" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { delEmployee, getUserList } from '@/api/employees'
import EmploymentEnum from '@/api/constant/employees'
import addEmployee from '@/views/employees/components/add-employee'
import { formatDate } from '@/filters'
import employeesEnum from '@/api/constant/employees'
import qrCode from 'qrcode'
export default {
  components: {
    addEmployee
  },
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
      userList: [],
      showDialog: false,
      showCodeDialog: false,
      staffPhoto: ''
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
    },
    async delEmployee(id) {
      try {
        await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delEmployee(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getUserList()
      } catch (error) {
        if (error === 'cancel') {
          this.$message({
            type: 'info',
            message: '你成功挽救了一个员工!'
          })
        }
      }
    },
    async exportData() {
      const params = {
        page: 1,
        size: this.pageSetting.total
      }
      const { rows } = await getUserList(params)
      const headersEnum = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const tHeader = Object.keys(headersEnum)
      const data = rows.map(item => {
        const arr = []
        tHeader.forEach(element => {
          for (const key in item) {
            if (key === headersEnum[element]) {
              if (key === 'timeOfEntry' || key === 'correctionTime') {
                item[key] = formatDate(item[key])
              }
              if (key === 'formOfEmployment') {
                const obj = employeesEnum.hireType.find(Enum => Enum.id === item[key])
                item[key] = obj ? obj.value : '不存在的形式'
              }
              arr.push(item[key])
            }
          }
        })
        return arr
      })
      const excel = await import('@/vendor/Export2Excel.js')
      excel.export_json_to_excel({
        header: tHeader, // 表头 必填
        data, // 具体数据 必填
        filename: '员工列表', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填

      })
    },
    showQrCodeDialog(url) {
      if (url) {
        this.showCodeDialog = true
        this.staffPhoto = url
      }
    },
    showQrCode() {
      qrCode.toCanvas(this.$refs.myCanvas, this.staffPhoto)
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-dialog__header {
    background: #ff69a7;
}
</style>
