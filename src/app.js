const express = require('express')
const app = express()
const router = require('./ExpressRouter/router')
require('./DB/connection')


// giving the value or just using 3001 port
const port = process.env.PORT || 3001;  

//This is a middleware used to get the body data in json.
app.use(express.json())
app.use(router)



app.listen(port, ()=> {
    console.log('Connection is successful')
})