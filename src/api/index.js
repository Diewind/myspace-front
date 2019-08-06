/* 
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/

import ajax from './ajax';
const adminUrl = '/admin/';
// 登录
export const reqLogin = (username,password) => ajax(`${adminUrl}user/login`,{username,password},'POST');

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST');
