const express = require('express')
const app = express()

app.listen(3000, ()=>{
    console.log('Your server is alive.')
})

app.get('/', (req,res)=> {
    res.send("You are on your home page!")
})