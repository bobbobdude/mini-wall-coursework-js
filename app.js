const express = require('express')
const app = express()

const loginRoute = require('./routes/login')

//Middleware
app.use('/login', loginRoute)

app.listen(3000, ()=>{
    console.log('Your server is alive.')
})

app.get('/', (req,res)=> {
    res.send("You are on your home page!")
})