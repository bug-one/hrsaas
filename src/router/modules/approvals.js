import Layout from '@/layout/index.vue'

export default
{
  path: '/approvals',
  component: Layout,
  children: [{
    path: '',
    name: 'Approvals',
    component: () => import('@/views/approvals/index'),
    meta: { title: '审批', icon: 'tree-table' }
  }]
}

