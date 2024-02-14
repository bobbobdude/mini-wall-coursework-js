const express = require('express')
const router = express.Router()

const Post = require('../models/Posts')

router.get("/", async (req, res) =>{
    try{
        const posts = await Post.find()
        res.send(posts)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router 