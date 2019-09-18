const { Schema } = require("./config");
const ObjectId = Schema.Types.ObjectId;

//得到Schema实例
const ArticleSchema = new Schema({
    // 标题
    title: String,
    // 内容
    content: String,
    // 作者
    author: {
        type: ObjectId,
        ref: "users"
    },
    // 类别
    commentNum: Number,
    tips: String

},{
    versionKey:false,
    timestamps:{
        createdAt:"created"
    }
});

// 钩子
ArticleSchema.post("remove",doc =>{
    const User = require("../Models/user")
    const Comment = require("../Models/comment")
    User.findOneAndUpdate(doc.author,{$inc:{articleNum:-1}}).exec();
    Comment.find({article:doc._id})
        .then(data =>{
                console.log(data)
                data.forEach(v => v.remove());
        })
})

module.exports = ArticleSchema

