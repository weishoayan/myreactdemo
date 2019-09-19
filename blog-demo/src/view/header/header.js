import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import '../../css/mainheader.css'
import { Row, Col, Divider,Icon,Menu } from 'antd';
import HeaderUser from './headerUser';
import { connect } from 'react-redux'

class MainHeader extends Component{
    constructor(props){
        super(props)
        this.state = {
            // loading:false
        }
    }

    render(){
        return (
            <div>
                <Row className={'wrap'}>
                    <Col md={6}><h1 id='logo'>😄😄😄😄😄😄</h1> </Col>
                    
                    <Col md={18}>
                        <Divider type='vertical' className='headerDivider'/>
                        {/* 我是头部组件 */}
                        <Menu mode='horizontal' className='top-Menu'>
                            <Menu.Item><Link to="/index/all"><Icon type='home' />首页</Link></Menu.Item>
                            <Menu.Item><Link to="/getstart"><Icon type='book'/>新手入门</Link></Menu.Item>
                            <Menu.Item><Link to="/cnode/all"><Icon type='info-circle-o'/>Cnode</Link></Menu.Item>
                        </Menu>
                        
                        <HeaderUser loading={this.props.loading} userInfo={this.props.userInfo}/>
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        userInfo: state.data,
        loading:state.loading
    })
}
// const mapDispatchToProps = (dispatch) => {
//     return {}
//   }
export default MainHeader = connect(mapStateToProps)(MainHeader)