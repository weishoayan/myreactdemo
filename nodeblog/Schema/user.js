const { Schema } = require("./config");

//得到Schema实例
const UserSchema = new Schema({
    // 账号
    user : String,
    // 密码
    password : String,
    // 邮箱
    email : String,
    // 性别
    sex : String,
    // 用户名
    username : String,
    // 年龄
    age : Number,
    // 城市
    city : String,
    // 默认头像
    avatar : {
        type : String,
        default : "/img/default.jpg"
    },
    role:{
        type: String,
        default: 1
    },
    // 文章数量
    articleNum : Number,
    // 评论数量
    commentNum : Number
},{versionKey:false});

UserSchema.post("remove",doc =>{
    const User = require("../Models/user");
    const Comment = require("../Models/comment");
    const Article = require("../Models/article");
    Article.find({author:doc._id})
        .then(data =>{
            data.forEach(v=>v.remove())
        })
    Comment.find({from:doc._id})
        .then(data =>{
            data.forEach(v => v.remove())
        })
    
})


module.exports = UserSchema

