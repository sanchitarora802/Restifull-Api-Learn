const express = require('express')
const app = express()
const Student = require('./DB/Schema/students')
require('./DB/connection')


// giving the value or just using 3001 port
const port = process.env.PORT || 3001;  

//This is a middleware used to get the body data in json.
app.use(express.json())

app.get('/',(req,res) => {
    res.send("Starting Page")
})

app.post('/students',(req,res) => {
   // console.log('bodyData',req.body)
   const incommingUser = new Student(req.body)
   incommingUser.save().then(()=>{
    res.status(200).send("User Created with details")
   }).catch((e)=>{
    res.status(400).send(e)
   })
})

app.listen(port, ()=> {
    console.log('Connection is successful')
})