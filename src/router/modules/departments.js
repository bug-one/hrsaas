import Layout from '@/layout/index.vue'

export default
{
  path: '/departments',
  component: Layout,
  children: [{
    path: '',
    name: 'Departments',
    component: () => import('@/views/departments/index'),
    meta: { title: '组织架构' }
  }]
}

