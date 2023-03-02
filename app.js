const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { toLower } = require("lodash");
const _ = require('lodash')
const mongoose = require('mongoose')

//// Global-variables

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//// mongoosh -DB

mongoose.connect("mongodb+srv://vamsikrishna2644:Vamshi2000@blogdb.qphbvef.mongodb.net/blogDB")

const postScheme = mongoose.Schema({
  title: String,
  content: String
})

const Post = mongoose.model("posts", postScheme)


//// get-post

app.get("/", (req, res) => {

  Post.find({}, (err, findData) => {
    if (findData) {
      res.render("home", { posts: findData })
    }
  })

})


app.get("/about", (req, res) => {
  res.redirect("https://dumbun.xyz/")
})


app.get("/compose", (req, res) => {
  res.render("authe")
})
app.post("/compose", (req, res) => {
  if (req.body.email === "blog@vamshi.com" && req.body.password === "Vamshi@2000") {
    res.redirect("/9021fesaserfa739fadsfaeafwa719hfriuamnoim56346565755645364xiemai")
  } else {
    res.redirect("/")
  }
})

app.get("/9021fesaserfa739fadsfaeafwa719hfriuamnoim56346565755645364xiemai", (req, res) => {

  res.render("compose")
})

app.post("/9021fesaserfa739fadsfaeafwa719hfriuamnoim56346565755645364xiemai", (req, res) => {


  const title = req.body.postTitle
  const content = req.body.postBody
  const titleLodash = _.lowerCase(title)
  const compose = new Post({
    title: title,
    content: content
  })
  compose.save()
  res.redirect("/")
})

app.get("/posts/:postId", (req, res) => {

  let postId = req.params.postId

  Post.findById({ _id: postId }, (err, foundData) => {
    res.render("post", { postTitle: foundData.title, postContent: foundData.content })
  })


})


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
