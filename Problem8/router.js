const express = require('express');
const jwt=require("jsonwebtoken");
const router = express.Router();  
const productModel = require('./productModel');
const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const verify=token.split(" ")[1];
        console.log(verify)
        jwt.verify(verify,"saroj",(error,decode)=>{
            if(decode){
                next()
            }else{
                res.status(400).send("token is not correct")
            }
        })
    }
    else{
        res.status(400).status("token error is not correct");
    }
}
router.get("/home", (req, res) => {
   res.send("Home Page");
});

router.post('/register', async (req, res) => { 
    const data = req.body;
    try {
        const user = new ProductModel(data);
        await user.save();
        res.status(200).send({ "message": "Data added successfully" }); 
    } catch (err) {
        console.error('Error while saving user:', err);
        res.status(500).send({ "message": "An error occurred" });  
    }
});

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await productModel.findOne({email,password});
        console.log(user);
        if(user){
            const token=jwt.sign({"backened":"learn"},"saroj" ,{expiresIn:"1h"});
            console.log(token);
            res.status(200).send({"massage":"login successfully","token":token});
        }
        else{
            res.status(400).send("wrong cradanitals");
        }
       
    }catch(err){
        console.error(err);
        res.status(500).send({"masssage":"some error occure"});
    }
})

router.get("/products",auth,async(req,res)=>{
    res.send("products page")
})
module.exports = router;
