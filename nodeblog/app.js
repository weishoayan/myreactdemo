const Koa = require("koa");
const static = require("koa-static");
const views = require("koa-views");
const logger = require("koa-logger");
const router = require("./routers/router");
const { join } = require("path");
const body = require("koa-body");
const session = require("koa-session");
const app = new Koa;
const cors = require('koa2-cors')
app.keys = ["签字"];

const CONFIG = {
    keys: "Sid",
    maxAge : 36e5,
    overwrite : true,
    httpOnly : true,
    rolling : false
}

/* cors({
    origin: function (ctx) {
        //if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        //}
        //return 'http://localhost:3000'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))*/
app
    .use(logger())
    .use(session(CONFIG,app))
    .use(body())
    .use(cors())
    .use(static(join(__dirname,"public")))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3001,()=>{
        console.log("监听在3001端口");
    })


{
    // const {db} = require("./Schema/config");
    const User = require("./Models/user");
    const encrpty = require("./utils/encrpt");
    User.find({user:"admin"})
        .then(data => {
            if (data.length === 0) {
                new User({
                    user: "admin",
                    password: encrpty("admin"),
                    role: 666,
                    commentNum: 0,
                    articleNum: 0
                })
                .save()
                .then(data =>{
                    console.log("管理员账号:admin,密码:admin")
                })
                .catch(err =>{
                    console.log("管理员账号创建失败")
                })
            }else{
                console.log("管理员账号:admin,密码:admin")
            }
        })
}