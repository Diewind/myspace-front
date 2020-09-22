import React, { Component } from 'react'
import {Select,Input,Row,Col,Form} from 'antd'
const Option = Select.Option;
class Flow extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            inputValue:'',
            children:[]
        }
    }
    changeHaddle = (e) => {
        console.log('val',e.target.value);
        if(!e.target.value){
            this.setState({
                children:[]
            })
        }else{
            let children = [];
            for (let i = 10; i < 36; i++) {
                children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
            }
            this.setState({
                children:children
            })
        }
        
    }
    cldOnSelect = (val) => {
        console.log('onsel',val);
        const {setFieldsValue} = this.props.form;
        this.setState({
            children:[]
        });
        setFieldsValue({
            'company':val
        });
    }
    cldOnChange = (val) => {
        console.log('onchg',val);
    }
    render() {
        const {inputValue,children} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Row>form表单demo</Row>
                    <Form.Item label="公司">
                        {getFieldDecorator('company', {
                            rules: [{ required: true, message: 'Please select your company!' }],
                            initialValue:inputValue
                        })(
                            <Input placeholder='请输入下拉选项' onChange={this.changeHaddle} />
                        )}
                    </Form.Item>
                <Row>
                    <Col span={24}>
                    {children.length > 0 && <Select style={{width:'100%'}} onSelect={this.cldOnSelect} onChange={this.cldOnChange}>
                        {
                            children
                        }
                    </Select>}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(Flow)