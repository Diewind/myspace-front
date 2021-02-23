/**
 * index - 应用入口文件
 * @date: 2021-2-23 20:21:33
 * @author: diewind
 * @version: 1.0.0
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
import { Provider } from 'react-redux'
import store from './store/stores/index'
// 读取local中保存user，保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;
function render() {
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ),
    document.getElementById('root'));
}
render();
store.subscribe(render);