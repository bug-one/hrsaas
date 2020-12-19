<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设置" name="account">
            <el-row type="flex" justify="center" style="padding-right: 300px">
              <el-form label-width="100px">
                <el-form-item label="姓名">
                  <el-input v-model="formData.username" placeholder="姓名" />
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="formData.newPassWord" placeholder="密码" type="password" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">更新</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="detail">
            个人详情
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job">
            岗位信息
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfoById } from '@/api/user'
export default {
  data() {
    return {
      activeName: 'account',
      userId: this.$route.params.id,
      formData: {
        username: '',
        newPassWord: ''
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.formData = await getUserInfoById(this.userId)
    }
  }
}
</script>

<style>

</style>
