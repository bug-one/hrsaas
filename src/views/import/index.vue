<template>
  <div>
    <uploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import uploadExcel from '@/components/UploadExcel'
export default {
  components: {
    uploadExcel
  },
  methods: {
    onSuccess({ results, header }) {
      console.log(results)
      console.log(header)
    }
  }

}
</script>

<style>

</style>
