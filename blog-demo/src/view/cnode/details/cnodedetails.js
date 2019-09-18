import React, { Component } from 'react'
import axios from 'axios'
import {Card,Avatar,List } from 'antd'
import TextTag from '../cnode/tag';
// import {Link} from 'react-router-dom'



export default class Details extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{},
            loading:true
        }
    }
    componentWillMount(){
       this.getData()
    }
    getData(){
        axios.get(`https://cnodejs.org/api/v1/topic/${this.props.match.params.id}`)
            .then(res=>{
                console.log(res)
                this.setState({
                    data:res.data.data,
                    loading:false
                })
            })
    }
    render() {
        const data = this.state.data
        // console.log(data)
        return (
            <div className='wrap'>
                {
                    !!data.title&&(<Card loading={this.state.loading}>
                        <Card.Meta 
                            title={
                                <div>
                                    <h2>{data.title}</h2>
                                    <TextTag style={{'display':'inline'}} tab={data}></TextTag>
                                    <Avatar src={data.author.avatar_url}></Avatar>
                                    &nbsp;发表于：{data.author.loginname}
                                    {/* <Link to={'/user/'+data.author.loginname}>{data.author.loginname}</Link> */}
                                </div>
                            }
                            description={
                                <div dangerouslySetInnerHTML={{__html:data.content}} className='details-content'></div>
                            }
                        ></Card.Meta>
                    </Card>)
                }
                {
                    !!data.title&&(
                        <div className='dedails-replies'>
                            <List
                                loading={this.state.loading}
                                dataSource={data.replies}
                                renderItem={
                                    item=>(<List.Item>
                                        <List.Item.Meta 
                                            avatar={
                                                <Avatar src={item.author.avatar_url}></Avatar>
                                            }
                                            title={<div>
                                                <p>
                                                    {/* <Link to={'/user/'+item.author.loginname}>{item.author.loginname}</Link> */}
                                                    {item.author.loginname}
                                                    :发表于{item.create_at.split('T')[0]}
                                                </p>
                                            </div>}
                                            description={
                                                <div dangerouslySetInnerHTML={{__html:item.content}} className='details-content'></div>
                                            }
                                        ></List.Item.Meta>
                                    </List.Item>)
                                }
                            ></List>
                        </div>
                    )
                }
            </div>
        )
    }
}
