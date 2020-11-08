import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'

// 引入所有reducer
import reducers from '../reducers/index'

// 向外暴露Store
// export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
export default createStore(reducers,applyMiddleware(thunk));