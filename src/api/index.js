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

// 获取分类列表
export const reqCategory = (parentId) => ajax(`${adminUrl}category/catelist`,{parentId});
// 添加分类
export const reqAddCategory = (parentId,categoryName) => ajax(`${adminUrl}category/add`,{parentId,categoryName},'POST');
// 更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(`${adminUrl}category/update`,{categoryId,categoryName},'POST');
// 删除分类
export const reqDeleteCategory = (categoryId) => ajax(`${adminUrl}category/delete`,{categoryId},'POST');

// 请求天气
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
