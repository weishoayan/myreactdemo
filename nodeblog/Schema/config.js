//数据库导入
const mongoose = require("mongoose");
//连接数据库下面的wula的库
const db = mongoose.createConnection(
    "mongodb://localhost:27017/user",
    {useNewUrlParser:true});

mongoose.Promise = global.Promise;

//连接数据库成功
db.on("error",()=>{console.log("wula数据库连接失败")});
//连接数据库失败
db.on("open",()=>{console.log("wula数据库连接成功")});

//规范数据字段，得到Schema类
const Schema = mongoose.Schema;

module.exports = {db,Schema};