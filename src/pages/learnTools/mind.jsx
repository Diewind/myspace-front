import React, { Component } from 'react'
import {Row,Icon,Tooltip,Button,Form,Input,Card,Menu,Dropdown} from 'antd'
import {FOEM_ITEM_LAYOUT} from '../../utils/constants'
import G6Editor from '@antv/g6-editor';
import mindDatas from './mindDatas'
import './mind.less';

const { TextArea } = Input;

class Mind extends Component {

    constructor(props){
        super(props);
        this.state = {
            nodeType:'canvas',// 节点类型
            data:{
                "roots": [
                    {
                        "label": "思维导图",
                        "children": [
                            {
                            "label": "数字迷",
                            "side": "right",
                            "id": "18bcb5ce",
                            },
                            {
                                "label": "语文王",
                                "side": "left",
                                "id": "18rcb5ce",
                            }
                        ]
                    }
                ]
            }
        }
    }

    componentDidMount() {
        this.init();
    }

    /**
     * 初始化页面
     */
    init = () => {
        
        const tool = this.refs.tool;
        const content = this.refs.content;
        const contextmenu = this.refs.contextmenu;
        const detail = this.refs.detail;
        const minimap = this.refs.minimap;
        const editor = new G6Editor();
        const {setFieldsValue} = this.props.form;
        const {data} = this.state;
        
        const toolBox = new G6Editor.Toolbar({
            container: tool
        });
        const contentBox = new G6Editor.Mind({
            defaultData: data,
            graph: {
                container: content,
                height: window.innerHeight - 280
            }
        });
        const contextmenuBox = new G6Editor.Contextmenu({
            container: contextmenu
        });
        const detailBox = new G6Editor.Detailpannel({
            container: detail
        });
        const minimapBox = new G6Editor.Minimap({
            container: minimap,
            viewportBackStyle:'#fff',
            viewportWindowStyle:'#fff',
            fitView:true,
            width:197
        });
        
        editor.add(toolBox);
        editor.add(contentBox);
        editor.add(contextmenuBox);
        editor.add(detailBox);
        editor.add(minimapBox);

        this.editor = editor;
        const currentPage = editor.getCurrentPage();
        // 清空默认选中
        currentPage.clearSelected();
        currentPage.on('click',(ev)=>{
            let nodeName = ev?.item?.model.label || '';
            let nodeType = ev?.item?.type || 'canvas';
            this.setState({
                nodeType
            });
            setFieldsValue({
                'labelName':nodeName
            });
        });

    }

    // 设置数据
    handleBlur = () => {
        const currentPage = this.editor.getCurrentPage();
        const curSelect = currentPage.getSelected();
        let {data} = this.state;
        currentPage.read(data);
        currentPage.setSelected(curSelect[0]['model']['id'], true);
    }

    handleChange = (e) => {
        const currentPage = this.editor.getCurrentPage();
        const curSelect = currentPage.getSelected();
        curSelect[0]['model']['label'] = e.target.value;
    }

    // 导入
    importFile = () => {
        const ndata = mindDatas;
        this.setState({
            data:ndata
        },()=>{
            const currentPage = this.editor.getCurrentPage();
            const {data} = this.state;
            currentPage.read(data);
        });
    }

    // 导出
    exportFileClick = (e) => {
        const currentPage = this.editor.getCurrentPage();
        const data = currentPage.save();
    }

