import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import './login.less'
import logo from './images/logo.jpg'
import {reqLogin} from '../../api/index'
// 登录的路由组件
class Login extends Component {
    handleSubmit = (event) => {
        // 阻止表单默认行为
        event.preventDefault();
        // 对所有的表单字段进行校验
        this.props.form.validateFields(async (err, values) => {
            // 校验成功
            if (!err) {
                // console.log('提交登录的ajax请求', values);
                const {username,password} = values;
                const result = await reqLogin(username,password);
                // console.log('请求成功',response.data);
                // const result = response.data;
                if(result.status === 0){// 登录成功
                    // 提示登录成功
                    message.success('登录成功');
                    // 跳转到管理界面（不需要再回退到登录界面，所以用replace）
                    this.props.history.replace('/')
                }else{// 登录失败
                    // 提示错误信息
                    message.error(result.msg);
                }
            }else{
                console.log('校验失败!');
            }
        });
        
        // 得到form对象
        // const form = this.props.form;
        // // 获取表单项的输入数据
        // const values = form.getFieldsValue();
        // console.log('111',values);
    }

    validatorPwd = (rule,value,callback) => {
        if(!value){
            callback('密码必须输入');
        }else if(value.length<4){
            callback('密码长度不能小于4位');
        }else if(value.length>12){
            callback('密码长度不能大于12位');
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数字或下划线组成')
        }else{
            callback();//验证通过
        }
        // callback('xxx');//验证失败，并指定提示的文本
    }

    render() {
        // 得到具有强大功能的form对象
        const form = this.props.form;
        const { getFieldDecorator } = form;
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo' />
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                /* 
                                用户名/密码的合法性要求
                                1.必须输入
                                2.必须大于等于4位
                                3.必须小于等于12位
                                4.必须是英文、数字或下划线组成
                                */
                            }
                            {
                                getFieldDecorator('username',{//配置对象
                                    // 声明式验证
                                    rules:[
                                        { required: true, whitespace:true, message: '请输入用户名!' },
                                        { min: 4, message: '用户名至少4位!' },
                                        { max: 12, message: '用户名最多12位!' },
                                        { pattern:/^[a-zA-Z0-9_]+$/,message: '用户名必须是英文、数字或下划线组成'}
                                    ],
                                    initialValue:'admin',//初始值
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    rules:[
                                        {validator:this.validatorPwd}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/* 
1.高阶函数
    1).一类特别的函数
        a.接受函数类型的参数
        b.返回值是函数
    2).常见
        a.定时器：setTimeout()/setInterval()
        b.Promis：Promise(()=>{}) then(value=>{},reason=>{})
        c.数组遍历相关的方法：forEach()/filter()/map()/reduce()/find()/findIndex()
        d.函数对象的bind()
        e.Form.create() / getFieldDecorator()()
    3).高阶函数更新动态，更加具有拓展性
2.高阶组件
    1).本质就是一个函数
    2).接收一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入特定属性
    3).作用：拓展组件的功能
    4).高阶组件也是高阶函数：接收一个组件函数，返回是一个新的组件函数
*/

/* 
包装Form组件生成一个新的组件：Form(Login)
新组件会向Form组件传递一个强大的对象属性：form
*/

const WrapLogin = Form.create()(Login);
export default WrapLogin;


/* 
前台表单验证

用户名/密码的合法性要求
1.必须输入
2.必须大于等于4位
3.必须小于等于12位
4.必须是英文、数字或下划线组成
*/