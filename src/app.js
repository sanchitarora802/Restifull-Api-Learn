const express = require('express')
const app = express()
require('./DB/connection')
// giving the value or just using 5000 port
const port = process.env.PORT || 3001;  

app.get('/',(req,res) => {
    res.send("Starting Page")
})

app.get('/students',(req,res) => {
    res.send("hello from other sides. get")
})

app.listen(port, ()=> {
    console.log('Connection is successful')
})