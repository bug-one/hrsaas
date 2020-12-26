<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="mini" @change="changeDate">
        <el-option v-for="item in yearList" :key="item" :label="item + '年'" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="mini" @change="changeDate">
        <el-option v-for="item in 12" :key="item" :label="item + '月'" :value="item" />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate" />
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentDate: null,
      yearList: [],
      currentYear: '',
      currentMonth: ''
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    this.yearList = Array.from(Array(11), (val, index) => {
      const date = new Date()
      const year = date.getFullYear()
      return year - 5 + index
    })
  },
  methods: {
    changeDate() {
      const year = this.currentYear
      const month = this.currentMonth
      const date = `${year}-${month}-1`
      this.currentDate = new Date(date)
    }
  }
}
</script>

<style>

</style>
