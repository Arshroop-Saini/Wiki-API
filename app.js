const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const mongoose=require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const port=3000;


mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});


const articleSchema = {
    title: String,
    content: String
  };    
  
  const Article = mongoose.model("Article", articleSchema);


// req targeting all the article

// chaning method, chaninig all the http kind a requests 

app.route('/articles')

// SEARCHING FOR ALL THE ARTICLES PRESENT IN OUR DATABASE

.get(function(req, res){
    Article.find(function(err,foundArticles){
        if(err){
            console.log(err)
        } else{    res.send(foundArticles)
        
        }
   
    });
})


// CREATING A NEW ARTICLE

.post(function(req, res){



    const newArticle= new Article({
        title:req.body.title,
        content:req.body.content
    
    
    
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added a new article.")
        }else{
            console.log(err);
        }
    });
    })

// DELEATING ALL THE ARTICLES 

.delete(function(res,res){
    Article.deleteMany(function(err){
  if(!err){
  res.send("sucessfully deleted all the articles")
  }else{
      res.send(err)
  }
    })
  });

/////// req targeting a specific article


// routing parameters

// chaning method, chaninig all the http kind a requests 

app.route('/articles/:articleTitle')

// FINDING A SPECIFIC ARTICLE

.get(function (req,res) {
    const requestedarticleTitle = req.params.articleTitle; 
    

    Post.findOne({title: requestedarticleTitle}, function(err, foundArticle){
       if(foundArticle){
           res.send(foundArticle)
       }else{
           res.send(err)
       }
      });




})

// UPDATING ALL THE THINGS IN A SPECIFIC ARTICLE

.put(function(req, res){

    const articleTitle = req.params.articleTitle;
  
    Article.updateOne(
      {title: articleTitle},
      {content: req.body.newContent},
      {overwrite: true},
      function(err){
        if (!err){
          res.send("Successfully updated the content of the selected article.");
        } else {
          res.send(err);
        }
      });
  })
  
// UPDATING A SPECIFIC THING IN A SPECIFIC ARTICLE

.patch(function(req, res){
Article.updateOne(
    {title: articleTitle},
    {content: req.body.newContent},
    {overwrite: true},
    function(err){
      if (!err){
        res.send("Successfully updated the content of the selected article.");
      } else {
        res.send(err);
      }
    });
})

// DELETING A SPECIFIC ARTICLE

.delete(function (req,res) {
    Article.deleteOne({
        title:req.params.articleTitle,
        function (err) {
            if(!err){
                res.send("Successfully deleted the article")
            }else{
                res.send(err)
            }
        }
    })
});


app.listen(port, function(res,req){
    console.log("server is up and running at port 3000")
})