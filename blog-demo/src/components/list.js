import React, { Component } from 'react'

import {Link , withRouter} from 'react-router-dom'
import { getData } from '../api/api'
import {  Avatar , List } from 'antd';
import BaseUrl from '../api/configurl'
// console.log(BaseUrl);

// let a = `<p>哇哈哈哈哈哈哈哈</p><p>萨福克大家是否考虑速度加快立法</p><p>十分士大夫&nbsp;</p>`
export default class Lists extends Component {
    constructor(props){
        super(props);
        this.state = {
            current:1,
            tabs:this.props.tabs,
            total:0,
            articleData:[],
            commentData:[],
            loading:true,
        }
    }

    getdataAll = (page) =>{
        getData('/page/'+page)
        .then(res=>{
            // console.log(res)
            this.setState({articleData:res.data,total:res.maxNum,loading:false}) 
        })
        .catch(err=>{
            console.log(err)
        })
    }
    getDataTips = (value,page) =>{
        getData(`/tips/${value}/${page}`)
            .then(res =>{
                // console.log(res)
                this.setState({articleData:res.data,total:res.len,loading:false}) 
            })
            .catch(err=>{
                console.log(err)
            })
    }

    componentDidMount(){
        // console.log(':::::',this.props)
        if (this.props.isCommit) {
            
        } else {
            this.props.tabs === 'all' ? this.getdataAll(1) : this.getDataTips(this.props.tabs,1)
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        // console.log('componentwillupdata',nextProps,nextState,this.props)
        if (nextProps.tabs !== nextState.tabs) {
            this.setState({tabs:nextProps.tabs,current:1})
            nextProps.tabs  === 'all' ? this.getdataAll(1) : this.getDataTips(nextProps.tabs,1)
        }
        return true
    }

    changeCurrent = (page) =>{
        this.state.tabs === 'all' ? this.getdataAll(page) : this.getDataTips(this.state.tabs,page)
    }

    render() {
        // console.log(this)
        const { current , tabs , total , articleData , loading } = this.state
        const position = {
            current,
            defaultCurrent:1,
            defaultPageSize:5,
            onChange:(page, pageSize)=>{
                this.setState({current:page})
                this.changeCurrent(page)
            },
            total
        }

        return (
            <div>
                {
                    articleData && (<List
                        className="main-list"
                        itemLayout="horizontal"
                        loading={loading}
                        dataSource={articleData}
                        pagination={position}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    
                                    avatar={
                                        item.author ? (<Avatar src={BaseUrl+item.author.avatar} />)
                                            : (<Avatar src={BaseUrl+item.from.avatar} />)
                                    }
                                    title={
                                        <div>
                                            {
                                                item.author ? (<Link to={"/user/"+item.author.user}>{item.author.user}</Link>)
                                                    : (<Link to={"/user/"+item.from.user}>{item.from.user}</Link>)
                                            }
                                            {
                                                item.tips && (<span style={{'marginLeft':'10px'}}>{item.tips}</span>)
                                            }
                                            <Link style={{'marginLeft':'10px'}} to={"/article/"+item._id}>{item.title}</Link>
                                            
                                        </div>
                                    }
                                    // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    description = {
                                        <div style={{'height': '25px','overflow': 'hidden'}} 
                                        dangerouslySetInnerHTML={{__html:item.content}}></div>
                                    }
                                />
                                {
                                    item.commentNum >= '0' && (<div style={{'marginRight':'15px'}}>评论数：{item.commentNum}</div>)
                                }
                            </List.Item>
                        )}
                    />)
                }
            </div>
        )
    }
}

Lists = withRouter(Lists)
