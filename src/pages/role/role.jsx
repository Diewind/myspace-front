import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message,
    Popconfirm,
    Icon
} from 'antd'
import {PAGE_SIZE} from '../../utils/constants'
import {reqRoles,reqAddRole,reqUpdateRole,reqDeleteRole} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import AddForm from './addForm'
import AuthForm from './authForm'
/* 
角色路由
*/
class Role extends Component {
    state={
        roles:[], // 所有角色的列表
        role:{}, // 选中的role
        showAddStatus:false, // 是否显示添加界面
        showAuthStatus:false // 是否显示设置用户权限界面
    }
    constructor(props){
        super(props);
        this.auth = React.createRef();
    }
    componentWillMount() {
        this.initColumn();
    }
    componentDidMount() {
        this.getRoles();
    }
    
    getRoles = async () => {
        const result = await reqRoles();
        if(result.status === 0){
            const roles = result.data;
            this.setState({
                roles
            })
        }
    }
    // 添加角色
    addRole = () => {
        // 进行表单验证
        this.form.validateFields(async (error,values)=>{
            if(!error){
                const {roleName} = values;
                this.form.resetFields();
                const result = await reqAddRole(roleName);
                const {msg,status} = result;
                if(status === 0){
                    message.success(msg);
                    this.setState({
                        showAddStatus:false
                    });
                    this.getRoles();
                }else{
                    message.error(msg);
                }
            }
        })
    }
    // 删除角色
    deleteRole = async () => {
        const {id} = this.state.role;
        // 请求更新
        const result = await reqDeleteRole(id);
        if(result.status === 0){
            message.success('删除角色成功!');
            this.getRoles();
        }else{
            message.error(result.msg);
        }
    }
    // 设置角色权限
    updateRole = async () => {
        const role = this.state.role;
        // 得到最新的menus
        const menus = this.auth.current.getMenus();
        role.menus = menus;
        role.authorizer = memoryUtils.user.username;
        // 请求更新
        const result = await reqUpdateRole(role);
        if(result.status === 0){
            // 如果更新的是自己角色的权限，强制退出
            if(role.id === memoryUtils.user.role.id){
                memoryUtils.user={};
                storageUtils.removeUser();
                this.props.history.replace('/login');
                message.info('当前用户角色权限修改了，重新登录!');
            }else{
                message.success('设置角色权限成功!');
                this.setState({
                    showAuthStatus:false
                });
                this.getRoles();
            }
            
        }else{
            message.error(result.msg);
        }
    }
    initColumn = () => {
        this.columns = [
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'createTime'
            },
            {
                title:'授权时间',
                dataIndex:'authTime'
            },
            {
                title:'授权人',
                dataIndex:'authorizer'
            },
        ]
    }

    onRow = (role) => {
        return {
            onClick: event=>{ // 点击行
                this.setState({
                    role
                })
            }
        }
    }

    render() {
        const {roles,role,showAddStatus,showAuthStatus} = this.state;
        const title = (
            <span>
                <Button type='primary' onClick={()=>{this.setState({
                    showAddStatus:true
                })}}>创建角色</Button>
                <Popconfirm
                    title="确定要删除吗？"
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                    onConfirm={this.deleteRole}
                    placement="bottomLeft"
                    disabled={!role.id}
                >
                    <Button type='danger' style={{marginLeft:20}} disabled={!role.id}>删除角色</Button>
                </Popconfirm>
                <Button type='primary' style={{marginLeft:20}} disabled={!role.id} onClick={()=>{this.setState({
                    showAuthStatus:true
                })}}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table 
                    bordered
                    columns={this.columns}
                    rowKey={'id'}
                    dataSource={roles}
                    pagination={{
                        defaultPageSize:PAGE_SIZE
                    }}
                    rowSelection={{
                        type:'radio',
                        selectedRowKeys:[role.id],
                        onSelect:(role)=>{// 选择某个radio的回调
                            this.setState({
                                role
                            });
                        }
                    }}
                    onRow={this.onRow}
                    size='small'
                />
                <Modal
                    title="添加角色"
                    visible={showAddStatus}
                    onOk={this.addRole}
                    onCancel={()=>{
                        this.setState({
                            showAddStatus:false
                        });
                        this.form.resetFields();
                    }}
                >
                    <AddForm setForm={form=>this.form = form} />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={showAuthStatus}
                    onOk={this.updateRole}
                    onCancel={()=>{
                        this.setState({
                            showAuthStatus:false
                        });
                    }}
                >
                    <AuthForm
                        role={role}
                        ref={this.auth}
                    />
                </Modal>
            </Card>
        )
    }
}

export default Role;