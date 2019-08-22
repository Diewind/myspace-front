/* 
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/

import ajax from './ajax';
import cityobj from './city'
const adminUrl = '/admin/';
// 登录
export const reqLogin = (username,password) => ajax(`${adminUrl}user/login`,{username,password},'POST');

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST');

/* 
json请求的接口函数
*/
export const reqWeather = (city) => {
    let citynum = null;
    if(city in cityobj){
        citynum = cityobj[city];
    }

    const url = `${adminUrl}weather/query`;
    return ajax(url,{
        citynum
    },'GET')
}
