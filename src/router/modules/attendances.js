import Layout from '@/layout/index.vue'

export default
{
  path: '/attendances',
  component: Layout,
  children: [{
    path: '',
    name: 'Attendances',
    component: () => import('@/views/attendances/index'),
    meta: { title: '考勤', icon: 'skill' }
  }]
}

