import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {   postData , delData } from '../../api/api'
import { Table , Button , message , Col , Menu } from 'antd';
import { connect } from 'react-redux'
class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:[],
        }
    }
    componentDidMount(){
        this.getArticles()
    }

    getArticles(){
        let data = {
            user:localStorage.user,
            token:localStorage.token,
            id:localStorage.id,
            role:localStorage.role
        }
        postData('/user/articles',data).then(res=>{
            // console.log(res)
            if (res.code === 1) {
                this.error(res.message).then(()=>{
                    this.logout()
                  this.props.history.push('/')
                })
                return 
            }
            res.data.forEach((v,i)=>{
                v.key = i
            })
            this.setState({data:res.data})
        })
    }

    handleClick = (data) => {
        // console.log(data)
        delData(`/article/${data._id}`).then(async res=>{
            console.log(res)
            if (res.code === 0) {
                await this.success(res.message)
                this.getArticles()
            }
        })
    }

    success = (text) => {
        return message.success(text)
    }

    error = (text) => {
        return message.error(text)
    }

    logout = () =>{
        this.props.dispatch((dispatch) =>{
            dispatch({type:'LOGIN_OUT'})
        })
    }

    render() {
        // console.log(this)
        const {data} = this.state
        // console.log(data)
        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
            },
            {
                title: '内容',
                dataIndex: 'content',
                align:'center',
                ellipsis:true,
                width:600,
                render:(text)=>(<div 
                    style={{width:'45vw',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}}
                     dangerouslySetInnerHTML={{__html:text}}
                     ></div>)
            },
            {
                title: '操作',
                render:(text,item,index) => (
                    <Button onClick={this.handleClick.bind(null,item)}>删除</Button>
                )
            }
        ]
        return (
            <div className='wrap'>
                <Col md={6}>
                <Menu className="left-menu" >
                        {/* <Menu.Item><Link to='/index/html' >html</Link></Menu.Item> */}
                        { localStorage.role>1 ? (<Menu.Item><Link to='/admin/user' >用户管理</Link></Menu.Item>) : ''}
                        <Menu.Item><Link to={'/user/articles/'+localStorage.user} >文章管理</Link></Menu.Item>
                        <Menu.Item><Link to={'/user/comments/'+localStorage.user} >评论管理</Link></Menu.Item>
                    </Menu>
                </Col>
                <Col md={18}>{

                    data.length>0 ? (<Table columns={columns} dataSource={data} />) : ''
                }</Col>
                
            </div>
        )
    }
}
// 不需要redux状态，只要方法
User = connect((state)=>{return {}})(User)

export default User