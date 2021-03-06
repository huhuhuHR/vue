/**
 * Created by huorong on 17/10/23.
 */
import {
  blog2,
  home,
  toShare,
  active,
  manage,
  personInfo,
} from '../pages/index';

const blog2Router = [
  {
    path: '/blog',
    component: blog2,
    meta: {title: '我的'},
    redirect: '/blog/home',
    children: [
      {
        path: 'home',
        component: home,
        meta: {title: '博客'}
      },
      {
        path: 'share',
        component: toShare,
        meta: {title: '分享'}
      },
      {
        path: 'active',
        component: active,
        meta: {title: '激活'}
      },
      {
        path: 'manage',
        component: manage,
        meta: {title: '管理'}
      },
      {
        path: 'personInfo',
        component: personInfo,
        meta: {title: '个人资料'}
      }
    ]
  }
];
export default blog2Router;
