<template>
  <el-card class="tree-card">
    <el-divider content-position="left">组织架构</el-divider>

    <treeTools :data="companyTitle" :is-root="true" />

    <el-tree :data="companyTree" :props="defaultProps" default-expand-all>
      <treeTools slot-scope="scope" :data="scope.data" @addDepartment="addDepartment" @delDepartment="getDepartments" @editDepartment="editDepartment" />
    </el-tree>
    <addDept ref="handelDept" :visible.sync="visible" :node="node" @getDepartment="getDepartments" />
  </el-card>
</template>

<script>
import treeTools from './components/tree-tools'
import addDept from './components/add-dept'
import { getDepartments } from '@/api/department'
import { convertTreeData } from '@/utils'
export default {
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      companyTree: [],
      companyTitle: {},
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      visible: false,
      node: {}
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    addDepartment(node) {
      this.visible = true
      this.node = node
    },
    getDepartments() {
      getDepartments().then(res => {
        this.companyTitle = {
          name: res.companyName,
          manager: '负责人'
        }

        this.companyTree = convertTreeData(res.depts, '')
      })
    },
    editDepartment(node) {
      this.visible = true
      this.node = node
      this.$nextTick(() => {
        this.$refs.handelDept.getDepartmentDetail()
      })
    }
  }
}
</script>

<style>

</style>
