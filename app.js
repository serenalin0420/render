const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h2>Hello, My Server!</h2>");
});

//getData
app.get("/getData", (req, res) => {
  let { number } = req.query;
  let result;
  //console.log(typeof number);
  //console.log({ number });

  if (number === undefined || number === "") {
    res.send("Lack of Parameter");
    return;
  } else if (Number(number) > 0) {
    //if n=5 get the result of 1+2+....+5 in the page.
    number = Number(number);
    result = ((number + 1) * number) / 2;
    res.send("the result is " + result);
  } else {
    res.send("Wrong Parameter");
  }
});
//cookie-1

app.get("/myName", (req, res) => {
  let { name } = req.cookies;
  if (name) {
    res.send(`<h2>Hi ${name}</h2>`);
  } else {
    const path = require("path");
    res.sendFile(path.join(__dirname, "public/trackname.html"));
    app.get("/trackName", (req, res) => {
      let { name } = req.query;
      res.cookie("name", name);
      res.redirect("/myName");
      //res.send(`<h2>Your cookie user's name is ${name}</h2>`);
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
