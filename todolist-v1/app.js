const express = require ("express");
const bodyparser= require("body-parser");


const app= express();
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}));

let newlistitems=[];
app.set('view engine', 'ejs');


app.get("/",function(req,res){
  var today= new Date();
  var options={
    weekday:"long",
    day:"numeric",
    month: "long"
  };


  var day= today.toLocaleDateString("en-US",options);
  res.render("list",{kindofday:day,listitems:newlistitems});
});


// post method for taking input from user
  app.post("/",function(req,res){
    newlistitems.push(`${req.body.task}`);
    res.redirect("/");
  })
// post ends here



app.listen(3000,function(){
  console.log("server is listening at port 3000");
})
