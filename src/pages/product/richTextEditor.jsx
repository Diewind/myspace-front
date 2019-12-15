import React, { Component,Fragment } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types'
class RichTextEditor extends Component {
    static propTypes = {
        detail:PropTypes.string
    }
    constructor(props){
        super(props);
        const html = this.props.detail;
        if(html){// 如果有值，根据html格式字符串创建一个对应的编辑对象
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState
            }
        }else{
            this.state = {
                editorState:EditorState.createEmpty() // 创建一个没有内容的编辑对象
            }
        }
    }
    
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    getDetail = () => {
        // 返回输入的html格式的文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    render() {

        const {editorState} = this.state;
        return (
            <Fragment>
                <Editor
                    editorState={editorState}
                    editorStyle={{
                        border:'1px solid black',
                        minHeight:200,
                        paddingLeft:10
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </Fragment>
            
        )
    }
}

export default RichTextEditor;
