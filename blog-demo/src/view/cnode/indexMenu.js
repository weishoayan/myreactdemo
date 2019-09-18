import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Menu } from 'antd'
export default class IndexMenu extends Component {
    render() {
        return (
            <div>
                <Menu className='MenuIndex'>
                        <Menu.Item><Link to='/cnode/all'>全部</Link></Menu.Item>
                        <Menu.Item><Link to='/cnode/good'>精华</Link></Menu.Item>
                        <Menu.Item><Link to='/cnode/ask'>问答</Link></Menu.Item>
                        <Menu.Item><Link to='/cnode/share'>分享</Link></Menu.Item>
                        <Menu.Item><Link to='/cnode/job'>招聘</Link></Menu.Item>
                        <Menu.Item><Link to='/cnode/dev'>测试</Link></Menu.Item>
                </Menu>
            </div>
        )
    }
}
