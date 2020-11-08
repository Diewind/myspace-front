import { message } from 'antd'
import {
    userType
} from '../actionTypes/index'
class userReducer {
    
    constructor(){
        this.state = {
            users:[],// 用户列表
            roles:[],// 所有角色列表
            loading:true // 加载状态
        }
    }

    updateUser = (state=this.state,action) => {
        switch (action.type) {
            case userType.UPDATE_USER_SUCCESS:
                return message.success(action.msg);
            case userType.UPDATE_USER_ERROR:
                return message.error(action.msg);
            default:
                return state;
        }
    }

    getUser = (state=this.state,action) => {
        switch (action.type) {
            case userType.GET_USER_SUCCESS:
                message.success(action.msg);
                return { ...state, ...{
                    users: action.data.users,
                    roles: action.data.roles,
                    loading:false
                  }
                };
            case userType.GET_USER_ERROR:
                message.error(action.msg);
                return {
                    ...state, ...{
                        users: [],
                        roles: [],
                        loading:false
                      }
                };
            default:
                return {
                    ...state, ...{
                        users: [],
                        roles: [],
                        loading:true
                      }
                };;
        }
    }

    delUser = (state=this.state,action) => {
        switch (action.type) {
            case userType.DEL_USER_SUCCESS:
                return message.success(action.msg);
            case userType.DEL_USER_ERROR:
                return message.error(action.msg);
            default:
                return state;
        }
    }
    
}

export default new userReducer();