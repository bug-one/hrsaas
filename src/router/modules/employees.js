import Layout from '@/layout/index.vue'

export default
{
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:id',
      hidden: true,
      component: () => import('@/views/employees/detail'),
      meta: { title: '员工详情' }
    }
  ]
}

