const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation} = require('../validations/validation')

router.post('/register', async(req,res)=>{
    const {error} = registerValidation(req.body)
    res.send({message:error['details'][0]['message']})

    
})

router.post('/login', async(req,res)=>{

})

module.exports = router