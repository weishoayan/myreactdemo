import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import List from '../../components/list'
import { getData } from '../../api/api'
// import BaseUrl from '../../api/configurl'
import { //Row, Col ,
     Menu , Button} from 'antd';




export default class MainIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            articleData:[],
            maxNum:0,
            tips:this.props.match.params.id
        }
    }
    
    componentWillMount(){
        const tipsUrl = this.props.match.params.id
        this.props.history.listen(route => {
            if(tipsUrl === 'all') return this.getdataAll(1)
            return this.getDataTips(tipsUrl,1)
        })
        if(tipsUrl === 'all') return this.getdataAll(1)
        this.getDataTips(tipsUrl,1)
    }


    getdataAll = (page) =>{
        // console.log(this.props.match.params.id)
        getData('/page/'+page)
        .then(res=>{
            console.log(res)
            this.setState({articleData:res.data,maxNum:res.maxNum}) 
        })
        .catch(err=>{
            console.log(err)
        })
    }

    changeCurrent = (page) =>{
        const tipsUrl = this.props.match.params.id
        if(tipsUrl === 'all') return this.getdataAll(page)
        this.getDataTips(tipsUrl,page)
        
    }

    handlerClickTips = (value,page) =>{
        // 点击二级Tips
        // const tips = this.props.match.params.id
        this.getDataTips(value,1)
        // this.state.page = 1
        this.setState({tips:value})
    }


    getDataTips = (value,page) =>{
        getData(`/tips/${value}/${page}`)
            .then(res =>{
                console.log(res)
                this.setState({articleData:res.data,maxNum:res.len}) 
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render() {
        // console.log(this.props,this.state.articleData);
        // 路由值
        // const id = this.props.match.params.id
        return (
            <div className="wrap" >
                <div className='clearfix wrap-left-menu'>
                    <Menu className="left-menu" mode='horizontal'>
                        <Menu.Item><Link to='/index/html' onClick={this.handlerClickTips.bind(null,'html')}>html</Link></Menu.Item>
                        <Menu.Item><Link to='/index/javascript' onClick={this.handlerClickTips.bind(null,'javascript')}>javascript</Link></Menu.Item>
                        <Menu.Item><Link to='/index/nodejs' onClick={this.handlerClickTips.bind(null,'nodejs')}>nodejs</Link></Menu.Item>
                        <Menu.Item><Link to='/index/react' onClick={this.handlerClickTips.bind(null,'react')}>react</Link></Menu.Item>
                        <Menu.Item><Link to='/index/vue' onClick={this.handlerClickTips.bind(null,'vue')}>vue</Link></Menu.Item>
                    </Menu>
                    <Button type="primary" className='addArticle'>
                    <Link to='/addarticle'>发表文章</Link></Button>
                </div>
                <div>
                    <List 
                        data={this.state.articleData} 
                        maxNum={this.state.maxNum} 
                        changeCurrent={this.changeCurrent} 
                        tabs={this.state.tips}
                    />
                </div>
            </div>
        )
    }
}
