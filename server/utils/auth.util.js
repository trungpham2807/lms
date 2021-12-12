{/* This utils hash password receive from front-end 
and hash it -> compared it saved from database 
if match -> allow user login */}
const bcrypt = require('bcrypt');

const SALT_ROUND = process.env.SALT_ROUND; 

const authUtils = {}
authUtils.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err){
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err){
                    reject(err)
                }
                // success
                resolve(hash)
            })
        })
    })
}

authUtils.comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed) //boolean
}
module.exports = authUtils
