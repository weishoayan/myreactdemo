import React, { Component } from 'react'
import {Tag } from 'antd'
const tag = {
    'top':{color:'volcano',text:'置顶'},
    'good':{color:'orange',text:'精华'},
    'ask':{color:'gold',text:'问答'},
    'share':{color:'green',text:'分享'},
    'job':{color:'cyan',text:'招聘'},
    'dev':{color:'blue',text:'测试'},
    'all':{color:'red',text:'无'}
}

export default class TextTag extends Component {
    getTab(data){
        return data.top ? 'top' : data.good ? 'good' : data.tab ? data.tab:'all'
    }
    render() {
        // console.log(this.props,'tag')
        const tab = this.getTab(this.props.tab)
        return (
            <div className='tag-biaoqian'>
                {
                    tag[tab].color && <Tag color={tag[tab].color}>{tag[tab].text}</Tag>
                }
            </div>
            // <span>1</span>
        )
    }
}
