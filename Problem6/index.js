const express = require("express");
const mongoose = require("mongoose");


const server = express();
server.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/UserProductsDataBase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Server is successfully connected");
})
.catch((err) => {
    console.log("Some error occurred", err);
});

server.use("/api", require("./router.api"));

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
