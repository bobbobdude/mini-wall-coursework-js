const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation} = require('../validations/validation')

router.post('/register', async(req,res)=>{
    res.send(registerValidation(req.body))
})

router.post('/login', async(req,res)=>{

})

module.exports = router