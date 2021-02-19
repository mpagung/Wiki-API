const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const express=require("express");

const app=express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser:true, useUnifiedTopology: true});
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article= mongoose.model("Article",articleSchema);



app.route("/articles")

  .get(function(req,res){
    if (!err){
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  })

  .post(function(req,res){
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err){
      if(!err){
        res.send("Successfully added a new article.")
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req,res){
    Article.deleteMany(
      function(err){
        if (!err){
          res.send("Successfully deleted all articles.");
        } else {
          res.send(err);
        }
      });
  });

app.post("/articles/:articleName",function(req,res){

})

app.listen(3000,function(){
  console.log("Server started on port 3000")
});
