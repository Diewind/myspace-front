class userType {

    constructor(){

        // 新增/更新用户
        this.UPDATE_USER_SUCCESS = 'update_user_list_success';
        this.UPDATE_USER_ERROR = 'update_user_list_error';

        // 获取用户列表状态
        this.GET_USER_SUCCESS = 'get_user_list_success';
        this.GET_USER_ERROR = 'get_user_list_error';
        
        // 删除用户状态
        this.DEL_USER_SUCCESS = 'del_user_success';
        this.DEL_USER_ERROR = 'del_user_error';

    }

}
export default new userType();