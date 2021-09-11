const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/block");
// express app
const app = express();

// connect to mongodb
const uri =
  "mongodb+srv://biraj:test123@cluster0.zgtcx.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

// app.set('views', 'folder name');  //sets viwews folder to look

app.use(morgan("dev"));
//milldeware and static files
app.use(express.static("public"));

// // mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "Second blog",
//     snippet: "about my new blog",
//     body: "Details for my blog hahahahhahahahha",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.findById("613cdf84f4979126671494d5")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //   res.send("<h1>About</h1>");
  res.render("about", { title: "About" });
});

//Blog Route
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
