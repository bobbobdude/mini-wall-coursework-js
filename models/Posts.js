const mongoose = require('mongoose')

const PostsSchema = mongoose.Schema({
    post_title: {
        type:String 
    },
    timestamp: {
        type:Date
    },
    post_owner: {
        type:String 
    },
    post_description: {
        type:String 
    },
    likes: {
        type:Number
    }
})

module.exports = mongoose.model('Posts', PostsSchema)
