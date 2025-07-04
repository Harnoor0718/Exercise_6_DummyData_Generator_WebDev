const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Employee = require("./models/employee");

mongoose.connect("mongodb://127.0.0.1:27017/company");
const port = 3000;

app.set("view engine", "ejs");

const getRandom = (arr) => {
  let rno = Math.floor(Math.random() * arr.length);
  return arr[rno];
};

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { foo: "FOO" });
});

app.get("/generate", async (req, res) => {
  await Employee.deleteMany({})

  let randomNames = ["Rohan", "Sohan", "Mohan", "Rita"];
  let randomLnag = ["Python", "JS", "C++", "Java"];
  let randomCities = ["Bilaspur", "MoradaBad", "Mysore", "Kolkata"];

  
  for (let index = 0; index < 10; index++) {
    await Employee.create({
      name: getRandom(randomNames),
      salary: Math.floor(Math.random() * 22000), 
      language: getRandom(randomLnag),
      city: getRandom(randomCities),
      isManager: Math.random() > 0.5, 
    });
  }

  res.json({ message: "10 employees generated successfully!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
