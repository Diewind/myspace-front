import {combineReducers} from 'redux'

import headerReducer from './headerReducer.js';
import userReducer from './userReducer.js';
/* ---- 包含n个action的type常量标识名称的模块 ---- */
export default combineReducers({
    ...headerReducer,
    ...userReducer,
});