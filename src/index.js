/*
应用的入口文件
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
import {Provider} from 'react-redux'
import store from './store/store'
// 读取local中保存user，保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;

function render(){
    ReactDOM.render((
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root'));
}
render();
store.subscribe(render);