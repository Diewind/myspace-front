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

// 获取商品分类列表
export const reqProducts = (pageNum,pageSize) => ajax(`${adminUrl}product/lst`,{pageNum,pageSize});
// 添加商品
export const addProduct = productinfo => ajax(`${adminUrl}product/add`,productinfo,'POST');
// 删除商品
export const delProduct = (id) => ajax(`${adminUrl}product/delete`,{id},'POST');

// 删除商品图片
export const reqDeleteImg = (name) => ajax(`${adminUrl}product/imgDelete`,{name},'POST');
// 更新商品状态(上架/下架)
export const reqUpdateStatus = (productId,status) => ajax(`${adminUrl}product/updateStatus`,{productId,status},'POST')
// 修改/详情页查询当前商品所在分类
export const reqCurCategory = (categoryId,pageflag) => ajax(`${adminUrl}product/getProCate`,{categoryId,pageflag},'POST')
/* 
搜索商品分页列表(根据商品名称/商品描述)
searchType: 搜索的类型,productName/productDesc
*/
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => ajax(`${adminUrl}product/search`,{
    pageNum,
    pageSize,
    [searchType]:searchName
});

// 获取所有角色的列表
export const reqRoles = () => ajax(`${adminUrl}role/rolelist`);
// 添加
export const reqAddRole = (roleName) => ajax(`${adminUrl}role/add`,{roleName},'POST');
// 更新
export const reqUpdateRole = (role) => ajax(`${adminUrl}role/update`,role,'POST');
// 删除
export const reqDeleteRole = (id) => ajax(`${adminUrl}role/delete`,{id},'POST');

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
