import React, { Component } from 'react'
import { getData } from '../../api/api'
import List from '../../components/list'
import { Card , Avatar } from 'antd';
import {Link} from 'react-router-dom'
import AddArticle from '../../components/addArticle';
// let t = `<p>zhe是标题</p><p><span style="font-weight: bold;">哈哈哈哈</span></p><p><span style="color: rgb(194, 79, 74);">我和覅好的反抗类毒素解放考虑到实际付款了</span></p>`
import BaseUrl from '../../api/configurl'

export default class Article extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            article:{},
            comment:[],
            commentlen:0
        }
        
    }

    componentWillMount(){
        this.getdata(this.state.id)
    }

    getdata = (id) =>{
        getData('/article/'+id)
        .then(res=>{
            console.log(res)
            this.setState({article:res.article,comment:res.comment,commentlen:res.commentlen}) 
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        // console.log('article',this.props)
        const { article , comment , commentlen} = this.state
        
        return (
            <div className='wrap'>
                <Card>
                    <Card.Meta
                        title={
                            <div style={{'textAlign':'center'}}>
                                <h2 > {article.title} </h2>
                                {
                                    // article.author && <Avatar src={BaseUrl+'/'+article.author.avatar}></Avatar>
                                    article.author && <Avatar src={BaseUrl+article.author.avatar}></Avatar>
                                }
                                &nbsp;&nbsp;
                                {
                                    // article.author && (<Link to={'/user/'+article.author._id}> {article.author.user} </Link>)
                                    article.author && article.author.user
                                }
                                
                                &nbsp;&nbsp;发表于:{article.created}
                                <span style={{'marginLeft': '15px'}}>评论数：{article.commentNum}</span>
                            </div>
                        }
                    >
                    </Card.Meta>
                    <div dangerouslySetInnerHTML={{__html:article.content}} style={{'marginTop': '50px'}}></div>
                    
                    
                </Card>
                <Card size="small" title="评论" >
                    <List isComment={true} commentData={comment} maxNum={commentlen}/>
                </Card>
                {/* <Card size="small" title="评论" > */}
                <div className='clearfix' style={{'width':'600px'}}>

                    <AddArticle  getCommitdata={this.getdata} isnotAddarticle={true} />
                </div>
                {/* </Card> */}
            </div>
        )
    }
}
