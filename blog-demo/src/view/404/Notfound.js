import React, { Component } from 'react'
import { Card } from 'antd';
import Img from './404.gif'
export default class Notfound extends Component {
    render() {
        return (
            <div className='wrap'>
                <div style={{ width: 740 ,margin:'50px auto'}}>
                    <img width="700" alt='404'  src={Img}></img>
                </div>
                
            </div>
        )
    }
}
