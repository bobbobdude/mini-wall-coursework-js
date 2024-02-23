const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

//Middleware
app.use(bodyParser.json())
app.use('/posts', postsRoute)
app.use('/api/user', authRoute)


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