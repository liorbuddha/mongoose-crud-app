/** @format */

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/myTestDB", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
let x;
db.on('error', console.error.bind(console, "connection error"));
db.on("open",async ()=>{
    console.log("mongo connected");
})

module.exports = db;