import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menu.config'
import './index.less'
import logo from '../../assets/images/logo.jpg'


const { SubMenu } = Menu;
/* 
左侧导航组件
*/
class LeftNav extends Component{
    /* 
    根据menu的数据数组生成对应的标签数组
    使用map()+递归调用
    */
    // getMenuNodes = (menuList = []) => {
    //     return menuList.map(item=>{
    //         if(!item.children){
    //             return (
    //             <Menu.Item key={item.key}>
    //                 <Link to={item.key}>
    //                     <Icon type={item.icon} />
    //                     <span>{item.title}</span>
    //                 </Link>
    //             </Menu.Item>
    //             )
    //         }else{
    //             return (
    //                 <SubMenu
    //                     key={item.key}
    //                     title={
    //                         <span>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                         </span>
    //                     }
    //                     >
    //                     {this.getMenuNodes(item.children)}
    //                 </SubMenu>
    //             );
    //         }
            
    //     });

    // }

    /* 
    根据menu的数据数组生成对应的标签数组
    使用reduce()+递归调用
    */
    getMenuNodes = (menuList = []) => {
        // 得到当前请求的路由路径
        const path = this.props.location.pathname;
        return menuList.reduce((pre,item)=>{
            // 向pre添加<Menu.Item>
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else{
                // 查找一个与当前路径匹配的子Item
                const cItem = item.children.find(cItem=>cItem.key===path);
                // 如果存在，说明当前item所对应的子列表需要展开
                if(cItem){
                    this.openKey = item.key;
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                            </span>
                        }
                        >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            // 向pre添加<SubMenu>
            return pre;
        },[]);
    }

    /* 
    在第一次render()之前执行一次
    为第一个render()准备数据(必须同步的)
    */
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render(){
        // 得到当前请求的路由路径
        const path = this.props.location.pathname;
        // 得到当前需要打开菜单项的key
        const openKey = this.openKey;
        return (
            <div>
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>mixapi后台</h1>
                </Link>
                <Menu theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]} mode="inline">
                    {/* <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <Icon type="appstore" />
                        <span>商品</span>
                        </span>
                    }
                    >
                    <Menu.Item key="/category">
                        <Link to='/category'>
                            <span>
                            <Icon type="bars" />
                            <span>品类管理</span>
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/product">
                        <Link to='/product'>
                            <span>
                            <Icon type="credit-card" />
                            <span>商品管理</span>
                            </span>
                        </Link>
                    </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user">
                        <Link to='/user'>
                            <span>
                            <Icon type="user" />
                            <span>用户管理</span>
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role">
                        <Link to='/role'>
                            <span>
                            <Icon type="solution" />
                            <span>角色管理</span>
                            </span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                    key="sub2"
                    title={
                        <span>
                        <Icon type="area-chart" />
                        <span>图形图表</span>
                        </span>
                    }
                    >
                    <Menu.Item key="/bar">
                        <Link to='/charts/bar'>
                            <span>
                            <Icon type="bar-chart" />
                            <span>柱形图</span>
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/line">
                        <Link to='/charts/line'>
                            <span>
                            <Icon type="line-chart" />
                            <span>折线图</span>
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/pie">
                        <Link to='/charts/pie'>
                            <span>
                            <Icon type="pie-chart" />
                            <span>饼图</span>
                            </span>
                        </Link>
                    </Menu.Item>
                    </SubMenu>*/}

                    {this.menuNodes}
                </Menu>
            </div>

            </div>
        )
    }
}

/* 
withRouter高阶组件
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递3个属性：history/location/match
*/
export default withRouter(LeftNav);