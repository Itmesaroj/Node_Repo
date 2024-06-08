const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const UserModel = require("./user.schema");
const ProductModel = require("./product.schema");

router.use(express.json());

router.get("/users", async (req, res) => {
    try {
        const data = await UserModel.find();
        console.log(data);
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post("/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existOne = await UserModel.findOne({ email });
        if (existOne) {
            return res.status(400).send("User already exists");
        }
        const user = new UserModel({ name, email, password });
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.patch("/users/:id", async (req, res) => {
    try {
        const idtry = req.params.id;
        const payload = req.body;
        console.log(payload);
        const user = await UserModel.findByIdAndUpdate(idtry, payload, { new: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const query = req.params.id;
        const user = await UserModel.findByIdAndDelete(query);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get("/products", async (req, res) => {
    try {
        const product = await ProductModel.find();
        console.log(product);
        res.status(200).send(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post("/products", async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const product = await ProductModel.findOne({ name });
        console.log(product);
        if (product) {
            return res.status(400).send("The product already exists");
        }
        const item = new ProductModel({ name, description, price, category });
        await item.save();
        res.status(201).send(item);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.patch("/products/:id", async (req, res) => {
    try {
        const params = req.params.id;
        const payload = req.body;
        const product = await ProductModel.findByIdAndUpdate(params, payload, { new: true });
        console.log(product);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.delete("/products/:id", async (req, res) => {
    try {
        const params = req.params.id;
        const product = await ProductModel.findByIdAndDelete(params);
        console.log(product);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
