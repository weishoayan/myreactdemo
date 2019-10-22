const Article = require("../Models/article");
const Comment = require("../Models/comment");
const User = require("../Models/user");

const fs = require("fs");
const { join } = require("path");



//进入后台
/* exports.index = async ctx =>{
    if(ctx.session.isNew){
        return await ctx.render("404",{
            title: "404"
        })
    }
    // console.log(ctx.params)
    const id = ctx.params.id;
    const arr = fs.readdirSync(join(__dirname,"../views/admin"))
    let boolean = false;
    arr.forEach(v =>{
        const name = v.replace(/^(admin\-)|(\.pug)$/g,"");
        if (name === id) {
            boolean = true;
        }
    })
    if (boolean) {
        await ctx.render("admin/admin-" + id,{
            role: ctx.session.role
        })
    }else{
        return await ctx.render("404",{
            title: "404"
        })
    }
} */


// 返回所有用户的名称、文章数量、权限、评论数量
exports.users = async ctx =>{
    /* if(ctx.session.isNew){
        return await ctx.render("404",{
            title: "404"
        })
    } */
    let data = await User.find()
    // console.log(data)
    // data.forEach(v =>{
        

    //     console.log(v,v.articleCount,v.commentCount)
    // })
    console.log(data)
    data.forEach(v =>{
        // v.commentCount = v.commentNum
        // v.articleCount = v.articleNum
        ctx.body = {
            code: 0,
            data,
            count: data.length
        }

    })
}


// 删除用户
exports.del = async ctx =>{
    const id = ctx.params.id;
    let res = {
        state: 1,
        message: "成功"
    }
    await User.findById(id)
        .then(data => data.remove())
        .catch(err =>{
            res = {
                state: 0,
                message: err
            }
        })
    ctx.body = res
}