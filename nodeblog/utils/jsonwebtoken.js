const jwt = require('jsonwebtoken')
exports.tokenSign = function (data){

    let token = jwt.sign({
        user: data
    }, 'haha', {
        expiresIn: 1200
    })
    //返回token
    return token
    // console.log(token)
}

exports.tokenVerify = function (token){
    return new Promise((res,rej)=>{

        jwt.verify(token, 'haha', function (err, data) {
            if (err) {
                console.log(err)
                rej(false)
            }
            //console.log('解析的数据', data)
            res(true)
        })
    })
}