import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postData , getData  } from '../api/api'
import BaseUrl from '../api/configurl'
import E from 'wangeditor'

// import { postData } from '../../api/api'

import {  Card ,Button ,Form ,message ,Select , Input} from 'antd';
import { async } from 'q'

const { Option } = Select



// Input.TextArea
 class Article extends Component {

    constructor(props){
        super(props)
        this.state = {
            addArticle : {
                content:'',
                tips:'javascript',
                author:'',
                title:'',
                id:''
                // { tips: 'javascript', title: '标题', content: '内容' }
            },
            editor:{}
        }
        
    }

    componentDidMount () {
        this.initEditor()
     }
      
     initEditor () {
         const elem = this.refs.editorElem
         const editor = new E(elem)
      
         this.editor = editor
      
         editor.customConfig.zIndex = 100
         editor.customConfig.uploadImgServer = BaseUrl
         // 限制一次最多上传 1 张图片
         editor.customConfig.uploadImgMaxLength = 1
         {/* editor.customConfig.customUploadImg = function (files, insert) {
           // files 是 input 中选中的文件列表
           console.log(files)
           if (files[0]) {
             const formData = new window.FormData()
             formData.append('file', files[0], 'cover.jpg')
             fetch(BaseUrl, {
               method: 'POST',
               body: formData
             }).then((res) => {
               return res.json()
             }).then((res) => {
               const data = res.resultData
               if (data) {
                 // 上传代码返回结果之后，将图片插入到编辑器中
                 insert(data.resourceUrl)
               } else {
                 console.log(data.msg)
               }
             })
           } else {
             message.info('請選擇要上傳的圖片')
           }
         } */}
         editor.customConfig.menus = [
           'head', // 标题
           'bold', // 粗体
           'fontSize', // 字号
           // 'fontName', // 字体
           'italic', // 斜体
           'underline', // 下划线
           'strikeThrough', // 删除线
           'foreColor', // 文字颜色
           // 'backColor', // 背景颜色
           'link', // 插入链接
           'list', // 列表
           'justify', // 对齐方式
           'quote', // 引用
           'emoticon', // 表情
           //'image', // 插入图片
           // 'table', // 表格
           // 'video', // 插入视频
           // 'code', // 插入代码
           'undo', // 撤销
           'redo' // 重复
         ]
         editor.customConfig.lang = {
           '设置标题': 'Title',
           '字号': 'Size',
           '文字颜色': 'Color',
           '设置列表': 'List',
           '有序列表': '',
           '无序列表': '',
           '对齐方式': 'Align',
           '靠左': '',
           '居中': '',
           '靠右': '',
           '正文': 'p',
           '链接文字': 'link text',
           '链接': 'link',
           '上传图片': 'Upload',
           '网络图片': 'Web',
           '图片link': 'image url',
           '插入视频': 'Video',
           '格式如': 'format',
           '上传': 'Upload',
           '创建': 'init'
         }
         editor.create()
       }
       
    success = (text) => {
      return message.success(text)
    }

    error = (text) => {
      return message.error(text)
    }

    warning = (text) => {
      return message.warning(text);
    };

    postData = (data) =>{
      postData('/article',data)
        .then(async res =>{
          console.log(res)
          if (res.code === 0) {
            this.success(res.message).then(()=>{
              this.props.history.push('/')
            })
          }else{
            this.error(res.message)
            await this.logout()
            this.props.history.push('/')
          }
        })
        .catch(err=>{
          console.log(err)
          // this.error(err)
        })
    }

    postCommit = (data) =>{
      //console.log(data)
      postData('/comment',data)
        .then(async res =>{
          console.log(res)
          if (res.code === 0) {
            this.success(res.message).then(()=>{
              // this.props.history.push('/article/'+this.props.match.params.id)
              // window.location.reload();
              // 成功会调用父组件的请求评论方法，重新渲染评论数
              this.props.getCommitdata(this.props.match.params.id)
              // 成功后清除富文本内容
              this.editor.txt.clear()
            })
          }else{
            this.error(res.message)
            await this.logout()
            this.props.history.push('/')
            // 成功后清除富文本内容
            this.editor.txt.clear()
          }
        })
        .catch(err=>{
          this.error(err)
        })
    }

    handlerclick = async ()=>{
        // console.log(this.editor.txt.html())
        const addArticle = this.state.addArticle
        // if (this.props.isnotAddarticle) {
          // 文章id
          addArticle.from = this.props.match.params.id
        // }else{

          addArticle.author = this.props.userInfo.user || ''
        // }
        addArticle.content = this.editor.txt.html()
        // 用户id
        addArticle.id = this.props.userInfo.id || ''
        addArticle.token = localStorage.token
        this.setState({
            addArticle
        })
        // console.log(addArticle)
        // if(addArticle.content.length == '') this.warning('内容不能为空')
        if(addArticle.author === '') return this.warning('请先登录')
        console.log(addArticle.content);
        
        if (addArticle.content === '') return this.warning('内容不能为空')
        if (this.props.isnotAddarticle) {
          let newaddCommit = {
            content:addArticle.content,
            // 评论的文章id
            article:addArticle.from,
            // 来源，品论人
            from:addArticle.id,
            token:localStorage.token
          }
          await this.postCommit(newaddCommit)
          return
        }
        if (addArticle.content !== '' && addArticle.author !== '') {
          if(addArticle.title === '') return this.warning('标题不能为空')
          // console.log(addArticle)
          
          await this.postData(addArticle)
        }
        console.log(this)
    }

    selechandleChange = (value) =>{
        const addArticle = this.state.addArticle
        if (this.props.isnotAddarticle) {
          return 
        }else{
          addArticle.tips = value
          addArticle.author = this.props.userInfo.user || ''
        }
        this.setState({
            addArticle
        })
        
    }

    inputonChange= (e) =>{
      const value = e.target.value
      const addArticle = this.state.addArticle
      
      if (this.props.isnotAddarticle) {
        console.log(value)
        return 
      }else{
        addArticle.title = value
      }
      this.setState({
        addArticle
      })
    }

    logout = () =>{
        this.props.dispatch((dispatch) =>{
            getData('/user/logout')
                .then(res=>{
                    dispatch({type:'LOGIN_OUT'})
                })
        })
    }

    render() {
      //console.log(this)
        // const { getFieldDecorator } = this.props.form;
        const isnotAddarticle = this.props.isnotAddarticle
        return (
            <div className='wrap-article' >
                <Card style={{ width: 600,'margin':'0 auto' }}>
                  {
                    isnotAddarticle || (
                      <div style={{'marginBottom':'15px'}}>
                        <Select defaultValue="javascript" style={{ width: 120 }} onChange={this.selechandleChange}>
                          <Option value="html">html</Option>
                          <Option value="javascript">javascript</Option>
                          <Option value="nodejs">nodejs</Option>
                          <Option value="react">react</Option>
                          <Option value="vue">vue</Option>
                        </Select>
                        <Input placeholder="标题" onChange={this.inputonChange} style={{'width':'400px','marginLeft':'20px'}}/>
                      </div>
                    )
                  }
                  
                  <div ref='editorElem' style={{ textAlign: 'left' }} />
                  <Button type="primary" onClick={this.handlerclick} className='add-addArticle'>
                    发表
                  </Button>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return ({
      userInfo: state.data
  })
}
Article = withRouter(connect(mapStateToProps)(Article))

const addArticle = Form.create({ name: 'addArticle' })(Article);
export default addArticle