const Router = require('koa-router');
const router = new Router;
const user = require("../control/user");
const article = require("../control/article");
const comment = require("../control/comment");
const admin = require("../control/admin");
const upload = require("../utils/upload");





//登录
router.post('/user/login',user.login);


//注册页面
router.post('/user/reg',user.reg);

//用户退出
router.get("/user/logout",user.logout)


//文章的发表
router.post("/article",user.keepLog,article.add)

//获取首页文章
router.get("/page/:id",article.getList)

// html子页面
router.get("/tips/html/:id",article.tipsList)
router.get('/tips/javascript/:id',article.tipsList);
router.get('/tips/nodejs/:id',article.tipsList);
router.get('/tips/react/:id',article.tipsList);
router.get('/tips/vue/:id',article.tipsList);


//文章页面
router.get("/article/:id",article.getarticle)

//发表评论
router.post("/comment",user.keepLog,comment.addcomment)

// 进入后台
// router.get("/admin/:id",user.keepLog,admin.index)


//头像管理
// router.get("/admin/userface",user.keepLog,admin.userface)

//获取用户所有评论
router.post("/user/comments",user.keepLog,comment.comments)

//获取用户所有文章
router.post("/user/articles",user.keepLog,article.artlists)


//管理员获取所有用户
// router.get("/user/users",user.keepLog,admin.users)

//删除用户
// router.del("/admin/user/:id",user.keepLog,admin.del)


// 头像上传
// router.post("/upload",user.keepLog,upload.single("file"),user.upload)

// 删除文章
router.delete("/article/:id",article.delete)

// 删除评论
router.delete("/comment/:id",comment.del)

module.exports = router;