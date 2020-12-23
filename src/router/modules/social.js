import Layout from '@/layout/index.vue'

export default
{
  path: '/social',
  component: Layout,
  name: 'social_securitys',
  children: [{
    path: '',
    component: () => import('@/views/social/index'),
    meta: { title: '社保', icon: 'table' }
  }]
}

