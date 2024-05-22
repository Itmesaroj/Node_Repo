const express = require("express");
const fs = require("fs");
const server = express();

server.use(express.json());
server.get("/", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching todos");
    }
});
server.post("/add", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        data.todos.push(req.body);
        fs.writeFileSync("./db.json", JSON.stringify(data));
        res.send("Data added successfully to the database");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while adding the todo");
    }
});


server.put("/update", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        data.todos = data.todos.map(todo => {
            if (todo.id % 2 === 0 && !todo.status) {
                todo.status = true;
            }
            return todo;
        });
        fs.writeFileSync("./db.json", JSON.stringify(data));
        res.send("Data successfully updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while updating the todos");
    }
});

server.delete("/delete", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        data.todos = data.todos.filter(todo => !todo.status);
        fs.writeFileSync("./db.json", JSON.stringify(data));
        res.send("Data successfully updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while deleting the todos");
    }
});

// Start the server
server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
