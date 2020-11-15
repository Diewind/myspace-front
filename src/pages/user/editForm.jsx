import React,{PureComponent} from 'react'
import { Input, Form,Select } from 'antd'
import PropsTypes from 'prop-types'
const Item = Form.Item;
const Option = Select.Option;
class EditForm extends PureComponent {
    static propsTypes = {
        setForm:PropsTypes.func.isRequired,
        roles:PropsTypes.array.isRequired,
        user:PropsTypes.object
    }
    componentWillMount() {
        // 将form对象通过setForm()传递给父组件
        this.props.setForm(this.props.form);
    }
    
    render() {
        const {getFieldDecorator} = this.props.form;
        const {roles,user} = this.props;
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: {
              span: 4
            },
            wrapperCol: {
              span: 18
            }
        };
        return (
            <Form {...formItemLayout}>
                <Item label='用户名'>
                    {
                        getFieldDecorator('username',{
                            initialValue:user.username,
                            rules: [{ 
                                required: true, 
                                message: '用户名不能为空!' 
                            }]
                        })(
                            <Input placeholder='请输入用户名' />
                        )
                    }
                </Item>
                {
                    user.id ? null : (
                        <Item label='密码'>
                            {
                                getFieldDecorator('password',{
                                    initialValue:user.password,
                                    rules: [{ 
                                        required: true, 
                                        message: '密码不能为空!' 
                                    }]
                                })(
                                    <Input type='password' placeholder='请输入密码' />
                                )
                            }
                        </Item>
                    )
                }
                <Item label='手机号'>
                    {
                        getFieldDecorator('phone',{
                            initialValue:user.phone,
                            rules: [{ 
                                required: true, 
                                message: '手机号不能为空!' 
                            }]
                        })(
                            <Input placeholder='请输入手机号' />
                        )
                    }
                </Item>
                <Item label='邮箱'>
                    {
                        getFieldDecorator('email',{
                            initialValue: user.email
                        })(
                            <Input placeholder='请输入邮箱' />
                        )
                    }
                </Item>
                <Item label='角色'>
                    {
                        getFieldDecorator('roleId',{
                            initialValue:user.roleId
                        })(
                            <Select placeholder='请选择角色'>
                                {
                                    roles.map(role=>
                                        <Option key={role.id} value={role.id}>{role.name}</Option>
                                    )
                                }
                            </Select>
                        )
                    }
                </Item>
            </Form>
        );
    }
}
export default Form.create()(EditForm);