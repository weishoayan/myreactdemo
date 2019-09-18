const crypto = require("crypto");

//加密
module.exports = function(password,key="mmm"){
    const hmac = crypto.createHash("sha256",key);
    hmac.update(password)
    return hmac.digest("hex")
}