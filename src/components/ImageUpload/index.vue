<template>
  <div>
    <el-upload action="#" list-type="picture-card" :file-list="fileList" :on-preview="preview">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        { url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1432014582,710203898&fm=26&gp=0.jpg' }
      ],
      imgUrl: '',
      showDialog: false
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
