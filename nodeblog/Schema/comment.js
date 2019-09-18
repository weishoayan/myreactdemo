const { Schema } = require("./config");
const ObjectId = Schema.Types.ObjectId;

//得到Schema实例
const CommentSchema = new Schema({
    content:String,
    from:{
        type: ObjectId,
        ref: "users"
    },
    article:{
        type: ObjectId,
        ref: "articles"
    }
},{versionKey:false,timestamps:{
    createdAt: "created"
}});

CommentSchema.post("remove",doc =>{
    const Article = require("../Models/article");
    const User = require("../Models/user");
    Article.findOneAndUpdate({_id:doc.article},{$inc:{commentNum:-1}}).exec();
    User.findOneAndUpdate({_id:doc.from},{$inc:{commentNum:-1}}).exec();
})



module.exports = CommentSchema

