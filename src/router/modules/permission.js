import Layout from '@/layout/index.vue'

export default
{
  path: '/permission',
  component: Layout,
  children: [{
    path: '',
    name: 'permission',
    component: () => import('@/views/permission/index'),
    meta: { title: '权限管理', icon: 'lock' }
  }]
}

