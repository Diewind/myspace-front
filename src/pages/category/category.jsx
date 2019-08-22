import React, { Component } from 'react'
import {Card,Table,Button,Icon} from 'antd'
import LinkButton from '../../components/link-button/index'
/* 
商品分类路由
*/
const dataSource = [
    {
      key: '1',
      name: '胡彦斌'
    },
    {
      key: '2',
      name: '胡彦祖'
    },
];
  
const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      width:300,
      render:() => (
          <span>
              <LinkButton>修改分类</LinkButton>
              <LinkButton>查看子分类</LinkButton>
          </span>
      )
    }
];
  
  
export default class Category extends Component {
    render() {
        // card的左侧
        const title = '一级分类列表';
        // card的右侧
        const extra = (
            <Button type='primary'>
                <Icon type='plus' />
                添加
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table dataSource={dataSource} columns={columns} bordered={true} />;
                </Card>
            </div>
        )
    }
}
