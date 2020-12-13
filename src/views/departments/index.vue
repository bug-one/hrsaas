<template>
  <el-card class="tree-card">
    <el-divider content-position="left">组织架构</el-divider>

    <treeTools :data="companyTitle" :is-root="true" />

    <el-tree :data="companyTree" :props="defaultProps">
      <treeTools slot-scope="scope" :data="scope.data" />
    </el-tree>
  </el-card>
</template>

<script>
import treeTools from './components/tree-tools'
import { getDepartments } from '@/api/department'
export default {
  components: {
    treeTools
  },
  data() {
    return {
      companyTree: [],
      companyTitle: {},
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    getDepartments().then(res => {
      console.log(res)
      this.companyTitle = {
        name: res.companyName,
        manager: '负责人'
      }
      this.companyTree = res.depts
    })
  }
}
</script>

<style>

</style>
