import {
    headerType
} from '../actionTypes/index'

class headerRedcuer {
    constructor(){
        this.initHeadTitle = '首页';
    }
    headTitle = (state=this.initHeadTitle,action) => {
        switch (action.type) {
            case headerType.SET_HEAD_TITLE:
                return action.data;
            default:
                return state;
        }
    }
}

export default new headerRedcuer();