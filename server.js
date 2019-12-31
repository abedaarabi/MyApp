// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").load();
// }

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
//to use ejs view engine
app.set("view engine", "ejs");
//to get the view pages from view folder
app.set("views", __dirname + "/views");
//to get the view pages from view layout
app.set("layout", "layouts/layout");
app.use(expressLayouts);
//Ask Younes
app.use(express.static("public"));

/**----------------------------------------------------------- */
//conect Mongo
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/MyApp", { useNewUrlParser: true });
// mongoose.connect(process.env.DATA_BASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to MongoDB");
});
/**----------------------------------------------------------- */

app.use("/", indexRouter);

app.listen(process.env.PORT || 7070, () => {
  console.log("app listening on PORT 7070");
});
