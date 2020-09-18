import React, { Component } from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import Left from '../../components/left'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Mind from '../learnTools/mind'
import Flow from '../learnTools/flow'
import Koni from '../learnTools/koni'
import NotFound from '../notFound'
import { Layout } from 'antd';
const { Content, Footer, Sider } = Layout;



// 管理的路由组件
export default class Admin extends Component {
    state = {
        collapsed:false
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const user = memoryUtils.user;
        // 如果内存中没有存储user,表示当前没有登录
        if(!user || !user.id){
            // 自动跳转到登录
            // return <Redirect to='/login/' />;
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <Left collapsed={this.state.collapsed} />
                </Sider>
                <Layout>
                    <Header
                        collapsed={this.state.collapsed}
                        toggle={this.toggle}
                    />
                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Redirect exact from='/' to='/home' />
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Route path='/learnTools/mind' component={Mind} />
                            <Route path='/learnTools/flow' component={Flow} />
                            <Route path='/learnTools/koni' component={Koni} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>本系统由pilot开发，版权所有，盗版必究！</Footer>
                </Layout>
                
            </Layout>
        )
    }
}
