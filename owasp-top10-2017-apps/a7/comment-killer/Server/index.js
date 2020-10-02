const express = require("express");
const comments = require("./comments.json");

const app = express();

app.get("/", (req, res) => {
    res.send(comments);
});

app.listen("4000", () => {
    console.log("Server online at port 4000");
});
