/* ---- 用来根据来的state和指定的action生成并返回新的state的函数 ---- */
import {combineReducers} from 'redux'
import storageUtils from '../utils/storageUtils'
import {
    SET_HEAD_TITLE
} from './action-types'
// 用来管理头部标题的reducer函数
const initHeadTitle = '首页';
function headTitle(state=initHeadTitle,action){
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data;
        default:
            return state;
    }
}
// 用来管理当前登录用户的reducer函数
const initUser = storageUtils.getUser();
function user(state=initUser,action){
    switch (action.type) {
        // case value:
            
        //     break;
    
        default:
            return state;
    }
}

/* 向外默认暴露的是合并产生的总的reducer函数 
管理的总的state的结构
{
    headTitle:'首页',
    user:{}
}
*/
export default combineReducers({
    headTitle,
    user
})