import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link , withRouter} from 'react-router-dom'
import {   getData } from '../../api/api'
import { Menu,Avatar , message } from 'antd';
import BaseUrl from '../../api/configurl'
// console.log(BaseUrl);

export default class headerUser extends Component {
    
    success = (text) => {
        return message.success(text).then(()=>{
                this.props.history.push('/')
              })
      }

    logout = () =>{
        console.log(1)
        this.props.dispatch((dispatch) =>{
            getData('/user/logout')
                .then(async res=>{

                    await this.success(res.message)
                    dispatch({type:'LOGIN_OUT'})
                })
        })
    }

    render() {
        //console.log(this);
        
        const { loading , userInfo } = this.props
        return (
            <div>
                {
                    loading ? (
                        <Menu className='top-Menu top-Menu-user' mode="horizontal">
                            <Menu.SubMenu title={
                                <div >
                                    {/* <Icon type="user" /> */}
                                    {/* 'url'+userInfo.avatar http://localhost:3001 http://47.106.167.34:3001/img/default.jpg */}
                                    <Avatar size="large" src={BaseUrl+userInfo.avatar} />
                                    <span className='top-Menu-user-name'>{userInfo.user}</span>
                                </div>
                            }>
                                <Menu.ItemGroup >
                                    <Menu.Item key="setting:1"><Link to={"/user/articles/"+userInfo.user}>用户中心</Link></Menu.Item>
                                    <Menu.Item key="setting:2" onClick={this.logout}><span  >退出</span></Menu.Item>
                                </Menu.ItemGroup>
                            </Menu.SubMenu>
                        </Menu>
                    ) : (
                        <Menu className='top-Menu top-Menu-user' mode="horizontal">
                            <Menu.Item><Link to="/login">登录</Link></Menu.Item>
                            <Menu.Item><Link to="/reg">注册</Link></Menu.Item>
                        </Menu>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        userInfo: state.data
    })
  }
  headerUser = withRouter(connect(mapStateToProps)(headerUser))
