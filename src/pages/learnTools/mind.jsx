import React, { Component } from 'react'
import {Row,Col,Icon,Tooltip,Button} from 'antd'
import G6 from '@antv/g6';
import G6Editor from '@antv/g6-editor';
import './mind.less';
import mindDatas from './mindDatas'
export default class Mind extends Component {
    constructor(props){
        super(props);
        this.state = {
            zoom:0.2
        }
    }
    componentDidMount() {
        const content = this.refs.content;
        const tool = this.refs.tool;
        const editor = new G6Editor();
        
        const toolBox = new G6Editor.Toolbar({
            container: tool
        });

        const contentBox = new G6Editor.Mind({
            defaultData: mindDatas,
            graph: {
                container: content,
                height: window.innerHeight - 38
            }
        });

        editor.add(toolBox);
        editor.add(contentBox);

        this.setState({
            zoom:0.2,
            editor
        })
        // mind.showHotArea();
    }

    onRoom = () => {
        const {editor} = this.state;
        editor.executeCommand('zoomOut');
    }

    importFile = () => {

    }

    exportFile = () => {

    }

    save = () => {
        
    }

    render() {
        return (
            <div className="mindbox">
                <Row className="mindbox-top" type="flex" justify="end">
                    <Button onClick={this.importFile}>导入</Button>
                    <Button onClick={this.exportFile}>导出</Button>
                    <Button onClick={this.save} type='primary'>保存</Button>
                </Row>
                <div className="mindbox-header">
                    <div className="mindbox-header-title">脑图编辑器</div>
                    <div className="mindbox-header-content">
                        脑图是表达发散性思维的有效图形思维工具 ，它简单却又很有效，是一种实用性的思维工具
                    </div>
                </div>
                <div className="mindbox-body">
                    <div className='mindbox-body-hd'>
                        <div className="toolbar" ref='tool'>
                            <div className="command" data-command="undo">
                                <Tooltip title='Undo' placement="bottom">
                                    <Icon type="undo" />
                                </Tooltip>
                            </div>
                            <div className="command" data-command="redo">
                                <Tooltip title='Redo' placement="bottom">
                                    <Icon type="redo" />
                                </Tooltip>
                            </div>
                            <div className="ant-divider ant-divider-vertical" role="separator"></div>
                            <div className="command" data-command="zoomIn">
                                <Tooltip title='Zoom In' placement="bottom">
                                    <Icon type="zoom-in" />
                                </Tooltip>
                            </div>
                            <div className="command" data-command="zoomOut">
                                <Tooltip title='Zoom Out' placement="bottom">
                                    <Icon type="zoom-out" />
                                </Tooltip>
                            </div>

                            <div className="command" data-command="autoZoom">
                                <Tooltip title='Fit Map' placement="bottom">
                                    <Icon type="border-outer" />
                                </Tooltip>
                            </div>
                            <div className="command" data-command="resetZoom">
                                <Tooltip title='Actual Size' placement="bottom">
                                    <Icon type="fullscreen-exit" />
                                </Tooltip>
                            </div>
                            <div className="ant-divider ant-divider-vertical" role="separator"></div>
                            <div className="command" data-command="append">
                                <Tooltip title='Topic' placement="bottom">
                                    <Icon type="hdd" />
                                </Tooltip>
                            </div>
                            <div className="command" data-command="appendChild">
                                <Tooltip title='Subtopic' placement="bottom">
                                    <Icon type="apartment" />
                                </Tooltip>
                            </div>
                            <div className="ant-divider ant-divider-vertical" role="separator"></div>
                            <div className="command" data-command="collapse">
                                <Tooltip title='Fold' placement="bottom">
                                    <Icon type="shrink" />
                                </Tooltip>
                            </div>
                            <div className="command" data-command="expand">
                                <Tooltip title='Unfold' placement="bottom">
                                    <Icon type="arrows-alt" />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="mindbox-body-bd">
                        <div className="mindbox-body-bd-content" ref='content'></div>
                        {/* <Row className="mindbox-body-bd-sidebar" ref='sidebar'>
                            <Row className="detail-panel"></Row>
                            <Row className="minimap-panel"></Row>
                        </Row> */}
                    </div>
                </div>
            </div>
        )
    }
}
