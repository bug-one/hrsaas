<template>
  <el-card class="tree-card">
    <treeTools :data="companyTitle" :is-root="true" />

    <el-tree :data="companyTree" :props="defaultProps">
      <treeTools slot-scope="scope" :data="scope.data" />
    </el-tree>
  </el-card>
</template>

<script>
import treeTools from './components/tree-tools'
export default {
  components: {
    treeTools
  },
  data() {
    return {
      companyTree: [
        {
          name: '总裁办',
          manager: '董明珠'
        },
        {
          name: '行政部',
          manager: '刘强东'
        },
        {
          name: '财务部',
          manager: '马云',
          children: [
            { name: '财务核算部' },
            { name: '税务管理部',
              manager: '马化腾'
            }
          ]
        },
        {
          name: '技术部'
        }

      ],
      companyTitle: { name: '格力电器有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  }
}
</script>

<style>

</style>
