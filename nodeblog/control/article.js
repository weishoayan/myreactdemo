const Article = require("../Models/article");
const Comment = require("../Models/comment");
const User = require("../Models/user");

// 返回文章发表页
exports.addArticle = async ctx =>{
    // console.log(ctx.session)  //有用户头像
    await ctx.render("add-article",{
        title: "文章发表页",
        session: ctx.session
    })
}

// 文章的发表
exports.add = async ctx =>{

    // 获取用户发送来的数据
    const data = ctx.request.body;
    // console.log(data,ctx.session.id)
    // return ctx.body = {
    //     code:0
    // }
    // 需要title、content、tips、author
    // 往数据里添加用户名称
    data.author = data.id;
    data.commentNum = 0;

    await new Promise((res,rej)=>{
        new Article(data).save((err,data)=>{
            if(err) return rej(err)
            res(data)
            console.log("发表成功")
            User.updateOne({_id:data.author},{$inc:{articleNum:1}},err=>{
                if(err)return console.log(err,"出错啦")
                // console.log("加1")
            })
        })
    })//www用户   6f19
    .then(data=>{
        // console.log(1)
        ctx.body = {
            message: "发表成功",
            // status 是发送给前端来判断true和false
            code: 0
        }
    })
    .catch(err=>{
        // console.log(2)
        ctx.body = {
            message: "发表失败",
            code: 1
        }
    })

}

// 渲染主页的文章列表
exports.getList = async ctx =>{
    let page = ctx.params.id || 1;
    page--
    const maxNum = await Article.estimatedDocumentCount();
    // console.log(page)
    const article = await Article
            .find()
            .sort("-created")
            .skip(5 * page)
            .limit(5)
            .populate({
                path: "author",
                select: 'id user avatar'
            })
            .then(data => data)
            .catch(err => err)
            // console.log(ctx.session)
    ctx.body = {
        data:article,
        maxNum,
        code:0
    }
}

// html子页面
exports.tipsList = async ctx =>{
    let page = ctx.params.id || 1;
    page--
    const tips = ctx.originalUrl.split('/')[2];
    // 文章的类型
    console.log(tips)
    // 文章总数
    const maxNum = await Article.estimatedDocumentCount();
    // 某条tips类型的总数
    const len = await Article.find({tips:tips}) //搜索类型是{url}的
    const article = await Article
            .find({tips:tips})
            .sort("-created")
            .skip(5 * page)
            .limit(5)
            .populate({
                path: "author",
                select: 'id user avatar'
            })
            .then(data => data)
            .catch(err => err)
            // console.log(ctx.session)
    
            ctx.body = {
                data:article,
                code:0,
                maxNum,
                len:len.length
            }
}

//文章详情
exports.getarticle = async ctx =>{
    const id = ctx.params.id
    const article = await Article
        .findById(id)
        .populate({
            path: "author",
            select: "user avatar"
        })
        .then(data=>data)
    const comment = await Comment
        .find({article: id})
        .sort("-created")
        .populate({
            path: "from",
            select: "user avatar"
        })
        .then(data => data)
        .catch(err => {
            console.log(err)
        })
    ctx.body = {
       article,
       comment,
       code:0
    }
    // await ctx.render("article",{
    //     title: "文章页面",
    //     session: ctx.session,
    //     article,
    //     comment

    // })
}

//在后台获取所有文章
exports.artlists = async ctx =>{
    // console.log(ctx.session.role)
    const id = ctx.session.id;
    let data;
    if (ctx.session.role > 1) {
        data = await Article.find()
    }else{
        data = await Article.find({author:id});
    }
    ctx.body = {
        code: 0,
        data,
        count: data.length
    }
}


// 删除文章
exports.delete = async ctx =>{
    const id = ctx.params.id;
    let res = {
        state: 1,
        message: "删除成功"
    }
    await Article.findById(id)
    .then(data => data.remove())
    .catch(err=>{
        res = {
            state: 0,
            message: err
        }
    })
    ctx.body = res
}