    save = () => {
        const currentPage = this.editor.getCurrentPage();
        const data = currentPage.save();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { nodeType }= this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 21 },
                sm: { span: 21 },
            },
        };
        const menu = (
            <Menu onClick={this.exportFileClick}>
                <Menu.Item key="png">.PNG</Menu.Item>
                <Menu.Item key="pdf">.PDF</Menu.Item>
                <Menu.Item key="mmap">.MMAP</Menu.Item>
            </Menu>
        );
        return (
            <div className="mindbox">
                <div className="mindbox-header">
                    <Row className="mindbox-top" type="flex" justify="end">
                        <Button onClick={this.importFile}>导入</Button>
                        <Dropdown overlay={menu}>
                            <Button>
                                导出 <Icon type="down" />
                            </Button>
                        </Dropdown>
                        <Button onClick={this.save} type='primary'>保存</Button>
                    </Row>
                    <Form {...formItemLayout}>
                        <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入标题',
                                    },
                                ],
                            })(<Input autoComplete='off' placeholder='脑图编辑器' />)}
                        </Form.Item>
                        <Form.Item label="描述">
                            {getFieldDecorator('desc', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入描述',
                                    },
                                ],
                            })(<TextArea autoComplete='off' rows={4} placeholder='脑图是表达发散性思维的有效图形思维工具 ，它简单却又很有效，是一种实用性的思维工具' />)}
                        </Form.Item>
                    </Form>
                </div>
                <div className="mindbox-body">
                    <div className='mindbox-body-hd'>
                        <div className="toolbar" ref='tool'>
                            <div className="command" data-command="undo">
                                <Tooltip title='Undo' placement="bottom">
                                    <span className='toolicon ' role='img'>
                                        <svg id="icon-undo" viewBox="0 0 1024 1024"><path d="M143.14 449.19q69.07-89.09 170.67-140.64Q415.41 257 537.52 256q183.18 4 315.81 114.11T1024 654.39q-58.06-107.11-161.66-170.17-103.6-63.06-232.73-65.06-107.1 1-196.69 45.54-89.58 44.55-152.65 121.62L407.4 713.45q7 7 7 17.01 0 10.01-7 17.02t-17.01 7.01H32.04q-14.01 0-23.02-9.01T0.01 722.46V364.11q0-10.01 7-17.02t17.02-7.01q10.01 0 17.02 7.01l102.1 102.1z"></path></svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="command" data-command="redo">
                                <Tooltip title='Redo' placement="bottom">
                                    <span className='toolicon ' role='img'>
                                        <svg id="icon-redo" viewBox="0 0 1024 1024"><path d="M999.98 340.08q-10.01 0-17.02 7.01l-102.1 102.1q-69.07-89.09-170.67-140.64Q608.59 257 487.48 256q-184.18 4-316.81 114.11T0 654.39q58.06-107.11 161.66-170.17 103.6-63.06 232.73-65.06 107.1 1 197.19 45.54 90.09 44.55 152.15 121.62L616.6 713.45q-7 7-7 17.01 0 10.01 7 17.02t17.01 7.01h358.35q14.01 0 23.02-9.01t9.01-23.02V364.11q0-10.01-7-17.02t-17.01-7.01z"></path></svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="ant-divider ant-divider-vertical" role="separator"></div>
                            <div className="command" data-command="zoomIn">
                                <Tooltip title='Zoom In' placement="bottom">
                                    <span className='toolicon' role='img'>
                                        <svg id="icon-zoom-in" viewBox="0 0 1024 1024"><path d="M636.36 411.93q0 17.86-10.12 27.98-10.12 10.12-27.98 10.12H483.97v114.3q0 17.85-10.12 27.97-10.12 10.12-27.98 10.12t-27.98-10.12q-10.12-10.12-10.12-27.97v-114.3H293.48q-17.86 0-27.98-10.12-10.12-10.12-10.12-27.97 0-17.86 10.12-27.98 10.12-10.12 27.98-10.12h114.29v-114.3q0-17.86 10.12-27.98 10.12-10.12 27.98-10.12t27.98 10.12q10.12 10.12 10.12 27.98v114.3h114.29q17.86 0 27.98 10.12 10.12 10.12 10.12 27.97z m342.88 602.43q-17.86 10.71-36.91 9.52-19.05-1.19-32.14-17.86L689.93 754.81q-52.38 40.48-113.7 61.91-61.31 21.43-130.36 21.43-176.2-4.76-295.25-123.81Q31.56 595.28 26.79 419.08q4.77-176.21 123.83-295.26Q269.68 4.77 445.87 0.01q176.2 4.76 295.25 123.81 119.05 119.06 123.83 295.26 0 80.95-26.2 149.41T766.12 694.1l220.25 258.35q11.91 7.14 10.72 25-1.19 17.86-17.86 36.91zM445.87 754.81q146.44-3.57 242.87-100 96.44-96.44 100.01-242.88-3.57-146.44-100.01-242.88-96.43-96.44-242.87-100.01-146.44 3.57-242.88 100.01-96.44 96.44-100.01 242.88 3.57 146.44 100.01 242.88 96.44 96.43 242.88 100z" fill="#666666"></path></svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="command" data-command="zoomOut">
                                <Tooltip title='Zoom Out' placement="bottom">
                                    <span className='toolicon' role='img'>
                                        <svg id="icon-zoom-out" viewBox="0 0 1024 1024"><path d="M636.36 411.93q0 17.86-10.12 27.98-10.12 10.12-27.98 10.12H293.48q-17.86 0-27.98-10.12-10.12-10.12-10.12-27.97 0-17.86 10.12-27.98 10.12-10.12 27.98-10.12h304.78q17.86 0 27.98 10.12 10.12 10.12 10.12 27.97z m342.88 602.43q-17.86 10.71-36.91 9.52-19.05-1.19-32.14-17.86L689.93 754.81q-52.38 40.48-113.7 61.91-61.31 21.43-130.36 21.43-176.2-4.76-295.25-123.81Q31.56 595.28 26.79 419.08q4.77-176.21 123.83-295.26Q269.68 4.77 445.87 0.01q176.2 4.76 295.25 123.81 119.05 119.06 123.83 295.26 0 80.95-26.2 149.41T766.12 694.1l220.25 258.35q11.91 7.14 10.72 25-1.19 17.86-17.86 36.91zM445.87 754.81q146.44-3.57 242.87-100 96.44-96.44 100.01-242.88-3.57-146.44-100.01-242.88-96.43-96.44-242.87-100.01-146.44 3.57-242.88 100.01-96.44 96.44-100.01 242.88 3.57 146.44 100.01 242.88 96.44 96.43 242.88 100z" fill="#666666"></path></svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="command" data-command="autoZoom">
                                <Tooltip title='Fit Map' placement="bottom">
                                    <span className='toolicon' role='img'>
                                        <svg id="icon-fit-map" viewBox="0 0 1024 1024"><path d="M708.913 275.697V39.39q0-18.46 10.47-28.92T748.303 0.01q18.46 0 28.92 10.46t10.46 28.92v196.928H984.61q18.46 0 28.92 10.46t10.46 28.92q0 18.46-10.46 28.929-10.46 10.46-28.92 10.46H748.303q-6.16 0-11.69-1.23-5.53-1.23-11.7-6.16h-8.61q0-12.31-3.69-19.07-3.7-6.76-3.7-12.93zM275.687 0.01q-18.46 0-28.92 10.46t-10.46 28.92v196.928H39.38q-18.46 0-28.92 10.46T0 275.698q0 18.46 10.46 28.929 10.46 10.46 28.92 10.46h236.307q6.16 0 11.69-1.23 5.54-1.23 11.69-6.16h8.61q4.93-6.15 6.16-12.31 1.23-6.15 1.23-12.31V46.77q0-23.39-10.46-35.08Q294.137 0 275.677 0zM984.61 708.923H748.303q-6.16 0-11.69 1.23-5.53 1.23-11.7 6.16h-8.61q-4.93 6.15-6.16 12.31-1.23 6.15-1.23 12.3V977.23q0 17.23 10.47 27.69t28.92 10.46q18.46 0 28.92-10.46t10.46-27.69V787.692H984.61q18.46 0 28.92-10.46t10.46-28.92q0-18.46-10.46-28.919-10.46-10.47-28.92-10.47z m-676.923 16q-12.31-12.3 0 0-12.31-6.15-19.07-11.07-6.76-4.93-12.93-4.93H39.38q-18.46 0-28.92 10.47T0 748.313q0 18.46 10.46 28.92t28.92 10.46h196.928V984.62q0 18.46 10.46 28.92t28.92 10.46q18.46 0 28.929-10.46 10.46-10.46 10.46-28.92V748.313q0-6.16-3.69-11.69-3.69-5.53-3.69-11.7z m204.308-370.456q-66.46 1.23-111.379 46.16-44.93 44.929-46.16 111.378 1.23 66.46 46.16 111.379t111.379 46.15q66.46-1.23 111.379-46.15t46.15-111.379q-1.23-66.46-46.15-111.379-44.92-44.93-111.379-46.16z" fill="#666666"></path></svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="command" data-command="resetZoom">
                                <Tooltip title='Actual Size' placement="bottom">
                                    <span className='toolicon' role='img'>
                                        <svg id="icon-actual-size" viewBox="0 0 1024 1024"><path d="M128 0h85.33v1024H128V0z m682.67 0H896v1024h-85.33V0zM469.33 256h85.34v85.33h-85.34V256z m0 341.33h85.34v85.34h-85.34v-85.34z" fill="#666666"></path></svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="ant-divider ant-divider-vertical" role="separator"></div>
                            <div className="command" data-command="append">
                                <Tooltip title='Topic' placement="bottom">
                                    <span className='toolicon' role='img'>
                                        <svg id="icon-append" viewBox="0 0 1024 1024"><path d="M149.454 116.492h65.915v65.916h-65.915v-65.916z m131.83 0h65.924v65.916h-65.923v-65.916z m-131.83 131.839h65.915v65.915h-65.915v-65.915z m263.669-131.839h65.915v65.916h-65.915v-65.916z m263.67 0h65.922v65.916h-65.923v-65.916z m0 263.67h65.922v65.923h-65.923V380.16z m-131.831-263.67h65.915v65.916h-65.915v-65.916z m-263.677 263.67h65.923v65.923h-65.923V380.16zM808.63 248.33h65.915v65.915h-65.915v-65.915zM149.454 380.16h65.915v65.924h-65.915V380.16zM808.63 116.492h65.915v65.916h-65.915v-65.916z m0 263.67h65.915v65.923h-65.915V380.16z m-395.508 0h65.915v65.923h-65.915V380.16z m131.839 0h65.915v65.923h-65.915V380.16z m0 65.923h-65.924v131.83H149.454v329.593h725.092V577.915H544.962v-131.83zM808.63 841.592H215.369V643.84h593.262v197.753z"></path></svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="command" data-command="appendChild">
                                <Tooltip title='Subtopic' placement="bottom">
                                    <span className='toolicon' role='img'>
                                        <svg id="icon-append-child" viewBox="0 0 1024 1024"><path d="M256 128h64v64h-64v-64z m128 0h64v64h-64v-64z m0 256h64v64h-64v-64z m128 0h64v64h-64v-64z m0-256h64v64h-64v-64z m0 128h64v64h-64v-64zM128 128h64v64h-64v-64zM0 128h64v64H0v-64z m0 128h64v64H0v-64z m256 128h64v64h-64v-64z m-128 0h64v64h-64v-64zM0 384h64v64H0v-64z m448 128v128H192V512h-64v192h320v128h576V512H448z m512 256H512V576h448v192z"></path></svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="ant-divider ant-divider-vertical" role="separator"></div>
                            <div className="command" data-command="collapse">
                                <Tooltip title='Fold' placement="bottom">
                                    <span className='toolicon' role='img'>
                                        <svg id="icon-collapse" viewBox="0 0 1024 1024"><path d="M704 576H576v128H0V384h576v128h128V256h320v64H768v192h256v64H768v192h256v64H704V576zM256 160v96L64 128 256 0v96h346v64H256z"></path></svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="command" data-command="expand">
                                <Tooltip title='Unfold' placement="bottom">
                                    <span className='toolicon' role='img'>
                                        <svg id="icon-expand" viewBox="0 0 1024 1024"><path d="M448 160H102V96h346V0l192 128-192 128v-96z m256 416H576v128H0V384h576v128h128V256h320v64H768v192h256v64H768v192h256v64H704V576z"></path></svg>
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="mindbox-body-bd">
                        <div className="mindbox-body-bd-content" ref='content'></div>
                        <div className="mindbox-body-bd-sidebar" ref='sidebar'>
                            <Card className='mindbox-body-bd-sidebar-nodeinfo' size='small' type="inner" title={nodeType}>
                                {nodeType === 'node' && <Form layout='horizontal'>
                                    <Form.Item label="Label" {...FOEM_ITEM_LAYOUT}>
                                        {getFieldDecorator('labelName', {
                                            
                                        })(<Input autoComplete='off' onChange={this.handleChange} onBlur={this.handleBlur} />)}
                                    </Form.Item>
                                </Form>}
                            </Card>
                            <Card size='small' type="inner" title='minimap'>
                                <div className="minimap" ref='minimap'></div>
                            </Card>
                        </div>
                    </div>
                    <div className="mindbox-body-contextmenu" ref="contextmenu">
                        <div className="mindbox-body-contextmenu-detail" ref='detail'>
                            <div class="menu" data-status="node-selected">
                                <div class="command" data-command="append">
                                    <div class="context-menu-index-item">
                                        <span role="img" class="anticon">
                                            <svg id="icon-append" viewBox="0 0 1024 1024"><path d="M149.454 116.492h65.915v65.916h-65.915v-65.916z m131.83 0h65.924v65.916h-65.923v-65.916z m-131.83 131.839h65.915v65.915h-65.915v-65.915z m263.669-131.839h65.915v65.916h-65.915v-65.916z m263.67 0h65.922v65.916h-65.923v-65.916z m0 263.67h65.922v65.923h-65.923V380.16z m-131.831-263.67h65.915v65.916h-65.915v-65.916z m-263.677 263.67h65.923v65.923h-65.923V380.16zM808.63 248.33h65.915v65.915h-65.915v-65.915zM149.454 380.16h65.915v65.924h-65.915V380.16zM808.63 116.492h65.915v65.916h-65.915v-65.916z m0 263.67h65.915v65.923h-65.915V380.16z m-395.508 0h65.915v65.923h-65.915V380.16z m131.839 0h65.915v65.923h-65.915V380.16z m0 65.923h-65.924v131.83H149.454v329.593h725.092V577.915H544.962v-131.83zM808.63 841.592H215.369V643.84h593.262v197.753z"></path></svg>
                                        </span>
                                        <span>Topic</span>
                                    </div>
                                </div>
                                <div class="command" data-command="appendChild">
                                    <div class="context-menu-index-item">
                                        <span role="img" class="anticon">
                                            <svg id="icon-append-child" viewBox="0 0 1024 1024"><path d="M256 128h64v64h-64v-64z m128 0h64v64h-64v-64z m0 256h64v64h-64v-64z m128 0h64v64h-64v-64z m0-256h64v64h-64v-64z m0 128h64v64h-64v-64zM128 128h64v64h-64v-64zM0 128h64v64H0v-64z m0 128h64v64H0v-64z m256 128h64v64h-64v-64z m-128 0h64v64h-64v-64zM0 384h64v64H0v-64z m448 128v128H192V512h-64v192h320v128h576V512H448z m512 256H512V576h448v192z"></path></svg>
                                        </span>
                                        <span>Subtopic</span>
                                    </div>
                                </div>
                                <div class="command" data-command="collapse">
                                    <div class="context-menu-index-item">
                                        <span role="img" class="anticon">
                                            <svg id="icon-collapse" viewBox="0 0 1024 1024"><path d="M704 576H576v128H0V384h576v128h128V256h320v64H768v192h256v64H768v192h256v64H704V576zM256 160v96L64 128 256 0v96h346v64H256z"></path></svg>
                                        </span>
                                        <span>Fold</span>
                                    </div>
                                </div>
                                <div class="command" data-command="expand">
                                    <div class="context-menu-index-item">
                                        <span role="img" class="anticon">
                                            <svg id="icon-expand" viewBox="0 0 1024 1024"><path d="M448 160H102V96h346V0l192 128-192 128v-96z m256 416H576v128H0V384h576v128h128V256h320v64H768v192h256v64H768v192h256v64H704V576z"></path></svg>
                                        </span>
                                        <span>Unfold</span>
                                    </div>
                                </div>
                                <div class="command" data-command="delete">
                                    <div class="context-menu-index-item">
                                        <span role="img" class="anticon">
                                            <svg id="icon-delete" viewBox="0 0 1024 1024"><path d="M828.55 311.65q-17.81 0-30.05 11.13-12.25 11.13-14.47 28.94l-52.32 529.81h-95.72l16.7-461.91q0-14.47-10.02-25.05-10.02-10.57-25.05-11.13-15.02-0.56-25.6 8.91-10.58 9.46-10.58 25.04l-16.69 464.14H459.01l-15.58-465.25q-1.12-15.58-11.69-25.04-10.57-9.47-25.6-8.91-15.03 0.56-24.49 11.13-9.46 10.57-9.46 25.04l15.58 463.03h-94.6l-52.32-529.81q-2.22-17.81-14.47-28.94-12.24-11.13-30.05-11.13h-3.34q-15.58 2.23-25.04 13.36-9.46 11.13-8.35 26.71l60.1 599.93q3.34 31.17 25.6 51.21 22.26 20.03 53.43 21.14h426.3q31.16-1.11 53.42-21.14t26.72-51.21l58.99-603.27q0-15.58-10.57-26.15-10.58-10.58-25.05-10.58z m107.96-71.23l-7.79-61.22q-5.56-35.62-31.72-57.88-26.15-22.26-61.77-23.37h-170.3l-3.34-32.28q-2.22-28.94-22.25-46.75Q619.3 1.11 590.36 0H433.42Q404.48 1.11 385 18.92q-19.48 17.81-22.82 46.75l-2.22 32.28H188.55q-35.62 1.11-61.22 23.37T96.17 179.2l-8.91 63.44q0 7.79 5.01 12.8 5.01 5.01 12.8 5.01h816.98q6.67-1.11 11.13-6.68 4.46-5.56 3.34-13.35zM422.29 97.95l2.22-27.83q1.12-6.68 8.91-7.79h158.05q6.68 1.11 8.91 7.79l1.11 27.83h-179.2z"></path></svg>
                                        </span>
                                        <span>Delete</span>
                                    </div>
                                </div>
                            </div>
                            <div class="menu" data-status="canvas-selected">
                                <div class="command" data-command="undo">
                                    <div class="context-menu-index-item">
                                        <span role="img" class="anticon">
                                            <svg id="icon-undo" viewBox="0 0 1024 1024"><path d="M143.14 449.19q69.07-89.09 170.67-140.64Q415.41 257 537.52 256q183.18 4 315.81 114.11T1024 654.39q-58.06-107.11-161.66-170.17-103.6-63.06-232.73-65.06-107.1 1-196.69 45.54-89.58 44.55-152.65 121.62L407.4 713.45q7 7 7 17.01 0 10.01-7 17.02t-17.01 7.01H32.04q-14.01 0-23.02-9.01T0.01 722.46V364.11q0-10.01 7-17.02t17.02-7.01q10.01 0 17.02 7.01l102.1 102.1z"></path></svg>
                                        </span>
                                        <span>Undo</span>
                                    </div>
                                </div>
                                <div class="command" data-command="redo">
                                    <div class="context-menu-index-item">
                                        <span role="img" class="anticon">
                                            <svg id="icon-redo" viewBox="0 0 1024 1024"><path d="M999.98 340.08q-10.01 0-17.02 7.01l-102.1 102.1q-69.07-89.09-170.67-140.64Q608.59 257 487.48 256q-184.18 4-316.81 114.11T0 654.39q58.06-107.11 161.66-170.17 103.6-63.06 232.73-65.06 107.1 1 197.19 45.54 90.09 44.55 152.15 121.62L616.6 713.45q-7 7-7 17.01 0 10.01 7 17.02t17.01 7.01h358.35q14.01 0 23.02-9.01t9.01-23.02V364.11q0-10.01-7-17.02t-17.01-7.01z"></path></svg>
                                        </span>
                                        <span>Redo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(Mind);