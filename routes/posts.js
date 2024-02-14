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

router.post('/', async(req,res)=>{
    //console.log(req.body)
    const postData = new Post({
        post_title: req.body.post_title,
        timestamp: req.body.timestamp,
        post_owner: req.body.post_owner,
        post_description: req.body.post_description,
        likes: 0
    })

    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch{
        res.send({message:err})
    }

})

module.exports = router 