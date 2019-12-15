import React,{Component} from 'react'
import { Input, Form } from 'antd'
import PropsTypes from 'prop-types'
const Item = Form.Item;
class AddForm extends Component {
    static propsTypes = {
        setForm:PropsTypes.func.isRequired
    }
    componentWillMount() {
        // 将form对象通过setForm()传递给父组件
        this.props.setForm(this.props.form);
    }
    
    render() {
        const {getFieldDecorator} = this.props.form;
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
            <Form>
                <Item label='角色名称' {...formItemLayout}>
                    {
                        getFieldDecorator('roleName',{
                            initialValue:'',
                            rules: [{ 
                                required: true, 
                                message: '角色名不能为空!' 
                            }]
                        })(
                            <Input placeholder='请输入角色名称' />
                        )
                    }
                </Item>
            </Form>
        );
    }
}
export default Form.create()(AddForm);