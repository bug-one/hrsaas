import Layout from '@/layout/index.vue'

export default
{
  path: '/employees',
  component: Layout,
  name: 'employees',
  children: [
    {
      path: '',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:id',
      hidden: true,
      component: () => import('@/views/employees/detail'),
      meta: { title: '员工详情' }
    },
    {
      path: 'print/:id',
      hidden: true,
      component: () => import('@/views/employees/print'),
      meta: { title: '打印' }
    }
  ]
}

