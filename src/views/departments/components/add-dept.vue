<template>
  <el-dialog title="新增部门" :visible="visible">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="elForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <!-- <el-form-item label="部门负责人">
        <el-select style="width:80%" placeholder="请选择" />
      </el-form-item> -->
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="16">
        <el-button size="big">取消</el-button>
        <el-button type="primary" size="big" @click="confirm">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
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
          { min: 1, max: 50, trigger: 'blur', message: '部门名称必须为1-50个字符' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '部门编码不能为空' },
          { min: 1, max: 50, trigger: 'blur', message: '部门编码必须为1-50个字符' }

        ],
        introduce: [
          { required: true, trigger: 'blur', message: '部门介绍不能为空' },
          { min: 1, max: 300, trigger: 'blur', message: '部门编码必须为1-300个字符' }

        ]
      }
    }
  },
  methods: {
    confirm() {
      this.$refs.elForm.validate((valid) => {
        if (valid) {
          console.log('验证成功')
        } else {
          console.log('验证失败')
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-dialog__header {
    background: #ff69a7;
}
</style>
