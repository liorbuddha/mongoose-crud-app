/** @format */

//Lior Ben-Eliezer
//CRUD application with mongoose & express
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const { routInit } = require("./routs/configRouts");
const mongoose = require("mongoose");
require("./db/connectMongo");
//uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//static folder
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
routInit(app);

const server = http.createServer(app);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
