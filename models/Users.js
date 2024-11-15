const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dbhi')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel