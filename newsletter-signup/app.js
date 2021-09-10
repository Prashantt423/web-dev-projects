const express= require("express");
const bodyParser= require ("body-parser");
const request = require("request");
const app= express();
const https= require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(3000,function(){
  console.log("server is listening at the port 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var fname= req.body.firstName;
  var lname= req.body.lastName;
  var email= req.body.email;

  const data= {
    members: [{
      email_address: email,
      status: "subscribed" ,
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]
  };
  // data ends here

  const JSONdata= JSON.stringify(data);
  const url= "https://us6.api.mailchimp.com/3.8/lists/a0f44f2c02";
  const options= {
    method:"POST",
    auth: "pktk001:413626b24f943e9d376663d0041e6cca-us6"
  };
  https.request(url,options,function(response){

    if(response.statusCode===200){
      res.send("success");
    }
    else{
      res.send("failure");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
      request.write(JSONdata );
      req.end;

    });
  });
})









// app id
// 413626b24f943e9d376663d0041e6cca-us6

// list // ID:
// a0f44f2c02
