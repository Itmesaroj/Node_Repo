const userModel = require("./usermodel"); 
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListModel = require("./blacklistmodel");

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).send({ "msg": "Token related error" });
    }

    const exist = await blackListModel.findOne({ token });
    if (exist) {
        return res.status(401).send({ "msg": "Please login first" });
    }
    jwt.verify(token, "saroj", (error, decode) => {
        if (error) {
            return res.status(401).send({ "msg": error.message });
        }
        next();
    });
};

router.post("/register", async (req, res) => {
    const data = req.body;
    try {
        bcrypt.hash(data.password, 10, async (error, hash) => {
            if (error) {
                return res.status(500).send({ "msg": error.message });
            }
            data.password = hash;
            const user = new userModel(data);
            await user.save();
            res.status(201).send({ "msg": "User successfully registered" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (error, result) => {
                if (error) {
                    return res.status(500).send({ "msg": error.message });
                }
                if (result) {
                    const access_token = jwt.sign({ "email": user.email, "password": user.password, "username": user.username, "age": user.age }, "saroj",{expiresIn:"25s"});
                    const refresh_token = jwt.sign({ "email": user.email, "password": user.password, "username": user.username, "age": user.age }, "sarojMasia",{expiresIn:"1h"});
                    return res.status(200).send({ "msg": "You are logged in successfully", "access_token": access_token,"refresh_token":refresh_token });
                } else {
                    return res.status(401).send({ "msg": "Invalid credentials" });
                }
            });
        } else {
            return res.status(401).send({ "msg": "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


router.get("/products", auth, async (req, res) => {
    try {
        res.status(200).send("Product page");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.post("/logout", async (req, res) => {
    try {

        const token = req.headers.authorization;
        console.log(token);
        if (token) {
            const user = new blackListModel({ token });
            await user.save();
            res.status(200).send("Logout successfully");
        } else {
            res.status(400).send("Token related error");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});



router.post("/token", async (req, res) => {
    const refresh_token  = req.headers.authorization;
    console.log(refresh_token)
    if (!refresh_token) {
        return res.status(400).send({ "msg": "Refresh token required" });
    }

    try {
        jwt.verify(refresh_token, "sarojMasia", (error, decode) => {
            if (error) {
                return res.status(401).send({ "msg": error.message });
            }
            const new_access_token = jwt.sign({ "email": decode.email, "username": decode.username, "age": decode.age }, "saroj", { expiresIn: "25s" });
            res.status(200).send({ "access_token": new_access_token });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
module.exports = router;
