const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
    username: {
        type:String,
        require:true, 
        min:3, 
        max:256
    },
    email: {
        type:String,
        require:true, 
        min:6, 
        max:256
    },
    password: {
        type:String,
        require:true, 
        min:6, 
        max:1024
    },
    date: {
        type:date,
        default:Date.now 
    },
})

module.exports = mongoose.model('User', UsersSchema)