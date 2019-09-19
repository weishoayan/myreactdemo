import React, { Component } from 'react'
import axios from 'axios'
import {List,Avatar } from 'antd'
import {Link} from 'react-router-dom'
import TextTag from './cnode/tag';

export default class IndexList extends Component {
    constructor(props){
        super(props);
        this.state = {
            page:1,
            data:[],
            loading:this.props.loading
        }
    }
    componentWillMount(){
        this.getData(this.props.tab,this.state.page)
    }
    getData(tab,page){
        axios.get(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=20`)
            .then(res=>{
                // console.log(res)
                this.setState({
                    data:res.data.data,
                    loading:false
                })
            })
    }
    async shouldComponentUpdate(nextProps,nextState){
        if (this.state.page !== nextState.page) {
            this.getData(nextProps.tab,nextState.page)
        }

        if (this.props.tab !== nextProps.tab) {
            this.setState({page:1})
            await this.setState({loading:nextProps.loading})
            this.getData(nextProps.tab,this.state.page)
        }
        return true
    }
    render() {
        const data = this.state.data
        // console.log(this.state)
        const pagination = {
            current:this.state.page,
            pageSize:20,
            total:1000,
            onChange:(page)=>{
                console.log(page)
                this.setState({page})
            }
        }
        return (
            <div>
                <List 
                    loading={this.state.loading}
                    className={'cnode-list'}
                    dataSource={data}
                    pagination={pagination}
                    renderItem={
                        item=>(<List.Item
                            extra={'回复'+item.reply_count+' | 访问'+item.visit_count}
                        >
                            <List.Item.Meta 
                                avatar={
                                    <Avatar src={item.author.avatar_url}></Avatar>
                                }
                                title={<span>
                                    <TextTag tab={item}></TextTag>
                                    
                                    <Link to={'/code/details/'+item.id}>{item.title}</Link>
                                </span>}
                                description={
                                    <p>
                                        {/* <Link to={'/user/'+item.author.loginname}>{item.author.loginname}</Link> */}
                                        {item.author.loginname}:发表于{item.create_at.split('T')[0]}
                                    </p>
                                }
                            ></List.Item.Meta>
                        </List.Item>)
                    }
                ></List>
            </div>
        )
    }
}
