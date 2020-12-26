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
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="scope">
        {{ scope.data.day | getDay }}
        <span v-if="isRest(scope.date)" class="restIcon">休</span>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(val) {
      const day = val.split('-')[2]
      return day.startsWith('0') ? day.substr('1') : day
    }
  },
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
    },
    isRest(date) {
      const week = date.getDay()
      console.log(week)
      return week === 0 || week === 6
    }
  }
}
</script>

<style lang="scss" scoped>
.restIcon{
  color: #fff;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  background-color: #fa5398;
}
</style>
