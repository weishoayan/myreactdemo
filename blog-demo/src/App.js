import React,{Component} from 'react'

import Route from './router/router'

import MainHeader from './view/header/header';

import MainFooter from './view/footer/footer';

import "antd/dist/antd.css";

import { Layout } from 'antd';

const { Header,Content,Footer  } = Layout;

export default class App extends Component{
    render(){
        //console.log(this);
        
        return (
            <div>
                
                <Header>
                    <MainHeader />
                </Header>

                <Content style={{'minHeight':'835px'}}>
                    <Route></Route>
                </Content>
                
                <Footer> 
                    <MainFooter />
                </Footer>
               
            </div>
        )
    }
}