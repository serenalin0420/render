const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(cookieParser());

//sum.html
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/sum.html", (req, res) => {
  let { sum_num } = req.body;
  if (sum_num === "") {
    res.send(`<h2>Lack of Parameter</h2>`);
    return;
  }
  let sum_result;
  sum_num = Number(sum_num); //較為嚴謹
  if (typeof sum_num === "number" && sum_num > 0) {
    //if n=5 get the result of 1+2+....+5 in the page.
    sum_result = ((sum_num + 1) * sum_num) / 2;
    res.send(`<h2>the result is ${sum_result}</h2>`);
  } else {
    res.send(`<h2>Wrong Parameter</h2>`);
  }
});

//getData
app.get("/", (req, res) => {
  res.send("<h2>Hello, My Server!</h2>");
});

app.get("/getData", (req, res) => {
  let { number } = req.query;
  if (number === undefined) {
    res.send(`<h2>Lack of Parameter</h2>`);
    return;
  }

  let result;
  number = parseInt(number); //數字後面輸入其他字元，依然會轉換成第一個輸入的int
  if (typeof number === "number" && number > 0) {
    //if n=5 get the result of 1+2+....+5 in the page.
    result = ((number + 1) * number) / 2;
    res.send(`<h2>the result is ${result}</h2>`);
  } else {
    res.send(`<h2>Wrong Parameter</h2>`);
  }
});

//cookie-1
app.get("/myName", (req, res) => {
  res.cookie("name", "Serena"); //從server送出
  let { name } = req.cookies;
  console.log(name);
  res.send(`<h2>${name}</h2>`);
});

/*

// cookie-2
const path = require("path");
app.get("/myName", (req, res) => {
  if (req.cookies.username) {
    res.send(`<h2>${req.cookies.username}</h2>`);
  } else {
    res.sendFile(path.join(__dirname, "public/trackname.html"));
    console.log("no found cookie");
  }
});

app.get("/trackName", (req, res) => {
  let { username } = req.query;
  res.cookie("username", username);
  res.redirect("back");
});
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
