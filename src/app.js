const express = require("express");
const app = express();
require("./db/conn");

app.use(express.json());
const port = process.env.PORT || 3000;

const Student = require("./models/students");

app.get("/", (req, res) => {
  res.send("first page");
});
// app.get("/students", (req, res) => {
//   res.send("hello");
// });

// handling the post request
app.post("/students", async (req, res) => {
  console.log(req.body);

  try {
    const user = new Student(req.body);
    console.log(req.body);
    const result = await user.save();
    res.status(201).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});
// handling the get request
app.get("/data", async (req, res) => {
  try {
    const data = await Student.find({});
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});
// handling a particular request
app.get("/data/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const particulardata = await Student.findById(_id);
    res.send(particulardata);
  } catch (e) {
    res.status(400).send(e);
  }
});
// handling a patch request
app.patch("/data/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const particulardata = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(particulardata);
  } catch (e) {
    res.status(500).send(e);
  }
});
// deleting the data
app.patch("/data/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const particulardata = await Student.findByIdAndDelete(_id);
    res.send(particulardata);
  } catch (e) {
    res.status(500).send(e);
  }
});
// sorting the data
app.get("/sort", async (req, res) => {
  try {
    const particulardata = await Student.find({}).sort({ " phone": 1 });
    res.send(particulardata);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`listening at port no ${port}`);
});
