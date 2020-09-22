/* ---- 包含n个action creator函数的模块 ---- 
   同步action：对象{type:'xxx',data:数据值}
   异步action：函数dispatch => {}
*/
import {
    SET_HEAD_TITLE,
    RECEIVE_USER
} from './action-types'
import {reqLogin} from '../api'
import storageUtils from '../utils/storageUtils'
import { message } from 'antd';
// 设置头部标题的同步action
export const setHeadTitle = (headTitle) => ({
    type:SET_HEAD_TITLE,
    data:headTitle
});

export const receiveUser = (user) => ({
    type:RECEIVE_USER,
    data:user
});

export const Login = (username,password)=>{
    return async (dispatch) => {
        // 执行异步ajax请求
        const result = await reqLogin(username,password);
        if(result.status === 0){
            const user = result.data;
            // 保存用户数据在本地
            storageUtils.saveUser(user);
            // 分发接收用户的同步action
            dispatch(user);
        }else{
            message.error(result.msg);
        }
    }
}