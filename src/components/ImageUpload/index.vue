<template>
  <div>
    <el-upload action="#" list-type="picture-card" :file-list="fileList" :on-preview="preview" :class="{'disable':disable}" :on-change="onChange" :http-request="upLoadImage" :on-remove="onRemove" :before-upload="beforeUpload">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <el-row type="flex" justify="center">
        <img :src="imgUrl" alt="">
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      imgUrl: '',
      showDialog: false
    }
  },
  computed: {
    disable() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      const mixSize = 1024 * 1024 * 1
      const type = ['image/jpeg', 'image/png']
      if (type.indexOf(file.type) === -1) {
        this.$message.error('图片格式仅支持.jpeg.png')
        return false
      }
      if (file.size > mixSize) {
        this.$message.error('图片大小不能超过1M')
        return false
      }
      return true
    },
    upLoadImage(params) {
      console.log('自定义上传↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
      console.log(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.disable {
::v-deep .el-upload--picture-card{
     display: none;
 }
::v-deep img{
     object-fit: cover;
 }
}
</style>
