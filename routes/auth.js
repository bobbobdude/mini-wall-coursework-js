const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation} = require('../validations/validation')

router.post('/register', async(req,res)=>{
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password

    })

    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }

})

router.post('/login', async(req,res)=>{

})

module.exports = router