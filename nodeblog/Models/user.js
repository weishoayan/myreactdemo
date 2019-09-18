const { db } = require("../Schema/config");

//
const UserSchema = require("../Schema/user");

//得到操作权力
const User = db.model("users",UserSchema);

module.exports = User