//获得操控User数据库的权限
const User = require("../Models/user");

//获得加密函数
const crypto = require("../utils/encrpt");

const { tokenSign , tokenVerify } = require('../utils/jsonwebtoken')

//注册
exports.reg = async (ctx)=>{
    const data = ctx.request.body;
    console.log(data,'userInfo')
    const user = data.username;
    const password = data.password;
    await new Promise((res,rej)=>{
        User.find({user},async (err,data)=>{
            // 查询错误
            if(err) return rej(err)
            // 用户名不存在，可以先写入数据库
            if (data.length === 0){
               new User({
                    user,
                    password:crypto(password),
                    commentNum: 0,
                    articleNum: 0
                }).save((err,data)=>{
                    // 如果写入数据库出错
                    if(err) rej(err)
                    res(data)
                    // console.log("写入数据库了0")
                })
            } else{
            // 已存在有用户名
                res("")
                // console.log("用户名已存在")
            }
        })
    }).then(async data=>{
        if (data) {
            // 注册成功
            ctx.body = {code:0,message:'注册成功'}
            // await ctx.render("isOk",{
            //     title : "注册成功",
            //     status : "注册成功"
            // })
            // console.log("写入数据库了0")
        }else{
            ctx.body = {code:1,message:'注册失败，用户名已存在'}
            // await ctx.render("isOk",{
            //     title : "用户名已存在",
            //     status : "用户名已存在"
            // })
            // console.log("用户名已存在")
        }
    }).catch(async err=>{
        ctx.body = {code:2,message:'注册失败，系统故障'}
        // await ctx.remove("isOk",{
        //     title : "注册失败",
        //     status : "注册失败"
        // })
        // console.log("失败")
    })
}


//登录
exports.login = async (ctx)=>{
    const data = ctx.request.body;
    console.log(data)
    const user = data.username;
    const password = data.password;
    // console.log(data)
    await new Promise((res,rej)=>{
        User.find({user},(err,data)=>{
            // 查询错误
            if(err) return rej(err);
            if (data.length === 0) {
                // 用户名不存在
                rej("")
            }else{
                if (data[0].password === crypto(password)) {
                    // console.log(1)
                    res(data)
                }else{
                    // 密码错误
                    res("")
                }
            }
        })
    }).then(async data =>{
        console.log(data,'aaa')
        if (!data) {
            // console.log("密码错误0")
            return ctx.body = {
                code:1,
                message:'登陆失败,密码错误'
            }
            
        }
    {    // ctx.cookies.set("user",user,{
        //     domain : "localhost",
        //     path : "/",
        //     maxAge : 36e5,
        //     httpOnly : true,
        //     overwrite : false
        // })
        // ctx.cookies.set("id",data[0]._id,{
        //     domain : "localhost",
        //     path : "/",
        //     maxAge : 36e5,
        //     httpOnly : true,
        //     overwrite : false
        // })
        // ctx.session = {
        //     user,
        //     id : data[0]._id,
        //     avatar: data[0].avatar,
        //     role: data[0].role
        // }
        // console.log("登录成功")
    }
        
        ctx.body = {
            code:0,
            message:'登陆成功',
            data:{
                user,
                avatar:data[0].avatar,
                role: data[0].role,
                id : data[0]._id,
                commentNum:data[0].commentNum,
                articleNumL:data[0].articleNum,
                token:tokenSign(user+data[0]._id)
            }
        }
        
    }).catch(async err =>{
        if (typeof err === "string") {
            
            ctx.body = {
                code:2,
                message:'登陆失败,没有这个用户名'
            }
        }else{
            
            ctx.body = {
                code:-1,
                message:'系统错误'
            }

        }
    })
}

//保持用户状态
exports.keepLog = async (ctx, next) => {
    console.log('保持用户状态')
    const token = ctx.request.body.token
    console.log(token)
    await tokenVerify(token)
        .then(async res =>{
            await next()
            console.log('没过期')
        })
        .catch(err => {
            ctx.body = {
                message:'tokeng已过期，请重新登录',
                code:1
            }
        })
}
  
// 用户退出中间件
exports.logout = async ctx => {
    ctx.session = null;
    ctx.cookies.set("user",null,{
        maxAge:0
    })
    ctx.cookies.set("id",null,{
        maxAge:0
    })

    // ctx.redirect("/")
    ctx.body = {
        code:0,
        message:'退出成功'
    }
}

// 用户上传头像
exports.upload = async ctx =>{
    const filename = ctx.req.file.filename;
    // console.log(ctx.req.file)
    let data = {};
    await User.update({_id:ctx.session.id},{$set:{avatar: "/avatar/"+filename}},(err,res)=>{
        if (err) {
            data = {
                message: "上传失败"
            }
        }else{
            data = {
                message: "上传成功"
            }
            // console.log(filename,ctx.session.avatar,"01")
            // 上传完头像后把sesion更新  上传完图片并更新头像
            ctx.session.avatar = "/avatar/"+filename;
        }
    })
    ctx.body = data
}

