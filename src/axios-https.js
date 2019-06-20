import axios from 'axios';
import Global from './api/global';

const DEFAULT_TIMEOUT = 5000;

// axios.defaults.timeout = DEFAULT_TIMEOUT;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '//api.yijicai.cn/api';

// const url = '//api.yijicai.cn/api';

const axiosHttp = {
    // 展示信息
    goodsInfo: (data) => {
        return axios.post('/goods_info', Global.getPostParams(data));
    },
    // 发送手机验证码
    requestCode: (data) => {
        return axios.post('/request_code', Global.getPostParams(data));
    },
    // 登录
    Login: (data) => {
        return axios.post('/login', Global.getPostParams(data));
    },
    // 个人信息
    Myself: (data) => {
        return axios.post('/myself', Global.getPostParams(data));
    },
    // 激活商品统计
    GoodsActive: (data) => {
        return axios.post('/goods_active', Global.getPostParams(data));
    }
};
export default axiosHttp;