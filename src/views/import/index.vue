<template>
  <div>
    <uploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import uploadExcel from '@/components/UploadExcel'
import { importEmployees } from '@/api/employees'
export default {
  components: {
    uploadExcel
  },
  methods: {
    async onSuccess({ results, header }) {
      try {
        const dictionary = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '部门': 'departmentName',
          '聘用形式': 'formOfEmployment'
        }
        const data = results.map(item => {
          const newItem = {}
          for (const key in item) {
            const newKey = dictionary[key]
            const value = item[key]
            newItem[newKey] = value
          }
          return newItem
        })
        await importEmployees(data)
        this.$message.success('导入成功！')
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style>

</style>
