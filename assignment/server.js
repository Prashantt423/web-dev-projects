const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const app = express();
app.use(express.json());
var asyncLoop = require('node-async-loop');
const { randomUUID } = require('crypto'); // Added in: node v14.17.0
var path = require('path')
require('dotenv').config()
var database
const url = process.env.URL;

//GET /testers
app.get("/testers", (req, res) => {
  database.collection('testerData').find({}).toArray((err, result) => {
    if (err) throw (err)
    res.send(result)

  })
})

//Get /tester?gender=Male
app.get("/tester", (req, res) => {
  database.collection('testerData').find(req.query).toArray(async (err, result) => {
    if (err) throw (err)
    res.json(result)
  })
});

// Delete /tester?credit=0 -> Delete all tester whose credit is 0
app.delete("/tester", (req, res) => {
  database.collection('testerData').deleteMany(req.query, (err, results) => {
    if (err) throw (err)
    res.send(results)
  })

})

//  POST /tester?testerTasks={taskID : '1212' , name : "" , completed : false , ....add more field } 
//   get params in body as tasks
app.post("/tester", (req, res) => {
  const ranId2 = randomUUID();
  var dt = new Date();
  dt.setDate(dt.getDate() + 5);
  const task= req.body;
  const newTask = {
    isCompleted: false,
    reference: ranId2,
    dueDate: dt,
    taskdetails: task ,
    taskId: parseInt(Math.random() * 10000),
  }
  const finalTask=Object.create(newTask);
  database.collection('testerData').updateMany({}, {
    $push: {testerTasks: finalTask }
  }, (err, result) => {
    if (err) throw (err)
    res.send(result);
  });

})

// GET /tester/id  -> Get  task of particular id
app.get("/tester/:id", async (req, res) => {
  
  const query = { "testerTasks._id":req.body.id}
  const cursor = database.collection('testerData').find(query)
  await cursor.forEach((item)=>{
    res.send(item.testerTasks)
  })
  

})


// GET /task-completed  -> LIST all completed task
app.get("/testers/task-completed", async (req, res) => {
  
  const query = { "testerTasks.isCompleted":true}
  const cursor = database.collection('testerData').find(query)
  await cursor.forEach((item)=>{
   res.send(item)
  })
 
})


// PUT /tester?income=32424 -> Add testertask whose annualincome is greater than coming in params
app.put("/tester",(req,res)=>{
  const ranId2 = randomUUID();
  var dt = new Date();
  dt.setDate(dt.getDate() + 5);
  const task= req.body;
  const newTask = {
    isCompleted: false,
    reference: ranId2,
    dueDate: dt,
    taskdetails: task ,
    taskId: parseInt(Math.random() * 10000),
  }
  const finalTask=Object.create(newTask);
  database.collection('testerData').updateMany({"annualincome":{$gt : parseInt(req.query.income) }}, {
    $push: {testerTasks: finalTask }
  }, (err, result) => {
    if (err) throw (err)
    res.send(result);
  });
})


// api endpoint
app.get("/api", (req, res) => {
  database.collection('testerData').find({}).toArray((err, result) => {
    if (err) throw (err)
    res.send(result)
  })
})

app.listen(8080, () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, res) => {
    if (err) throw (err)
    database = res.db('assignment')
    console.log("connection successfull!");
  })
})
