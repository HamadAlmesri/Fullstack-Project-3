
const crypto = require("crypto")

const hashPassword = (pass , salt = "secret") => crypto.createHmac('sha512' , salt).update(pass).digest('hex')


export {
    hashPassword
}