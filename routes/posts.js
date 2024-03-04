const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

//GET all users
router.get("/", verifyToken, async (req, res) =>{
    try{
        const posts = await Post.find()
        res.send(posts)
    }catch(err){
        res.send({message:err})
    }
})

//GET individual user 
router.get('/:userId', async(req,res)=>{
    try{
        const specificPostById = await Post.findById(req.params.userId)
        res.send(specificPostById)
    }catch(err){
        res.send({message:err})
    }
})

//POST data to database
router.post('/', async(req,res)=>{
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

//PATCH existing data
router.patch('/:postId', async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                post_title: req.body.post_title,
                timestamp: req.body.timestamp,
                post_owner: req.body.post_owner,
                post_description: req.body.post_description,
                likes: req.body.likes
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

//DELETE specific user 
router.delete('/:postId', async(req,res)=>{
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)

    }catch(err){
        res.send({message:err})
    }
})

module.exports = router 