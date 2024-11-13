// const UserModel = require("../models/Users")

// module.exports = {
//     login: async(req, res)=>{
//         const { username, password } = req.body
//         const user = await UserModel.findOne({
//             username: usernam
//         })
//         if (!user){
//             throw new ErrorResponse(400, "username or password incorrect")
//         }
//         return res.status(200).json({
//             statusCode: 200,
//             massage:"Done Login"
//         })
//     },
//     register: async(req, res)=>{
//         const body = req.body
//         if (error){
//             return res.status(400).json({
//                 statusCode: 400,
//                 message: error.massage
//             })
//         }

//         const user = await UserModel.create(value)
//         return res.status(201).json(user)
//     }
// }

