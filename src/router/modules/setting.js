import Layout from '@/layout/index.vue'

export default
{
  path: '/setting',
  component: Layout,
  name: 'settings',
  children: [{
    path: '',
    component: () => import('@/views/setting/index'),
    meta: { title: '公司设置', icon: 'setting' }
  }]
}

