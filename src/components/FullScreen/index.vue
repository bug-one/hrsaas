<template>
  <el-tooltip content="全屏" placement="bottom">
    <i class="el-icon-full-screen" @click="fullScreen" />
  </el-tooltip>
</template>

<script>
import screenfull from 'screenfull'
export default {
  methods: {
    fullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      } else {
        this.$message.error('此浏览器暂不支持全屏')
      }
    }
  }
}
</script>

<style>

</style>
