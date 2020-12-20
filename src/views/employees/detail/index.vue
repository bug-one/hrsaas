<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设置" name="account">
            <el-row type="flex" justify="center" style="padding-right: 300px">
              <el-form ref="dataForm" label-width="100px" :rules="rules" :model="formData">
                <el-form-item label="姓名" prop="username">
                  <el-input v-model="formData.username" placeholder="姓名" />
                </el-form-item>
                <el-form-item label="密码" prop="newPassWord">
                  <el-input v-model="formData.newPassWord" placeholder="密码" type="password" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveUserDetailById">更新</el-button>
                  <el-button @click="$router.back()">取消</el-button>
                </el-form-item>
              </el-form>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="detail">
            <component :is="userInfoName" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job">
            <component :is="jobInfoName" />

          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfoById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import JobInfo from '@/views/employees/components/job-info'
import UserInfo from '@/views/employees/components/user-info'
export default {
  components: {
    JobInfo,
    UserInfo
  },
  data() {
    return {
      activeName: 'account',
      userId: this.$route.params.id,
      formData: {
        username: '',
        newPassWord: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '姓名不能为空' }],
        newPassWord: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      jobInfoName: 'JobInfo',
      userInfoName: 'UserInfo'
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.formData = await getUserInfoById(this.userId)
    },
    async saveUserDetailById() {
      try {
        const isValid = await this.$refs.dataForm.validate()
        if (isValid) {
          await saveUserDetailById({ ...this.formData, password: this.formData.newPassWord })
          this.$message.success('更新成功！')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
