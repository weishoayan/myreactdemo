const CommentSchema = require("../Schema/comment");

const {db} = require("../Schema/config");

const Comment = db.model("comments",CommentSchema);

module.exports = Comment