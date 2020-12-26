<template>
  <div id="radar">
    雷达
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  mounted() {
    const myChart = echarts.init(document.getElementById('radar'))
    myChart.setOption({
      tooltip: {},
      legend: {
        data: ['去年人员架构', '今年人员架构']
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: '行政部', max: 5 },
          { name: '人事部', max: 10 },
          { name: '技术部', max: 10 },
          { name: '测试部', max: 5 },
          { name: 'UI', max: 5 },
          { name: '产品经理', max: 5 }
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [5, 4, 4, 2, 1, 4],
            name: '去年人员架构'
          },
          {
            value: [2, 8, 8, 3, 1, 1],
            name: '今年人员架构'
          }
        ]
      }]
    })
  }
}
</script>

<style lang="scss" scoped>
#radar{
    height: 500px;
}
</style>
