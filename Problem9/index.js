const express=require("express");
const mongoose=require("mongoose");
const server=express();
const routes=require("./router");
require("dotenv").config();
server.use(express.json());
server.use("/api", routes);
const mongoURL=process.env.MONGO_URI;
mongoose.connect(mongoURL)
.then((res)=>{
    console.log("database connect successfully to the server");
}).catch((err)=>{
    console.log("some error occure");
    console.error(err);
})
server.listen(process.env.PORT,()=>{
    console.log("server listeing",process.env.PORT);
})