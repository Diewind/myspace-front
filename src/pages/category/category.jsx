import React, { Component } from 'react'
import {Card,Table,Input, InputNumber,Button,Icon,Form,message,Popconfirm,Modal} from 'antd'
import LinkButton from '../../components/link-button/index'
// 可编辑单元格组件
// import EditableInputs from '../../components/editableInput/index'
import {reqCategory,reqAddCategory,reqUpdateCategory,reqDeleteCategory} from '../../api/index'
import AddCate from './addCate'
import './index.less'
/* 
商品分类路由
*/
const EditableContext = React.createContext();
class EditableCell extends Component {

    getInput = () => {
      if (this.props.inputType === 'number') {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    renderCell = ({ getFieldDecorator }) => {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ],
                initialValue: record[dataIndex],
              })(this.getInput())}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
  
    render() {
      return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}
class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            categorys:[],//一级分类列表
            parentId:'0',//当前需要显示的分类列表的父分类Id
            parentName:'',//当前需要显示的分类列表的父分类名称
            editingKey:'',
            showAddStatus:false //是否显示添加的模态框
        }
        this.columns = [
            {
                title: '分类名',
                dataIndex: 'name',
                key: 'name',
                editable: true
            },
            {
                title: '操作',
                width:200,
                render:(text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                        <EditableContext.Consumer>
                            {form => (
                            <LinkButton
                                onClick={() => this.save(form, record.key)}
                                style={{ marginRight: 8 }}
                            >
                                保存
                            </LinkButton>
                            )}
                        </EditableContext.Consumer>
                        <Popconfirm title="是否离开?" onConfirm={() => this.cancel(record.key)}>
                            <LinkButton>离开</LinkButton>
                        </Popconfirm>
                        </span>
                    ) : (
                        [<LinkButton disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                        编辑
                        </LinkButton>,
                        <Popconfirm title="是否删除?" onConfirm={() => this.del(record.key)}>
                            <LinkButton type='danger-button'>删除</LinkButton>
                        </Popconfirm>
                        ]
                    );


                    // <span>
                    //     <LinkButton>修改</LinkButton>
                    //     <LinkButton type='danger-button'>删除</LinkButton>
                    // </span>
                }
            }
        ];
    
    }


    /* 
    异步获取一级分类列表显示
    */
    getCategorys = async () => {
        // 在发请求前，显示loading
        this.setState({loading:true});
        const result = await reqCategory(0);
        // 在发请求完成后，隐藏loading
        this.setState({loading:false});
        // 发异步ajax请求，获取数据
        if(result.status === 0){
            let categorys = result.data;
            this.treeMap(categorys);
            // 更新状态
            this.setState({
                categorys
            });
        }else{
            message.error(result.msg);
        }
    }

    // 添加分类模态框取消事件
    handleCancel = () => {
        this.form.resetFields();
        this.setState({showAddStatus:false});
    }

    // 显示添加的默认框
    showAddCate = () => {
        this.setState({showAddStatus:true});
    }

    // 添加分类
    addCategory = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                // let {parentId,categoryName} = this.form.getFieldsValue();
                let {parentId,categoryName} = values;
                const result = await reqAddCategory(parentId,categoryName);
                try {
                    let {status,msg} = result;
                    if(status === 0){
                        message.success(msg);
                        this.handleCancel();
                        this.getCategorys();
                    }else{
                        message.error(msg);
                        return;
                    }
                    
                } catch (error) {
                    console.log(error);
                }
            }
        });
        
    }

    // 遍历无限级分类给所有父子元素添加key
    treeMap = (categorys) => {
        categorys.map(v=>{
            if(v['children']){
                this.treeMap(v['children']);
            }
            return v['key'] = v.id;
        });
    }
    // 深层遍历查找树
    treeSearch = (str,categorys) => {
        let isExist = false;
        let isGet = (str,categorys) => {
            categorys.forEach(v=>{
                if(str === v.name){
                    isExist = true;
                }
                if(v['children'] && v['children'].length > 0){
                    isGet(str,v['children']);
                }
            });
        }
        isGet(str,categorys);
        return isExist;
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getCategorys();
    }
    
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields(async (error, row) => {
            if (error) {
                return;
            }
            this.setState({ editingKey: '' });
            // 如果改动的数据和以前没变化，那么不发送更新的请求
            const updateName = row.name;
            const cateDatas = this.state.categorys;
            let isExists = this.treeSearch(updateName,cateDatas);
            if(isExists){
                message.warn('分类名已存在！');
                return;
            }

            const result = await reqUpdateCategory({categoryId:key,categoryName:updateName});
            try {
                let {status,msg} = result;
                if(status === 0){
                    message.success(msg);
                }
                this.getCategorys();
            } catch (error) {
                console.log(error);
            }
        });
    }
    
    edit(key) {
        this.setState({ editingKey: key });
    }

    del = async(key) => {
        const result = await reqDeleteCategory(key);
        try {
            let {status,msg} = result;
            if(status === 0){
                message.success(msg);
            }
            this.getCategorys();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const components = {
            body: {
              cell: EditableCell
            }
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    id:col.id,
                    editing: this.isEditing(record),
                }),
            };
        });
        // 读取状态数据
        const {categorys,loading,showAddStatus} = this.state;
        // card的左侧
        const title = '分类列表';
        // card的右侧
        const extra = (
            <Button type='primary' onClick={this.showAddCate}>
                <Icon type='plus' />
                添加
            </Button>
        )
        return (
            <EditableContext.Provider value={this.props.form}>
                <Card title={title} extra={extra}>
                    <Table
                        components={components}
                        dataSource={categorys}
                        columns={columns}
                        rowClassName="editable-row"
                        rowKey={'id'}
                        bordered={true}
                        loading={loading}
                        pagination={{
                            defaultPageSize:5,
                            showQuickJumper:true
                        }}
                        size='small'
                    />
                </Card>
                <Modal
                    title="添加分类"
                    visible={showAddStatus}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddCate setForm={form=>this.form = form} categorys={categorys} />
                </Modal>
            </EditableContext.Provider>
        )
    }
}
const EditableCategory = Form.create()(Category);
export default EditableCategory;