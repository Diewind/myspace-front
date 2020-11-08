import React, { Component } from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import Cookies from 'js-cookie'
import memoryUtils from '../../utils/memoryUtils'

import Left from '../../components/left'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import ProductHome from '../product/home'
import ProductAddUpdate from '../product/addUpdate'
import ProductDetail from '../product/detail'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Mind from '../learnTools/mind'
import MindDetail from '../learnTools/mind/detail.jsx'
import Flow from '../learnTools/flow'
import FlowDetail from '../learnTools/flow/detail.jsx'
import Koni from '../learnTools/koni'
import KoniDetail from '../learnTools/koni/detail.jsx'
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
    }
    render() {
        const user = memoryUtils.user;
        // 如果内存中没有存储user,表示当前没有登录
        if(!user || !user.id || !Cookies.get('user')){
            // 自动跳转到登录
            return <Redirect to='/login/' />;
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
                            <Route path='/product' component={Product}>
                                <Switch>
                                    <Route path='/product' component={ProductHome} exact />
                                    <Route path='/product/addupdate' component={ProductAddUpdate} exact />
                                    <Route path='/product/detail' component={ProductDetail} exact />
                                    <Redirect to='/product' />
                                </Switch>
                            </Route>
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Route path='/learnTools' component={Koni}>
                                <Switch>
                                    <Route path='/learnTools/mind' component={Mind}>
                                        <Switch>
                                            <Route path='/learnTools/mind' component={Mind} exact />
                                            <Route path='/learnTools/mind/detail' component={MindDetail} exact />
                                            <Redirect to='/learnTools/mind' />
                                        </Switch>
                                    </Route>
                                    <Route path='/learnTools/flow' component={Flow}>
                                        <Switch>
                                            <Route path='/learnTools/flow' component={Flow} exact />
                                            <Route path='/learnTools/flow/detail' component={FlowDetail} exact />
                                            <Redirect to='/learnTools/flow' />
                                        </Switch>
                                    </Route>
                                    <Route path='/learnTools/koni' component={Koni}>
                                        <Switch>
                                            <Route path='/learnTools/koni' component={Koni} exact />
                                            <Route path='/learnTools/koni/detail' component={KoniDetail} exact />
                                            <Redirect to='/learnTools/koni' />
                                        </Switch>
                                    </Route>
                                    <Route component={NotFound} />
                                </Switch>
                            </Route>
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>本系统由pilot开发，版权所有，盗版必究！</Footer>
                </Layout>
            </Layout>
        )
    }
}