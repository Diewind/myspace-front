import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import LinkButton from '../../components/link-button/index'
import {PAGE_SIZE} from '../../utils/constants'
import {reqUsers,reqAddUser,reqDeleteUser,reqUpdateUser} from '../../api/index'
import EditForm from './editForm'
/* 
用户路由
*/
export default class User extends Component {

    state = {
        users:[],// 用户列表
        roles:[],//所有角色列表
        isShow:false
    }
    initCouumns = () => {
        this.columns = [
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'邮箱',
                dataIndex:'email'
            },
            {
                title:'电话',
                dataIndex:'phone'
            },
            {
                title:'注册时间',
                dataIndex:'createTime'
            },
            {
                title:'所属角色',
                dataIndex:'roleId',
                render:(roleId)=>this.roleNames[roleId]
            },
            {
                title:'操作',
                render:(user)=>(
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton type='danger-button' onClick={()=>this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            }
        ]
    }
    // 根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
    initRoleNames = (roles) => {
        const roleNames =  roles.reduce((pre,role)=>{
            pre[role.id] = role.name;
            return pre;
        },{});
        // 保存
        this.roleNames = roleNames;
    }
    // 显示修改界面
    showUpdate = (user) => {
        this.user = user;// 保存user
        this.setState({
            isShow:true
        });
    }
    // 添加/更新用户
    updateUser = () => {
        
        // 首先进行表单验证
        this.form.validateFields(async (error,values)=>{
            if(!error){
                this.setState({
                    isShow:false
                });
                // 1.收集输入数据
                const user = this.form.getFieldsValue();
                // 如果是更新，需要user中有id
                if(this.user){
                    user.id = this.user.id;
                }
                this.form.resetFields();
                // 2.提交添加的请求
                const result = this.user ? await reqUpdateUser(user) : await reqAddUser(user);
                // 3.更新列表显示
                if(result.status === 0){
                    message.success(`${this.user ? '修改' : '添加'}用户成功！`);
                    this.getUsers();
                }else{
                    // message.error(result.msg);
                }
            }
        });
    }
    // 删除用户
    deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除${user.username}吗？`,
            onOk: async () => {
                const result = await reqDeleteUser(user.id);
                if(result.status === 0){
                    message.success('删除用户成功！');
                    this.getUsers();
                }else{
                    message.error(result.msg);
                }
            }
        });
    }
    // 获取所有用户
    getUsers = async () => {
        const result = await reqUsers();
        if(result.status === 0){
            const {users,roles} = result.data;
            this.initRoleNames(roles);
            this.setState({
                users,
                roles
            });
        }
    }
    // 显示添加界面
    showAdd = () => {
        this.user = null;// 去除保存的user
        this.setState({
            isShow:true
        })
    }

    componentWillMount() {
        this.initCouumns();
    }
    componentDidMount() {
        this.getUsers();
    }
    
    
    render() {
        const {users,isShow,roles} = this.state;
        const user = this.user || {};
        const title = <Button type='primary' onClick={this.showAdd}>创建用户</Button>;
        return (
            <Card title={title}>
                <Table 
                    bordered
                    columns={this.columns}
                    rowKey={'id'}
                    dataSource={users}
                    pagination={{
                        defaultPageSize:PAGE_SIZE
                    }}
                    // rowSelection={{type:'radio',selectedRowKeys:[role.id]}}
                    // onRow={this.onRow}
                />
                <Modal
                    title={user.id ? '修改用户' : '添加用户'}
                    visible={isShow}
                    onOk={this.updateUser}
                    onCancel={()=>{
                        this.setState({
                            isShow:false
                        });
                        this.form.resetFields();
                    }}
                >
                    <EditForm 
                        setForm={(form)=>{this.form = form}}
                        roles={roles}
                        user={user}
                    />
                </Modal>
            </Card>
        )
    }
}
