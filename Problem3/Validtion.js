const express = require("express");
const fs = require("fs");
const server = express();
server.use(express.json());
const validationMiddleware = (req, res, next) => {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;
    let errors = [];
    if (ID === undefined) errors.push("ID is missing");
    if (Name === undefined) errors.push("Name is missing");
    if (Rating === undefined) errors.push("Rating is missing");
    if (Description === undefined) errors.push("Description is missing");
    if (Genre === undefined) errors.push("Genre is missing");
    if (Cast === undefined) errors.push("Cast is missing");
    if (typeof ID !== "number") errors.push("ID should be a number");
    if (typeof Name !== "string") errors.push("Name should be a string");
    if (typeof Rating !== "number") errors.push("Rating should be a number");
    if (typeof Description !== "string") errors.push("Description should be a string");
    if (typeof Genre !== "string") errors.push("Genre should be a string");
    if (!Array.isArray(Cast) || !Cast.every(c => typeof c === 'string')) {
        errors.push('Cast should be an array of strings.');
    }
    if (errors.length > 0) {
        fs.writeFileSync("res.txt", errors.join("\n")); 
        return res.status(400).send("bad request. some data is incorrect.");
    }
    next();
}
server.post("/", validationMiddleware, (req, res) => {
    res.status(200).send("data received");
});

server.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});
