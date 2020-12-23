import Layout from '@/layout/index.vue'

export default
{
  path: '/attendances',
  component: Layout,
  name: 'attendances',
  children: [{
    path: '',
    component: () => import('@/views/attendances/index'),
    meta: { title: '考勤', icon: 'skill' }
  }]
}

