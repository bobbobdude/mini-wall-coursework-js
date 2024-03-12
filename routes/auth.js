const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation,loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

router.post('/register', async(req,res)=>{
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    const userExists = await User.findOne({email:req.body.email})
    if (userExists){
        return res.status(400).send({message:'User already exists. Try logging in with your email.'})
    }

    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)

    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword

    })

    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }

})

router.post('/login', async(req,res)=>{
    
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }


    const user = await User.findOne({email:req.body.email})
    if (!user){
        return res.status(400).send({message:'User does not exist. Try creating an account with your email.'})
    }

    const passwordValidation = await bcryptjs.compare(req.body.password, user.password)
    if(!passwordValidation){
        return res.status(400).send({message:'Incorrect password'})
    }

    //Here we generate an token that authorises the user to access the data on the DB
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({'auth-token':token})

})

//A quickly written bit of code to get all users currently in DB
router.get('/users', async(req,res)=>{
    const allUsers = await User.find()
    return res.send(allUsers)
})

module.exports = router