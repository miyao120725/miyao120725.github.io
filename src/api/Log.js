/*
       统计接口调用
 */

import axiosHttp from '../axios-https';

export const Goods_Active = (token, id) => {
    const option = {
        token: token,
        id: id
    };
    axiosHttp.GoodsActive(option).then(res => {

    }).catch((err) => {
        console.log(err);
    });
};
