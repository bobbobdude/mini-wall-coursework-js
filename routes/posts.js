const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')
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

//GET individual post 
router.get('/:postId',verifyToken, async(req,res)=>{
    try{
        const specificPostById = await Post.findById(req.params.postId)
        res.send(specificPostById)
    }catch(err){
        res.send({message:err})
    }
})

//GET all comments on a particular post
router.get('/:postId/comments', verifyToken, async(req,res)=>{
    try {
        const postExists = await Post.findById(req.params.postId)
        console.log("You are reading the comments on this post:", postExists)
        const allCommentsOnPost = await Comment.find({id_of_post_to_comment_on:req.params.postId})
        if (allCommentsOnPost.length == 0){
            return res.status(400).send({ message: 'No comments found. Try another post' }); //This works! If no COMMENTS are found this pops up
        }else{
            res.send(allCommentsOnPost) //This also works! If comments are found they are returned to the user
        }
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(400).send({ message: 'Error fetching post. Please try another PostId', error: err })//Users should only get here if the postId does not exist adn therefore they are trying to comment on something that doesnt exist
    }
})

//POST data to database
router.post('/',verifyToken, async(req,res)=>{
    const userId = req.user._id
    const user = await User.findById(userId) //First we find the user in the DB from the userId provided in the headers and create a variable containing this data
    console.log(userId) //This gets the unique user ID from the verify function and prints it on the console in VSCode
    const postData = new Post({
        post_title: req.body.post_title,
        timestamp: req.body.timestamp,
        post_owner: user.username,
        post_owner_id: userId,
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

//POST a comment on a particular post 

router.post('/:postId/comments',verifyToken, async(req,res)=>{
    const userIdOfCommenter = req.user._id
    const postToCommentOn = await Post.findById(req.params.postId)
    console.log(postToCommentOn)
    const originalPoster = postToCommentOn.post_owner_id

    if (userIdOfCommenter == originalPoster){
        return res.send("You cannot comment on your own post.")
    } 
    const commentData = new Comment({
        id_of_post_to_comment_on: req.params.postId, //This should take the post id sent in the URL and assign it to this variable
        comment: req.body.comment,
        timestamp:req.body.timestamp,
        comment_owner_id: userIdOfCommenter,
        likes: 0
    })

    try{
        const postExists = await Post.findById(req.params.postId)
        const commentToSave = await commentData.save()
        res.send(commentToSave)
    }catch(err){
        res.status(400).send({ message: 'Error finding post or incorrect body sent. Please try another PostId or modify the body to match the comment schema', error: err })
    }

})

//PATCH existing data
router.patch('/:postId',verifyToken, async(req,res) =>{
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
router.delete('/:postId',verifyToken, async(req,res)=>{
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)

    }catch(err){
        res.send({message:err})
    }
})

module.exports = router 