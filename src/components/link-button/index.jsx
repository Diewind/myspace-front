import React from 'react'
import './index.less';
/* 
外形像链接的按钮
*/
export default function LinkButton(props){
    let btnStyle = props.type || '';
    return <button {...props} className={`link-button ${btnStyle}`}></button>
}