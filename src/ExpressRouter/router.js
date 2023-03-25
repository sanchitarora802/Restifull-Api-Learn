const express = require("express");
const router = express.Router();
const Student = require("../DB/Schema/students");

router.get("/", (req, res) => {
  res.send("Starting Page");
});

//These all are RESTAPI, So Endpoint will be same and only Method will be different

//Create Students Data  with PROMISES
router.post("/students", (req, res) => {
  // console.log('bodyData',req.body)
  const incommingUser = new Student(req.body);
  incommingUser
    .save()
    .then(() => {
      res.status(200).send("User Created with details");
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

//Get all Students Data with ASYNC-AWAIT
router.get("/students", async (req, res) => {
  try {
    const data = await Student.find();
    if (!data) res.status(200).send("No Data Found");
    else res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

//Get single Student Data
// router.get('/students/:id',async (req,res)=>{
//     try{
//        //Get the unique id
//        const _id = req.params.id;
//        const getStudent = await Student.findById(_id);
//        if(!getStudent)
//        res.status(404).send("Page Not Found");
//        else
//        res.status(200).send(getStudent);
//     }catch(e){
//       //  console.log(e)
//         res.status(500).send("Internal Server Error");
//     }
// })

//Get single Student Data with Single query params 
router.get("/apiSingleQuery/students", async (req, res) => {
  try {
    const queryValue = req.query.name
    const getStudent = await Student.find({name:queryValue});
    if (!getStudent) res.status(404).send("Page Not Found");
    else res.status(200).send(getStudent);
  } catch (e) {
    console.log(e)
    res.status(500).send("Internal Server Error");
  }
});

//Get single Student Data with Multiple query params 
router.get("/apiMultipleQuery/students", async (req, res) => {

    //Destructure the query and create an empty object
    const {name,city} = req.query
    const queryObj = {};

    //if the destructured value is their then add it to the object created and the complete object will be passed.
    if(name)
    queryObj.name = name;

    if(city)
    queryObj.city = city;

    try {
      const getStudent = await Student.find(queryObj);
      if (!getStudent) res.status(404).send("Page Not Found");
      else res.status(200).send(getStudent);
    } catch (e) {
      console.log(e)
      res.status(500).send("Internal Server Error");
    }
  });

// update the students by id
router.patch("/students/:id", async (req, res) => {
  try {
    //Get the unique id
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updateStudent) res.status(404).send("Page Not Found");
    else res.status(200).send("Record Updated Successfully.");
  } catch (e) {
    //  console.log(e)
    res.status(500).send("Internal Server Error");
  }
});

//Delete the student by id
router.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(_id);
    if (!deleteStudent) res.status(404).send("Page Not Found");
    else res.status(200).send("Record Deleted Successfully.");
  } catch (e) {
    //  console.log(e)
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
