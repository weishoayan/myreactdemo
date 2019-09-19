import React, { Component } from 'react'



import { postData } from '../../api/api'

//import { serUserInfo } from '../../redux/reduxapi'

import {//Link,
  withRouter} from 'react-router-dom'

import { connect } from 'react-redux'

import { Form, Icon, Input, Button,  message } from 'antd';

class NormalLoginForm extends Component {

  success = (text) => {
    return message.success(text).then(()=>{
            this.props.history.push('/')
          })
  }

  error = (text) => {
    return message.error(text)
  }
  warning = (text) => {
    return message.warning(text)
  }

  postData =  (data) =>{
    this.props.dispatch((dispatch)=>{
      postData('/user/login',data)
      .then(async res =>{
        //console.log(res,this)
        const userInfo = res.data
        if (res.code === 0) {
          // 注册成功
          await this.success(res.message)
          dispatch({type:'SET_USER',userInfo})
        }else if(res.code === 1){
          // 用户名已存在
          this.warning(res.message)
        }else{
          // 系统故障
          this.error(res.message)
        }
      })
      .catch(err=>{
        console.log(err)
      })

    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.postData(values)
      }
    });
  };

  render() {
    //console.log(this)
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="wrap" style={{'marginTop':'50px','maxWidth':'500px'}}>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator('username', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                      <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Username"
                      />,
                  )}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                      <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                      />,
                  )}
                </Form.Item>
                <Form.Item>
                  {/* {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                  })(<Checkbox>Remember me</Checkbox>)}
                  <a className="login-form-forgot" href="/">
                      Forgot password
                  </a> */}
                  <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                  </Button>
                  {/* Or <Link to='/reg'>register now!</Link> */}
                </Form.Item>
            </Form>
        </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return ({
      userInfo: state.data
  })
}
// const mapDispatchToProps = {serUserInfo}
NormalLoginForm = withRouter(connect(mapStateToProps)(NormalLoginForm))



const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm