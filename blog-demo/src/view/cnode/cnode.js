import React, { Component } from 'react'

// import {NavLink,Link} from 'react-router-dom'
import {Row,Col } from 'antd'
import IndexList from './indexlist';
import IndexMenu from './indexMenu';

export default class Index extends Component {
    render() {
        console.log(this)
        const tab = this.props.match.params.id
        return (
            <Row className='wrap'>
                <Col md={6}>
                    {/* 这是主页右边导航 */}
                    <IndexMenu></IndexMenu>
                </Col>
                <Col md={18} className='IndexList'>
                    <IndexList 
                        tab={tab}
                        loading={true}
                    ></IndexList>
                </Col>
            </Row>
        )
    }
}
