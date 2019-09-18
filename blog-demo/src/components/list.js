import React, { Component } from 'react'

import {Link} from 'react-router-dom'

import {  Avatar , List } from 'antd';
import BaseUrl from '../api/configurl'
// console.log(BaseUrl);

// let a = `<p>哇哈哈哈哈哈哈哈</p><p>萨福克大家是否考虑速度加快立法</p><p>十分士大夫&nbsp;</p>`
export default class Lists extends Component {
    constructor(props){
        super(props);
        this.state = {
            current:1,tabs:this.props.tabs
        }
    }

    // shouldComponentUpdate(a,b){
    //     console.log(a,b,'111')
    //     if (a.tabs !== b.tabs) {
    //         b.current = 1
    //     }
        
    //     return true
    // }
    
    componentWillUpdate(a,b){
        if (a.tabs !== b.tabs) {
            b.current = 1
            b.tabs = a.tabs
        }
        console.log(a,b,'333')
    }
    render() {
        const position = {
            current:this.state.current,
            defaultCurrent:1,
            defaultPageSize:5,
            onChange:(page, pageSize)=>{
                // console.log(page, pageSize);
                this.setState({current:page})
                this.props.changeCurrent(page)
            },
            total:this.props.maxNum
        }

        return (
            <List
                className="main-list"
                itemLayout="horizontal"
                dataSource={this.props.data}
                pagination={position}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            
                            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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
            />
        )
    }
}
