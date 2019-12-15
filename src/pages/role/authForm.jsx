import React,{Component} from 'react'
import { 
    Input, 
    Form,
    Tree
} from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menu.config'
const Item = Form.Item;
const { TreeNode } = Tree;
class AuthForm extends Component {

    static propsTypes = {
        role:PropTypes.object
    }

    constructor(props){
        super(props);
        const {menus} = this.props.role;
        this.state = {
            checkedKeys:menus
        }
    }

    getTreeNode = (menuList) => {
        return menuList.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNode(item.children) : null}
                </TreeNode>
            )
            return pre;
        },[]);
    }

    // 为父组件提交获取menus最新数据的方法
    getMenus = () => this.state.checkedKeys;

    // 选中某个node时的回调
    onCheck = checkedKeys => {
        this.setState({
            checkedKeys
        });
    }

    componentWillMount() {
        this.treeNode = this.getTreeNode(menuList);
    }

    // 根据新传入的role来更新checkedKeys状态
    componentWillReceiveProps(nextProps){
        const menus = nextProps.role.menus;
        this.setState({
            checkedKeys:menus
        });
    }
    
    render() {
        const {role} = this.props;
        const {checkedKeys} = this.state;
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: {
              span: 4
            },
            wrapperCol: {
              span: 18
            }
        };
        return (
            <div>
                <Item label='角色名称' {...formItemLayout}>
                    {
                        <Input disabled value={role.name} />
                    }
                </Item>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {this.treeNode}
                    </TreeNode>
                </Tree>
            </div>
        );
    }
}
export default AuthForm;