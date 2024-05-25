const express = require("express");
const morgan = require("morgan");
const fs=require("fs");
const server = express();
morgan.token('date', function () {
    return new Date().toISOString();
});

morgan.token('http-version', function (req) {
    return `HTTP/${req.httpVersion}`;
});
server.use(morgan(function (tokens, req, res) {
    const data=[
      tokens.method(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res),'ms',
      tokens.date(req, res),
      tokens['http-version'](req),
      tokens.url(req, res),
    ].join(' ')+'\n'
    fs.appendFileSync("./src/access.log",data)
  }))
server.get("/", (req, res) => {
    res.status(200).send("This Request is Successfully sending");
});

server.get("/get-users", (req, res) => {
    res.status(200).send("This Request is Successfully sending");
});

server.post("/add-user", (req, res) => {
    res.status(201).send("Data Added Successfully");
});

server.put("/user/:id", (req, res) => {
    res.status(201).send("The Data is Updating Successfully");
});

server.delete("/user/:id", (req, res) => {
    res.send("The Data Deleting");
});

server.listen(3080, () => {
    console.log("Server Is Running");
});
