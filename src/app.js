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

//These all are RESTAPI, So Endpoint will be same and only Method will be different

//Create Students Data  with PROMISES
app.post('/students',(req,res) => {
   // console.log('bodyData',req.body)
   const incommingUser = new Student(req.body)
   incommingUser.save().then(()=>{
    res.status(200).send("User Created with details")
   }).catch((e)=>{
    res.status(400).send(e)
   })
})


//Get all Students Data with ASYNC-AWAIT
app.get('/students',async (req,res)=>{
    try{
        const data = await Student.find()
        res.status(200).send(data)
    }
    catch(e)
    {
        console.log(e)
    }
})

//Get single Student Data
app.get('/students/:id',async (req,res)=>{
    try{
       //Get the unique id
       const _id = req.params.id;
       const getStudent = await Student.findById(_id);
       if(!getStudent)
       res.status(404).send("Page Not Found");
       else
       res.status(200).send(getStudent);
    }catch(e){
      //  console.log(e)
        res.status(500).send("Internal Server Error");
    }
})

// update the students by id
app.patch('/students/:id', async(req,res)=>{
    try{
         //Get the unique id
       const _id = req.params.id;
       const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{
        new:true
       })
       if(!updateStudent)
       res.status(404).send("Page Not Found");
       else
       {
        res.status(200).send("Record Updated Successfully.");
       }
    }
    catch(e){
        res.status(500).send("Internal Server Error");
    }
})

app.listen(port, ()=> {
    console.log('Connection is successful')
})