import Layout from '@/layout/index.vue'

export default
{
  path: '/departments',
  component: Layout,
  name: 'departments',
  children: [{
    path: '',
    component: () => import('@/views/departments/index'),
    meta: { title: '组织架构', icon: 'tree' }
  }]
}

