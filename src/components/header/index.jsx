import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Modal,Icon} from 'antd'
import { connect } from 'react-redux'
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
        city:'',//所在区域
        weatherMax:'',//天气的最高温
        weatherMin:'',//天气的最低温
        weatherNotice:'',//天气的提示
        weatherInfo:'',//天气的信息
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
        let city = result.data.cityInfo.city;
        let {low,high,type,notice} = result.data.data.forecast[0];
        let templow = low.split(' ');
        let temphigh = high.split(' ');
        low = templow[templow.length-1];
        high = temphigh[temphigh.length-1];
        // 更新状态
        this.setState({
            city,//所在区域
            high,//天气的最高温
            low,//天气的最低温
            notice,//天气的提示
            type,//天气的信息
        });

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
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0);
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

    toggle = () => {
        this.props.toggle();
    };
    
    
    render(){
        const {curTime,city,low,high,type,notice} = this.state;
        let {collapsed} = this.props;
        const username = memoryUtils.user.username;
        const title = this.getTitle();
        return (
            <div className='header'>
                <div className='header-top'>
                    <span className='collapse' onClick={this.toggle}><Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} /></span>
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{curTime.toLocaleString()}</span>
                        <span style={{margin:'0 10px'}}>{type}</span>
                        <span style={{color:'green'}}>{low}</span>~<span style={{color:'red'}}>{high}</span>
                        <span style={{marginLeft:'10px'}}>{city}</span>
                        <span style={{color:'#F44336',marginLeft:'10px'}}>{notice}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default (withRouter(Header));