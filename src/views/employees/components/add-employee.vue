<template>
  <el-dialog title="新增员工" :visible="showDialog" @click.native="departmentData = []" @close="btnCancel">
    <el-form ref="form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option
            v-for="item in employeesEnum"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="getDepartments" />
        <div v-if="departmentData.length > 0" class="deptsWrapper" style="width:50%">
          <el-tree :data="departmentData" :props="defaultProps" default-expand-all class="tree" @node-click="handelDepartment" />
        </div>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>

    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="confirm">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/department'
import { convertTreeData } from '@/utils'
import employees from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateDepartment = async(rule, value, callback) => {
      try {
        const { depts } = await getDepartments()
        let isExist = false
        depts.forEach(item => {
          if (item.name === value) {
            isExist = true
          }
        })
        if (isExist) {
          callback()
        } else {
          callback(new Error('此部门不存在'))
        }
      } catch (error) {
        console.log(error)
      }
    }
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' },
          { min: 1, max: 4, message: '用户姓名为1-4位' }
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, trigger: 'blur', message: '手机格式不正确' }
        ],
        formOfEmployment: [
          { required: true, trigger: 'change', message: '聘用形式不能为空' }
        ],
        workNumber: [
          { required: true, trigger: 'blur', message: '工号不能为空' },
          { pattern: /^\d{6}$/, trigger: 'blur', message: '工号位6位数数字' }
        ],
        departmentName: [
          { required: true, trigger: 'change', message: '部门名称不能为空' },
          { trigger: 'change', validator: validateDepartment }
        ],
        timeOfEntry: [
          { required: true, trigger: 'blur', message: '入职时间不能为空' }
        ]
      },
      departmentData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      employeesEnum: employees.hireType
    }
  },
  methods: {
    async getDepartments() {
      const { depts } = await getDepartments()
      this.departmentData = convertTreeData(depts, '')
    },
    handelDepartment(node) {
      if (!node.children) {
        this.formData.departmentName = node.name
        this.departmentData = []
      }
    },
    async confirm() {
      this.departmentData = []
      try {
        const isValid = await this.$refs.form.validate()
        if (isValid) {
          await addEmployee(this.formData)
          this.$message.success('新增成功')
          this.btnCancel()
          this.$emit('getUserList')
        }
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.$refs.form.resetFields()
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-dialog__header {
    background: #ff69a7;
}
.deptsWrapper{
    position: absolute;
    z-index: 1;
    height: 160px;
    border-radius: 10px;
    border: 1px solid #ddd;
    overflow: hidden;
    .tree{
        width: 120%;
    height: 160px;
    overflow-y: scroll;
    }
}
</style>
