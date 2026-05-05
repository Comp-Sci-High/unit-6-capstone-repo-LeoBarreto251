const mongoose = require("mongoose");
const ejs = require("ejs")

const express = require("express")
const app = express();

app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.set("view engine", "ejs")

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});


async function startServer() {
    await mongoose.connect("mongodb+srv://SE12:CSH2026@cluster0.ytvmkmf.mongodb.net/?appName=Cluster0")
    app.listen(3000, () => {
        console.log("Server is running")
    })
}

startServer()