/**
 * App - 应用根组件
 * @date: 2021年2月23日20:23:16
 * @author: diewind
 * @version: 1.0.0
 */
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>{/* 只匹配其中一个 */}
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}