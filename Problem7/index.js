const express=require("express");
const server=express();
const mongoose=require("mongoose");
server.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/Movie-DataBase")
.then((res)=>{console.log("the server succeesfully connected to the dataBase")})
.catch((err)=>{
    console.error(err);
})
server.use("/api",require("./Router"))
server.listen(3000,()=>{
    console.log("server is running")
})