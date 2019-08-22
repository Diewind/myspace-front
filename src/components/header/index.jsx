import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'
import LinkButton from '../link-button/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqWeather} from '../../api/index'
import menuConfig from '../../config/menu.config'
import './index.less'
/* 
头部组件
*/
class Header extends Component{
    state = {
        curTime:new Date(),
        dayPictureUrl:'',//天气图片
        weather:'',//天气的文本
    }
    /* 
    第一次render()之后执行一次
    一般执行异步操作：发ajax请求/启动定时器
    */
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        this.getWeather();
    }
    tick() {
        this.setState({
            curTime: new Date()
        });
    }
    // 退出登录
    logout = () => {
        // 显示确认框
        Modal.confirm({
            title: '确认退出吗?',
            onOk: () => {
                // 删除保存的user数据
                storageUtils.removeUser();
                memoryUtils.user = {};
                // 跳转到login
                this.props.history.replace('/login');
            }
        });
    }
    
    getWeather = async () => {
        // 调用接口请求异步获取天气
        const result = await reqWeather('上海');
        const {img2,weather} = result.data.weatherinfo;
        // 更新状态
        this.setState({dayPictureUrl:img2,weather});

    }
    getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname;
        let title = '';
        menuConfig.forEach(item => {
            if(item.key === path){// 如果当前item对象的key与path一样，item的title就是要显示的title
                title = item.title;
            }else if(item.children){
                // 在所有子item中查找匹配的
                const cItem = item.children.find(cItem => cItem.key === path);
                // 如果有值才说明有匹配的
                if(cItem){
                    // 取出它的title
                    title = cItem.title;
                }
            }
        });
        return title;
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    
    render(){
        const {curTime,dayPictureUrl,weather} = this.state;
        const username = memoryUtils.user.username;
        const title = this.getTitle();
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{curTime.toLocaleString()}</span>
                        <img src={`http://www.weather.com.cn/m/i/weatherpic/29x20/${dayPictureUrl}`} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);