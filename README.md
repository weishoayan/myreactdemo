# myreactdemo
实在想不到做什么项目，只能做个简单的，有个板块调用cnode网站api，使用它的数据


还没做完，首页模块的二级路由下面的分页有点小问题

前端的

在blog-demo 打开命令行 npm i

后端的

在nodeblog 打开命令行 npm i

在nodeblog目录创建一个database，database里面创建一个db文件夹

在database文件夹里面打开在命令行输入 mongod --dbpath ./db    启动mongodb数据服务

然后启动node服务

由于我上传是过滤了我本地的database文件夹，所以是新的数据库，想要发表评论发表文章需要进行注册，用户名随意，只有登录才能发表评论

用户token有效期是3分钟，在nodeblog/utils/jsonwebtoken.js 修改时间

还有用户的后台管理前端没做，后端的做好了，可以查看该用户发表了多少文章、评论删除文章、评论；超级管理员可以查看所有用户删除文章评论
