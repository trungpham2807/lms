{/* This utils hash password receive from front-end 
and hash it -> compared it saved from database 
if match -> allow user login */}
// const bcrypt = require('bcrypt');
// const dotenv = require('dotenv');
// dotenv.config();
// SALT_NUMBER = process.env.SALT_NUMBER

// export const hashPassword = (password) => {
//     return new Promise((resolve, reject) => {
//         bcrypt.genSalt(SALT_NUMBER, (err, salt) => {
//             if(err){
//                 reject(err)
//             }
//             bcrypt.hash(password, salt, (err, hash) => {
//                 if(err){
//                     reject(err)
//                 }
//                 // success
//                 resolve(hash)
//             })
//         })
//     })
// }

// export const comparePassword = (password, hashed) => {
//     return bcrypt.compare(password, hashed)
// }