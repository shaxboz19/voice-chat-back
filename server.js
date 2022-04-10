const express = require("express");

const multer = require("multer");


const cors = require("cors");

const app = express();

const path = require("path");

let agent =0
app.use(cors());

app.use(express.json());

app.use(express.static("uploads"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, ++agent+`audio` + ".webm"); //Appending .jpg
  },
});

var upload = multer({ storage: storage });



app.post("/audio", upload.single("audio"), function (req, res, next) {
  const createAt = new Date();
  if (req.file) {
    const url = "http://localhost:8080/" + req.file.path;
    res.status(200).json({ url, createAt });
  }

});

app.get("/uploads/:id", (req, res) => {
  const { id } = req.params;
  res.sendFile(path.join(__dirname, "uploads", id));
});
app.listen(8080, () => {
  console.log("Server runnning");
});
