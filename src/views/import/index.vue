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
            let value = item[key]
            if (newKey === 'timeOfEntry' || newKey === 'correctionTime') {
              value = this.formatDate(value, '/')
              console.log(value)
              value = new Date(value)
              console.log(value)
            }
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
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }

}
</script>

<style>

</style>
