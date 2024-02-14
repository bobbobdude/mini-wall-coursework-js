const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

const loginRoute = require('./routes/login')
const postsRoute = require('./routes/posts')

//Middleware
app.use('/login', loginRoute)

app.use(bodyParser.json())
app.use('/posts', postsRoute)


app.get('/', (req,res)=> {
    res.send("You are on your home page!")
})

try{
    mongoose.connect(process.env.DB_CONNECTOR)
    console.log('Your mongoDB connector is on...')
} catch(err) {
    console.log(err)
}

app.listen(3000, ()=>{
    console.log('Your server is alive.')
})