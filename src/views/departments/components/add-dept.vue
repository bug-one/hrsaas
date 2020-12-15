<template>
  <el-dialog title="新增部门" :visible="visible" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="elForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option
            v-for="item in people"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="16">
        <el-button size="big" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="big" @click="confirm">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartments } from '@/api/department'
import { getEmployeeSimple } from '@/api/employee'
export default {
  props: {
    visible: {
      type: Boolean
    },
    node: {
      type: Object,
      required: true
    }
  },
  data() {
    const validateName = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      depts.some(item => item.name === this.formData.name && item.pid === this.node.id) ? callback(new Error('同一部门下，部门名称不能重复')) : callback()
    }
    const validateCode = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      depts.some(item => item.code === value && value) ? callback(new Error('不能有重复的编码')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        introduce: '',
        manager: ''
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '部门名称不能为空' },
          { min: 1, max: 50, trigger: 'blur', message: '部门名称必须为1-50个字符' },
          { trigger: 'blur', validator: validateName }
        ],
        code: [
          { required: true, trigger: 'blur', message: '部门编码不能为空' },
          { min: 1, max: 50, trigger: 'blur', message: '部门编码必须为1-50个字符' },
          { trigger: 'blur', validator: validateCode }

        ],
        introduce: [
          { required: true, trigger: 'blur', message: '部门介绍不能为空' },
          { min: 1, max: 300, trigger: 'blur', message: '部门编码必须为1-300个字符' }
        ],
        manager: [
          { required: true, trigger: 'change', message: '负责人不能为空' }

        ]
      },
      people: []
    }
  },
  methods: {
    async confirm() {
      try {
        const isValid = await this.$refs.elForm.validate()
        if (isValid) {
          this.formData.pid = this.node.id
          await addDepartments(this.formData)
          this.btnCancel()
          this.$emit('getDepartment')
        }
      } catch {
        console.log()
      }
    },
    getEmployeeSimple() {
      getEmployeeSimple().then(res => {
        this.people = res
      })
    },
    btnCancel() {
      this.$emit('update:visible', false)
      this.$refs.elForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-dialog__header {
    background: #ff69a7;
}
</style>
