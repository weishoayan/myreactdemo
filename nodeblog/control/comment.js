const Comment = require("../Models/comment");
const User = require("../Models/user");
const Article = require("../Models/article");

// 发表评论
exports.addcomment = async ctx =>{
    // let message = {
    //     status:0,
    //     msg: "用户未登录"
    // }
    // if(ctx.session.isNew){
    //     // console.log("用户未登录")
    //     return ctx.body = message
    // }
    const data = ctx.request.body;
    // 把是谁评论的用户id发过来
    // data.from = ctx.session.id;
    // return console.log(data)
    await new Comment(data)
        .save()
        .then(data => {
            console.log(data)
            message = {
                code: 0,
                message: "评论成功"
            }
            // 更新蚊帐的评论数
            Article.updateOne({_id: data.article},{$inc:{commentNum:1}},err=>{
                if(err) return err
                console.log("文章评论数加1")
            })
            //更新用户的评论数
            User.updateOne({_id: data.from},{$inc:{commentNum:1}},err=>{
                if(err) return err
                console.log("用户的评论数加1")
            })
            
        })
        .catch(err => {
            // console.log("111111")
            message = {
                code: 1,
                message: "评论失败"
            }
        });
    ctx.body = message
    
}

// 后台 - 获取用户所有评论
exports.comments = async ctx =>{
    const {id,role} = ctx.request.body
    console.log('commits')
    let data;
    if (role > 1) {
        data = await Comment.find().populate({
            path: "article",
            select: "title"
        })
    }else{
        data = await Comment.find({from:id}).populate({
            path: "article",
            select: "title"
        })
    }
    ctx.body = {
        code: 0,
        data,
        count: data.length
    } 
}

//删除评论
exports.del = async ctx =>{
    // console.log(ctx.params.id)
    const id = ctx.params.id;
    let res = {
        code: 0,
        message: "删除成功"
    }
    // const data = await Comment.findById({_id:id}).then(err =>err);
    // await User.update({_id:data.from},{$inc:{commentNum:-1}});
    // await Article.update({_id:data.article},{$inc:{commentNum:-1}});
    await Comment.findById(id)
        .then(data => data.remove())
        .catch(err=>{
            res = {
                code: 1,
                message: "删除失败"
            }
    })
    ctx.body = res
}