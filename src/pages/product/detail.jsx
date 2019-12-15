import React, { Component } from 'react'
import {
    Card,
    Icon,
    List,
    Row,
    Col,
    message
} from 'antd'
import Item from 'antd/lib/list/Item'
import LinkButton from '../../components/link-button'
import {reqCurCategory} from '../../api/index'
import './product.less'
// Product的详情子路由组件
export default class Detail extends Component {
    state={
        catename:''
    }
    componentDidMount() {
        this.getCateName();
    }

    getCateName = async () => {
        const {categoryId} = this.props.location.state.product;
        const result = await reqCurCategory(categoryId,'detail');
        if(result.status === 0){
            message.success('请求所在分类成功');
            this.setState({
                catename:result.data
            });
        }else{
            message.error('请求所在分类失败');
        }
    }
    
    render() {
        const {name,desc,price,detail,imgurls} = this.props.location.state.product;
        const {catename} = this.state;
        const title = (
            <span>
                <LinkButton>
                    <Icon 
                        type='arrow-left' 
                        style={{color:'green',marginRight:15,fontSize:20}}
                        onClick={()=>this.props.history.goBack()}
                    />
                </LinkButton>
                <span>商品详情</span>
            </span>
        );
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <Row>
                            <Col span={2} className='left'>商品名称：</Col>
                            <Col span={22}>{name}</Col>
                        </Row>
                    </Item>
                    <Item>
                        <Row>
                            <Col span={2} className='left'>商品描述：</Col>
                            <Col span={22}>{desc}</Col>
                        </Row>
                    </Item>
                    <Item>
                        <Row>
                            <Col span={2} className='left'>商品价格：</Col>
                            <Col span={22}>{price}元</Col>
                        </Row>
                    </Item>
                    <Item>
                        <Row>
                            <Col span={2} className='left'>所属分类：</Col>
                            <Col span={22}>{catename}</Col>
                        </Row>
                    </Item>
                    <Item>
                        <Row>
                            <Col span={2} className='left'>商品图片：</Col>
                            <Col span={22}>
                                {
                                    (imgurls && imgurls.map(img => (
                                        <img 
                                            className='product-img'
                                            key={img}
                                            src={img}
                                            alt='img'
                                        />
                                    ))) || '暂无图片'
                                }
                            </Col>
                        </Row>
                    </Item>
                    <Item>
                        <Row>
                            <Col span={2} className='left'>商品详情：</Col>
                            <Col span={22} dangerouslySetInnerHTML={{__html:detail}}></Col>
                        </Row>
                    </Item>
                </List>
            </Card>
        )
    }
}
