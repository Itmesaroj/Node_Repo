const express=require("express");
const fs=require("fs");
const morgan=require('morgan');
const server=express();
server.use(morgan(function(tokens,req,res){
    console.log("Request Method",tokens.method(req,res))
    console.log("Request URL",tokens.url(req,res));
    console.log("Respones status",tokens.status(req,res))
    console.log("Respones tiime",tokens['response-time'](req, res), 'ms')
    console.log("Request Date",tokens.date(req, res));
}))
server.use(express.json())
server.get("/trades",(req,res)=>{
    try{
        const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
        data.trades.sort((a,b)=>b.id-a.id);
        res.status(200).send(data.trades);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"some error occured"})
    }
})
server.post("/trades",(req,res)=>{
    try{
        const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
        const length=data.trades.length+1;
        console.log(length);
        console.log(req.body);
        req.body={...req.body,"id":length};
        if(typeof req.body.id!=="number"){
            res.status(500).send({error:"the data type of the keys is not correct"})
        }
        if(typeof req.body.type!=="string"){
            res.status(500).send({error:"the data type of the keys is not correct"})
        }
        if( typeof req.body.user_id!=="number"){
            res.status(500).send({error:"the data type of the keys is not correct"})
        }
        if(typeof req.body.symbol!=="string"){
            res.status(500).send({error:"the data type of the keys is not correct"})
        }
        if(typeof req.body.shares!=="number" ) {
            res.status(500).send({error:"the data type of the keys is not correct"})
        }
        if( typeof req.body.price!=="number")
        {
            res.status(500).send({error:"the data type of the keys is not correct"})
        }
        data.trades.push(req.body);
        fs.writeFileSync("./db.json",JSON.stringify(data));
        res.status(200).json({responess:"Data Added Successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"some error occured"})
    }
})

server.get(`/trades/:id`,(req,res)=>{
    try{
        const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
        const treadid=req.params.id;
        console.log(treadid);
        const resp=data.trades.filter((trade)=> {
            if(trade.id==treadid){
                return trade;
                
            }
            
        })
        console.log(resp)
        if(!resp){
            res.status(400).send("ID not found"); 
        }
        res.status(200).send({"res":resp});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"some error occured"})
    }
})

server.patch(`/trades/:id`,(req,res)=>{
    try{
        const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
        const treadid=req.params.id;
        const price=req.body.price
        console.log(treadid);
        console.log(price);
        let resp=data.trades.findIndex((trade)=> {
            if(trade.id==treadid){
                trade.price=price;
            }
         
        })
        if(!resp){
            res.status(400).send("ID not found"); 
        }
        fs.writeFileSync("./db.json",JSON.stringify(data))
        res.status(200).send({"res":"data successfully Updated"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"some error occured"})
    }
})
server.delete(`/trades/:id`,(req,res)=>{
    try{
        const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
        const treadid=req.params.id;
        console.log(treadid);
        const resp=data.trades.findIndex((trade)=> {
            if(trade.id==treadid){
                trade.id 
            } 
        })
        console.log(resp)
        if(!resp){
            res.status(400).send("ID not found"); 
        }
        data.trades.splice(resp,1);
        fs.writeFileSync("./db.json",JSON.stringify(data))
        res.status(200).send({"res":"data successfully Delete"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"some error occured"})
    }
})

server.listen(4000,()=>{
    console.log("server listening");
})