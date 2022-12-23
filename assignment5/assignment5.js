const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

app.get("/", function (req, res) {
  let doc = fs.readFileSync("./app/html/index.html", "utf8");
  res.send(doc);
});

app.get("/fact", function (req, res) {

  let doc = fs.readFileSync("./app/data/fact.js", "utf8");
  res.setHeader("Content-Type", "application/json");

  res.send(fs.readFileSync("./app/data/fact.js", "utf8"));

});

app.get("/ingredients", function (req, res) {

  let formatOfResponse = req.query["format"];
  if (formatOfResponse == "html") {
    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync("./app/data/ingredients.html", "utf8"));

  } else {
    res.send({
      status: "fail",
      msg: "Wrong format!"
    });
  }
});

let port = 8000;
app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});