{/* This utils hash password receive from front-end 
and hash it -> compared it saved from database 
if match -> allow user login */}
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(SALT_ROUND, (err, salt) => {
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

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed) //boolean
}
module.exports = {comparePassword, hashPassword}
