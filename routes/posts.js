const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

router.get("/", async (req, res) =>{
    try{
        const posts = await Post.find()
        res.send(posts)
    }catch(err){
        res.send({message:err})
    }
})

router.get('/:userId', async(req,res)=>{
    try{
        const specificPostById = await Post.findById(req.params.userId)
        res.send(specificPostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router 