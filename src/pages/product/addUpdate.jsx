import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    Icon,
    message
} from 'antd'
import LinkButton from '../../components/link-button'
import {reqCategory,addProduct,reqCurCategory} from '../../api/index'
import PicturesWall from './picturesWall'
import RichTextEditor from './richTextEditor'
const { Item } = Form
const { TextArea } = Input
class AddUpdate extends Component {

    constructor(props){
        super(props);
        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef();
        this.editor = React.createRef();
    }

    state = {
        options:[],
        categoryIds:[]
    };

    /**
     * 深度递归搜索
     * @param {Array} arr 你要搜索的数组
     * @param {Function} condition 回调函数，必须返回谓词，判断是否找到了。会传入(item, index, level)三个参数
     * @param {String} children 子数组的key
    */
    deepFind = (arr, condition, children) => {
        // 即将返回的数组
        let main = []

        // 用try方案方便直接中止所有递归的程序
        try {
            // 开始轮询
            (function poll(arr, level) {
                // 如果传入非数组
                if (!Array.isArray(arr)) return

                // 遍历数组
                for (let i = 0; i < arr.length; i++) {
                    // 获取当前项
                    const item = arr[i]

                    // 先占位预设值
                    main[level] = item

                    // 检验是否已经找到了
                    const isFind = (condition && condition(item, i, level)) || false

                    // 如果已经找到了
                    if (isFind) {
                        // 直接抛出错误中断所有轮询
                        throw Error

                    // 如果存在children，那么深入递归
                    } else if (children && item[children] && item[children].length) {
                        poll(item[children], level + 1)

                    // 如果是最后一个且没有找到值，那么通过修改数组长度来删除当前项
                    } else if (i === arr.length - 1) {
                    // 删除占位预设值
                    main.length = main.length - 1
                    }
                }
            })(arr, 0)
        // 使用try/catch是为了中止所有轮询中的任务
        } catch (err) {}

        // 返回最终数组
        return main
    }

    getCurCategory = async () => {
        const {categoryId} = this.props.location.state.product;
        const result = await reqCurCategory(categoryId,'edit');
        const catearrs = result.data;
        if(result.status === 0){
            this.setState({
                categoryIds:catearrs
            });
            return catearrs;
        }else{
            message.error('请求所在分类失败');
        }
    }

    componentWillMount() {
        const {product} = this.props.location.state || {};//如果是添加没值，否则有值
        // 保存是否是更新的标识
        this.isUpdate = !!product;
        this.product = product || {};
    }
    
    componentDidMount() {
        this.getCategorys(0);
    }

    /* 
    验证价格的自定义函数
    */
    validatePrice = (rule,value,callback) => {
        if(value*1 > 0){
            callback();// 验证通过
        }else{
            callback('价格必须大于0');// 验证没通过
        }
    }

    submit = () => {
        this.props.form.validateFields(async (error,values)=>{
            if(!error){
                const imgs = this.pw.current.getImgs();
                const detail = this.editor.current.getDetail();
                // 获取最后一个选中的分类id
                const curCateId = values.categoryIds.length > 0 && values.categoryIds[values.categoryIds.length-1];
                const {categoryIds,...others} = values;
                const {id} = this.product;
                const params = {
                    ...others,
                    curCateId,
                    imgs,
                    detail,
                    id:id?id:'',
                    pageflag:id?'edit':'add'// 判断是否是新增页面
                };
                const result = await addProduct(params);
                try {
                    if(result.status === 0){
                        message.success('更新商品成功！');
                        this.props.history.push('/product');
                    }else{
                        message.error(result.msg);
                    }
                } catch (e) {
                    console.log(e);
                }
            }else{

            }
        })
    }

    // 获取一级/二级列表
    getCategorys = async (parentId) => {
        const result = await reqCategory(parentId);
        if(result.status === 0){
            const {data} = result;
            // 如果是一级分类列表
            if(parentId === 0){
                this.initOptions(data);
            }else{//二级列表
                return data;
            }
            
        }
    }

    initOptions = async (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map(c=>({
            value:c.id,
            label:c.name,
            isLeaf:c.children ? false : true
        }));
        // 如果是修改，才去获取当前商品所在分类
        if(this.product.id){
            const cateArrs = await this.getCurCategory();
            const {isUpdate} = this;
            if(isUpdate && cateArrs.length>1){
                const subCategorys = await this.getCategorys(cateArrs[0]);
                const childOptions = subCategorys.map(c=>({
                    value:c.id,
                    label:c.name,
                    isLeaf:true
                }));
                const targetOption = options.find(option=>option.value === cateArrs[0]);
                targetOption.children = childOptions;
            }
        }
        // 更新options状态
        this.setState({
            options
        });
    }
    
    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };
    
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        // 根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value);
        targetOption.loading = false;
        if(subCategorys && subCategorys.length >0){
            // 生成二级列表options
            const childOptions = subCategorys.map(c=>({
                value:c.id,
                label:c.name,
                isLeaf:false
            }));
            targetOption.children = childOptions;
        }else{//当前选中的分类没有二级分类
            targetOption.isLeaf = true;
        }
        // 更新options状态
        this.setState({
            options: [...this.state.options],
        });
    };

    render() {
        const {isUpdate,product} = this || {};
        // 所在级联分类ID的数组
        const {categoryIds} = this.state;
        const {imgurls} = this.product.id ? this.props.location.state.product : [];
        const title = (
            <span>
                <LinkButton onClick={()=>{this.props.history.goBack()}}>
                    <Icon type='arrow-left' />
                </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        );
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: {
              span: 2
            },
            wrapperCol: {
              span: 8
            }
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label='商品名称：'>
                        {getFieldDecorator('name',{
                            initialValue:product.name || '',
                            rules:[
                                {required:true,message:'必须输入商品名称'}
                            ]
                        })(<Input placeholder='请输入商品名称' />)}
                    </Item>
                    <Item label='商品描述：'>
                        {getFieldDecorator('desc',{
                            initialValue:product.desc || '',
                            rules:[
                                {required:true,message:'必须输入商品描述'}
                            ]
                        })(<TextArea placeholder='请输入商品描述' autosize={{minRows:2,maxRows:6}} />)}
                    </Item>
                    <Item label='商品价格：'>
                        {getFieldDecorator('price',{
                            initialValue:product.price || null,
                            rules:[
                                {
                                    required:true,
                                    message:'必须输入商品价格'
                                },
                                {validator:this.validatePrice}
                            ]
                        })(<Input type='number' placeholder='请输入商品价格' addonAfter='元' />)}
                    </Item>
                    <Item label='商品分类：'>
                        {getFieldDecorator('categoryIds',{
                            initialValue:categoryIds,
                            rules:[
                                {
                                    required:true,
                                    message:'必须输入商品分类'
                                }
                            ]
                        })(<Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                            onChange={this.onChange}
                            placeholder='请选择分类'
                            changeOnSelect
                        />)}
                    </Item>
                    <Item label='商品图片：'>
                        <PicturesWall ref={this.pw} imgs={imgurls} />
                    </Item>
                    <Item label='商品详情：' labelCol={{span:2}} wrapperCol={{span:22}}>
                        <RichTextEditor ref={this.editor} detail={product.detail} />
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(AddUpdate)