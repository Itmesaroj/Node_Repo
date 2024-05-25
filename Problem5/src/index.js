const express = require("express");
const path = require("path");
const server = express();
const multer = require("multer");
const uploads = multer({ dest: "uploads/" }); 

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

server.post("/upload", uploads.single("profileImage"), (req, res) => {
  console.log(req.file);
  res.status(200).json({
    message: 'File uploaded successfully',
    imageUrl: req.file.path
});
});

server.listen(4000, () => {
  console.log("server listening");
});
