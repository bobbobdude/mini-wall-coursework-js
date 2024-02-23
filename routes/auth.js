const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.post('/register', async(req,res)=>{
    console.log(req.body)
})

router.post('/login', async(req,res)=>{

})

module.exports = router