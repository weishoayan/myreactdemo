# myreactdemo
我的哈哈

前端的

在blog-demo 打开命令行 npm i

后端的

在nodeblog 打开命令行 npm i

在nodeblog目录创建一个database，database里面创建一个db文件夹

在database文件夹里面打开在命令行输入 mongod --dbpath ./db    启动mongodb数据服务

然后启动node服务

由于我上传是过滤了我本地的database文件夹，所以是新的数据库，想要发表评论发表文章需要进行注册，用户名随意，只有登录才能发表评论

用户token有效期是3分钟，在nodeblog/utils/jsonwebtoken.js 修改时间


