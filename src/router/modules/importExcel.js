import Layout from '@/layout/index.vue'

export default
{
  path: '/import',
  component: Layout,
  children: [{
    path: '',
    name: 'Import',
    hidden: true,
    component: () => import('@/views/import/index'),
    meta: { title: '导入Excel表格' }
  }]
}

