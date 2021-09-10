const express= require("express");
const bodyParser=require("body-parser");
const ejs= require("ejs");
const mongoose=require("mongoose");

const app=express();
app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{ useUnifiedTopology: true , useNewUrlParser: true });

const articleschema={
  title: String,
  content: String
};
const Article= mongoose.model("Article",articleschema);


app.route("/articles")

.get(function(req,res){
  Article.find(function(err,foundArticles){
    if(!err){
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  })
})

.post(function(req,res){
  const newarticle= new Article({
    title:req.body.title,
    content:req.body.content
  });
  newarticle.save(function(err){
    if(!err){
      res.send("Successfully Added Data");
    } else{
      res.send(err);
    }
  });
})

.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.end("Successfully deleted all articles");
    } else {
      res.send(err)
    }
  })
});

// request  for a particular article

app.route("/articles/:articleTitle")
.get(function(req,res){
  Article.findOne({title: req.params.articleTitle},function(err,foundArticle){
    if(!err){
      if(foundArticle){
        res.send(foundArticle);
      } else {
        res.send("No such articles")
      }
    }  else{ res.send(err)}
  })
})
.put(function(req,res){Article.update({title:req.params.articleTitle},{title:req.params.articleTitle,content: req.body.content},{overwrite: true},function(err,results){
  if(!err){
    Article.find({},function(err,articles){
      res.send(articles);
    })
  }
  // res.send();
})}).delete()

// *******patch() updates only the value which is mentioned**************************

app.listen(3000,function(){
  console.log("Server is listening on port 3000");
});
