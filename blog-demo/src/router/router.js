import {Route,Switch,Redirect} from 'react-router-dom'
import React, { Component } from 'react'



import MainIndex from '../view/index/MainIndex'

import Cnode from '../view/cnode/cnode'

import Cnodedetails from '../view/cnode/details/cnodedetails'

import Getstart from '../view/getstart/getstart'

import Login from '../view/user/login'

import Reg from '../view/user/reg'

import addArticle from '../components/addArticle';

import Article from '../view/article/Article';

import User from '../view/user/user';

import Comments from '../view/user/comments';

import Notfound from '../view/404/Notfound'


export default class Router extends Component {
    render() {
        return (
            <Switch>
                    <Route exact path="/" render={()=>(
                        <Redirect to="/cnode/all" />
                    )} />

                    <Route  path="/cnode/:id"  component={Cnode} />
                    <Route  path="/code/details/:id"  component={Cnodedetails} />

                    <Route  path="/index/:id" component={MainIndex} />
                    <Route  path="/getstart" component={Getstart} />
                    <Route  path="/login"  render={()=>{
                        
                        if (localStorage.getItem('user')) {
                            return <Redirect to="/" />
                        }else{
                            return <Login></Login>
                        }
                    }}/>
                    <Route  path="/reg" component={Reg} />
                    <Route  path="/addarticle" component={addArticle} />
                    <Route  path="/article/:id" component={Article} />
                    <Route  path="/user/articles/:id" component={User} />
                    <Route  path="/user/comments/:id" component={Comments} />
                    <Route  path="/*" component={Notfound} />
            </Switch>
        )
    }
}
