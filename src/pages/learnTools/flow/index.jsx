import React, { Component } from 'react'
import {
    Select,
    Input,
    Button,
    Card,
    Icon,
    Table,
    message
} from 'antd'
import LinkButton from '../../../components/link-button'
import {reqProducts,reqSearchProducts,reqUpdateStatus,delProduct} from '../../../api'
import {PAGE_SIZE} from '../../../utils/constants'

import Mock from 'mockjs'
const Option = Select.Option;

export default class Index extends Component {
    state = {
        total:0,//商品的总数量
        products:Mock.mock({
            'list|200': [{
                'id': '@guid()',
                'title': '@ctitle()',
                'desc': '@cparagraph',
                'category':'@cword(3)',
                'updateTime':'@datetime()',
            }]
        }).list,//商品的数组
        loading:false,
        searchName:'', //搜索的关键字
        searchType:'productName'//根据哪个字段搜索
    }
    updateStatus = async (productId,status) => {
        const result = await reqUpdateStatus(productId,status);
        if(result.status === 0){
            message.success('更新状态成功');
            this.getProducts(this.pageNum);
        }else{
            message.error('更新状态失败');
        }
    }
    // 初始化table的列的数组
    initColumns = () => {
        // this.setState({
        //     products:[
        //         {
        //         id: '1',
        //         title: '苹果笔记本',
        //         desc: '网上一直流传有MacBook Pro 2019的渲染图,而近日有人从最新的macOS beta版系..',
        //         category:'数学',
        //         updateTime:'2020年10月19日15:18:47',
        //         }
        //     ]
        // });
        this.columns = [
            {
                title: '名称',
                dataIndex: 'title',
                width:'15%',
                ellipsis:true
            },
            {
                title: '描述',
                dataIndex: 'desc',
                width:'50%',
                ellipsis:true
            },
            {
                title: '所属分类',
                dataIndex: 'category',
                width:'15%',
                ellipsis:true
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                width:'20%',
                ellipsis:true
            },
            {
                title: '操作',
                width: '20%',
                render: (product) => {
                    return (
                        <span>
                            <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
                            <LinkButton onClick={()=>this.props.history.push('/product/addupdate',{product})}>修改</LinkButton>
                            <LinkButton onClick={()=>{this.deletePro(product)}} style={{color:'red'}}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    // 删除商品
    deletePro = async (product) => {
        const {id} = product;
        const result = await delProduct(id);
        try {
            if(result.status === 0){
                message.success('删除商品成功！');
                this.getProducts(this.pageNum);
            }else{
                message.error('删除商品失败');
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 获取指定页面的列表数据显示
    getProducts = async (pageNum) => {
        // 保存当前所在页,让其他方法可以用到
        this.pageNum = pageNum;
        this.setState({loading:true});
        const {searchName,searchType} = this.state;
        // 如果搜索关键字有值，说明要搜索分页
        let result;
        this.setState({loading:false});
        if(searchName){
            result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType});
        }else{
            result = await reqProducts(pageNum,PAGE_SIZE);
        }
        this.setState({loading:false});
        try {
            if(result.status === 0){
                // 取出分页数据，更新状态，显示分页列表
                const {total,list} = result.data;
                this.setState({
                    total,
                    products:list
                });
            }else{
                message.error('获取商品失败');
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        // this.getProducts(1);
    }
    
    
    render() {
        // 取出商品数组
        const {products,total,loading,searchType,searchName} = this.state;
        const title = (
            <span>
                <Select value={searchType} style={{width:150}} onChange={value=>{this.setState({searchType:value})}}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width:150,margin:'0 15px'}} defaultValue={searchName} onChange={event=>{this.setState({searchName:event.target.value})}} />
                <Button type='primary' onClick={()=>{this.getProducts(1)}}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={()=>{this.props.history.push('/learnTools/flow/detail')}}>
                <Icon type='plus' />
                添加
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    dataSource={products}
                    columns={this.columns}
                    rowKey='id'
                    loading={loading}
                    pagination={{
                        current:this.pageNum,
                        defaultPageSize:PAGE_SIZE,
                        total,
                        showQuickJumper:true,
                        onChange:this.getProducts
                    }}
                    size='small'
                    scroll='120%'
                />
            </Card>
        )
    }
}
