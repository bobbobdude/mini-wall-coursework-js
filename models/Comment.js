const mongoose = require('mongoose')

const CommentsSchema = mongoose.Schema({
    id_of_post_to_comment_on: {
        type:String 
    },
    timestamp: {
        type:Date,
        default:Date.now 
    },
    comment:{
        type:String
    },
    comment_owner_id: {
        type:String 
    },
    likes: {
        type:Number
    }
})

module.exports = mongoose.model('Comment', CommentsSchema)