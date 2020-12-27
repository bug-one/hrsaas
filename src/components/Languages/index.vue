<template>
  <el-dropdown class="languages" @command="handleCommand">
    <span class="el-dropdown-link">
      {{ $t('Languages') }}<i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="cn">中文</el-dropdown-item>
      <el-dropdown-item command="en">english</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    handleCommand(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>

<style lang="scss" scoped>
.languages{
    padding: 7px 10px 0 0;
}
.el-dropdown-link{
    color: #ffffff;
}
</style>
