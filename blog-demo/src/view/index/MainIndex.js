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
            tips:this.props.match.params.id,
        }
    }
    
    componentWillMount(){
        const tipsUrl = this.props.match.params.id
        this.setState({tips:tipsUrl})
    }

    handlerClickTips = (value,page) =>{
        this.setState({tips:value})
    }


    

    render() {
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
                    {/* <List 
                        data={this.state.articleData} 
                        maxNum={this.state.maxNum} 
                        changeCurrent={this.changeCurrent} 
                        tabs={this.state.tips}
                        page={this.state.page}
                    /> */}
                    <List 
                        tabs={this.state.tips}
                    />
                </div>
            </div>
        )
    }
}
