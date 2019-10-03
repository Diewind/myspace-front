import React,{Component} from 'react'
import { TreeSelect,Input, Form } from 'antd'
import PropsTypes from 'prop-types'
const Item = Form.Item;
class AddCate extends Component {
    static propsTypes = {
        setForm:PropsTypes.func.isRequired,
        categorys:PropsTypes.array.isRequired
    }
    state = {
        value: 0,
    };
    componentWillMount() {
        // 将form对象通过setForm()传递给父组件
        this.props.setForm(this.props.form);
    }
    onChange = value => {
        this.props.form.setFields({
            parentId: {
                value: value,
            }
        });
    }
    
    render() {
        const {getFieldDecorator} = this.props.form;
        const {categorys} = this.props;
        let newCategorys = new Array(...categorys);
        let getTreeCate = (arr) => {arr.forEach(v=>{
                v['title'] = v.name;
                v['key'] = v.id;
                v['value'] = v.id;
                if(v.children && v.children.length >0){
                    getTreeCate(v.children);
                }
            });
        };
        getTreeCate(newCategorys);
        newCategorys.push({id:0,pid:0,name:'顶级分类',title:'顶级分类',key:0,value:0});
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue: 0
                        })(
                            <TreeSelect
                                value={this.state.value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={newCategorys}
                                placeholder="请选择分类"
                                treeDefaultExpandAll
                                onChange={this.onChange}
                            />
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:'',
                            rules: [{ 
                                required: true, 
                                message: '分类名不能为空!' 
                            }]
                        })(
                            <Input placeholder='请输入分类名称' />
                        )
                    }
                </Item>
            </Form>
        );
    }
}
export default Form.create()(AddCate);