const express = require('express');
const server = express();
const mongoose = require('mongoose');
const productRoutes = require('./router'); 
mongoose.connect("mongodb://127.0.0.1:27017/auth")
    .then(() => { console.log("The database connected successfully"); })
    .catch((err) => { console.log(err); });

server.use(express.json());
server.use("/api", productRoutes); 
server.listen(3080, () => {
    console.log("Server listening on port 3080");
});
