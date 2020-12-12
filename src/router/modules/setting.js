import Layout from '@/layout/index.vue'

export default
{
  path: '/setting',
  component: Layout,
  children: [{
    path: '',
    name: 'Setting',
    component: () => import('@/views/setting/index'),
    meta: { title: '公司设置', icon: 'setting' }
  }]
}
