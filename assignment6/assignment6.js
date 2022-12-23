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

app.get("/table-user", function (req, res) {

          
  // const mysql = require("mysql2");
  // const connection = mysql.createConnection({
  //     host: "localhost",
  //     user: "root",
  //     password: "",
  //     database: "assignment6"
  // });
  // let myResults = null;
  // connection.connect();
  // connection.query(
  //     "SELECT * FROM A01325686_user",
  //     function (error, results, fields) {
  //         console.log("Results from DB", results, "and the # of records returned", results.length);
  //         // hmm, what's this?
  //         myResults = results;
  //         if (error) {
  //             console.log(error);
  //         }
  //         // let's get the data but output it as an HTML table
  //         let table = "<table><tr><th>ID</th><th>User Name</th><th>First Name</th><th>Last Name</th><th>Email</th></tr>";
  //         for (let i = 0; i < results.length; i++) {
  //             table += "<tr><td>" + results[i].ID + "</td><td>" + results[i].user_name + "</td><td>" + results[i].first_name + "</td><td>" + results[i].last_name + "</td><td>"
  //                 + results[i].email + "</td></tr>";
  //         }
  //         table += "</table>";
  //         res.send(table);
  //         connection.end();
  //     }
  // );
  // console.log(myResults, "data display");
});

app.get("/table-timeline", function (req, res) {

  connectToMySQL(res);

});

async function connectToMySQL(res) {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "assignment6",
      multipleStatements: true
  });
  connection.connect();
  const [rows, fields] = await connection.execute("SELECT * FROM A01325686_user_timeline");
  let table = "<table><tr><th>Post ID</th><th>User ID</th><th>Date</th><th>Content</th><th>Time</th><th>Views</th></tr>";
  for (let i = 0; i < rows.length; i++) {
      table += "<tr><td>" + rows[i].ID + "</td><td>" + rows[i].user_id + "</td><td>" + rows[i].date_post.toLocaleDateString() + "</td><td>" + rows[i].text_post
          + "</td><td>" + rows[i].time_post + "</td><td>" + rows[i].view + "</td></tr>";
  }
  console.log("rows", rows);
  // don't forget the '+'
  table += "</table>";
  await connection.end();
  res.send(table);

}

let port = 8000;
app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});