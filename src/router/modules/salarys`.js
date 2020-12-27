import Layout from '@/layout/index.vue'

export default
{
  path: '/salarys',
  component: Layout,
  name: 'salarys',
  children: [{
    path: '',
    component: () => import('@/views/salarys/index'),
    meta: { title: '工资', icon: 'money' }
  }]
}

