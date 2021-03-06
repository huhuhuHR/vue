/**
 * Created by huorong on 17/10/23.
 */
import {
  Demo,
  vuexDemo,
  ValidateCode,
  theLifeCycle,
  operationDemo,
  vueEditDemo,
  uploadExcel,
  vueSropper,
  imageSelect,
  jsonpDemo
} from '../pages/index';
const demoRouter = [
  {
    path: '/demo',
    component: Demo,
    meta: {title: 'blog例子'},
    redirect: '/demo/vueSropper',
    children: [
      {
        path: 'vuexDemo',
        component: vuexDemo,
        meta: {title: 'vuex例子1'}
      },
      {
        path: 'getValidateCode',
        component: ValidateCode,
        meta: {title: '验证码'}
      },
      {
        path: 'theLifeCycle',
        component: theLifeCycle,
        meta: {title: '生命周期'}
      },
      {
        path: 'operationDemo',
        component: operationDemo,
        meta: {title: 'vuex例子2'}
      },
      {
        path: 'operationDemo',
        component: operationDemo,
        meta: {title: 'vuex例子2'}
      },
      {
        path: 'vueEditDemo',
        component: vueEditDemo,
        meta: {title: 'vueEdit'}
      },
      {
        path: 'uploadExcel',
        component: uploadExcel,
        meta: {title: 'uploadExcel'}
      },
      {
        path: 'vueSropper',
        component: vueSropper,
        meta: {title: '裁图'}
      },
      {
        path: 'imageSelect',
        component: imageSelect,
        meta: {title: '上传图片'}
      },
      {
        path: 'jsonpDemo',
        component: jsonpDemo,
        meta: {title: 'jsonp'}
      }
    ]
  }
];
export default demoRouter;
