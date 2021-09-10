const mongoose= require('mongoose');

mongoose.connect("mongodb://localhost:27017/PersonDB", {useNewUrlParser: true, useUnifiedTopology: true});

const Personschema= new mongoose.Schema({
  name: String,
  age: Number
});

const Person= mongoose.model("Person",Personschema);
const johan = new Person({
  name:"johan",
  age: 28
});
const amit = new Person({
  name:"amit",
  age: 28
});
const raman = new Person({
  name:"raman",
  age: 28
});
const chaman = new Person({
  name:"chaman",
  age: 28
});
// Person.insertMany([johan,amit,raman,chaman], err =>{
//   if (err){
//     console.log(err);
//   } else{
//     console.log("successfully saved all databases");
//   }
// });

Person.find((err,persons)=>{
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();
    persons.forEach(guy=>{
      console.log(guy.age);
    });
  }
})
