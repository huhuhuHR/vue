import axios from 'axios';
import URLSearchParams from 'url-search-params';
import {CHANGE_LOAD_SHOW_STATE} from '../store/mutation-types';
import store from '../store';

// / Override timeout default for the library
// Now all requests will wait 10 seconds before timing out
const globalConfig = (axios) => {
  //设置超时时间 2分钟
  axios.defaults.timeout = 120000;
};

const transformRequest = (axios) => {
  axios.defaults.transformRequest = [function (data, headers) {
    // 忽略 非POST 请求
    if (data === undefined) {
      return;
    }
    if (data.emulateFile) {
      headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
      return data.fileData;
    }
    // emulateJSON => json json格式的参数 requestBody
    if (!data.emulateJSON) {
      headers['Content-Type'] = 'application/json;charset=UTF-8';
      console.log('!emulateJSON');
      return JSON.stringify(data);
    }
    // emulateJSON => x-www-form-urlencoded form表单 requestParams
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    let params = new URLSearchParams();
    Object.keys(data).forEach(function (key) {
      if (key !== 'emulateJSON') {
        params.append(key, data[key]);
      }
    });
    return params;
  }];
};
// 入参序列化
// const paramsSerializer = function (params) {
//   return Qs.stringify(params, {arrayFormat: 'brackets'})
// };

// intercept requests or responses before they are handled by then or catch
const addRequestInterceptors = (axios) => {
  axios.interceptors.request.use(function (config) {
    if (config.useLoadLayer) {
      store.commit('CHANGE_LOAD_SHOW_STATE', true);
    }
    return config;
  }, function (error) {
    store.commit(CHANGE_LOAD_SHOW_STATE, false);
    return Promise.reject(error);
  });
};

const addResponseInterceptors = (axios) => {
  axios.interceptors.response.use(function (response) {
    console.log(response.onprogress);
    store.commit(CHANGE_LOAD_SHOW_STATE, false);
    return response;
  }, function (error) {
    store.commit(CHANGE_LOAD_SHOW_STATE, false);
    return Promise.reject(error);
  });
};

const accessInVueInstance = (Vue, axios) => {
  Vue.prototype.$http = axios;
};

const config = (Vue) => {
  globalConfig(axios);
  transformRequest(axios);
  addRequestInterceptors(axios);
  addResponseInterceptors(axios);
  accessInVueInstance(Vue, axios);
};

const api = ({url, method = 'POST', params = {}, emulateJSON = false, useLoadLayer = true, onUploadProgress = null, successCallback, errorCallback}) => {
  let reqConf = {
    method, url, useLoadLayer,
    cancelToken: new axios.CancelToken(function (cancel) {
      console.log('request is canceled');
    })
  };
  onUploadProgress && Object.assign(reqConf, onUploadProgress);
  if (method === 'POST' && emulateJSON) {
    params.emulateJSON = true;
  }
  reqConf[method === 'POST' ? 'data' : 'params'] = params;

  return axios(reqConf).then((response) => {
    if (response.status === 250) {
      location.href = '/';
      return false;
    }
    let rspCode = response.data.code;
    // console.log(rspCode);
    if (rspCode === '0') {
      successCallback && successCallback(response.data.data);
    } else {
      errorCallback && errorCallback(response);
    }

    return response
  }).catch((error) => {
    if (error.response) {
      errorCallback && errorCallback(error.response);
    } else {
      console.error(error);
    }
  });
};
const uploadApi = ({url, method = 'POST', params = new FormData(), useLoadLayer = true, successCallback, errorCallback}) => {
  let reqConf = {method, url, useLoadLayer};
  var param = Object.assign({}, {'fileData': params}, {'emulateFile': true});
  reqConf[method === 'POST' ? 'data' : 'params'] = param;

  axios(reqConf).then((response) => {
    let rspCode = response.data.code;
    if (rspCode === '0') {
      // 业务级成功
      successCallback && successCallback(response.data.data);
    } else {
      // 业务级失败
      if (rspCode === '12' || rspCode === '10' || rspCode === '11') {
      } else {
        errorCallback && errorCallback(response);
      }
    }
  }).catch((error) => {
    if (error.response) {
      // 服务端异常（返回的 HTTP 状态码非 2xx）
      errorCallback && errorCallback(error.response);
    } else {
      // 客户端代码异常（request 预处理、 successCallback 执行报错）或 请求超时
      console.error(error);
    }
  });
};
export default {
  config,
  api,
  uploadApi
};
