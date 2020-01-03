const express = require("express");
const router = express.Router();
//Import auther from models
const Author = require("../models/author");

//All Authors
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find({});
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

//New Authors Route
router.get("/new", (req, res) => {
  //create database
  res.render("authors/new", { author: new Author() });
});

// Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author"
    });
  }
});
//Create Authore Route
// router.post("/", (req, res) => {
//   const author = new Author({
//     name: req.body.name
//   });
//   author.save((err, newAuthor) => {
//     if (err) {
//       res.render("authors/new", {
//         author: author,
//         errorMessage: "Error creating Author"
//       });
//     } else {
//       res.redirect(`authors`);
//     }
//   });
// });

module.exports = router;
