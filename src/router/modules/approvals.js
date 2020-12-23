import Layout from '@/layout/index.vue'

export default
{
  path: '/approvals',
  component: Layout,
  name: 'approvals',
  children: [{
    path: '',
    component: () => import('@/views/approvals/index'),
    meta: { title: '审批', icon: 'tree-table' }
  }]
}

