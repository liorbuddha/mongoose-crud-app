/** @format */

const { dir } = require("console");
const express = require("express");
const { default: mongoose} = require("mongoose");
const router = express.Router();
const { UserModel } = require("../models/UserSchema");
const ObjectId = mongoose.Types.ObjectId;
//get home page
router.get("/", async (req, res) => {
  renderHomePage(res);
});

//render home page
let renderHomePage = async (res) => {
  let data = await UserModel.find({}).sort("name");
  res.render("home", { data: data });
};

//add new user
//post new user
router.post("/", async (req, res) => {
  try {
    // Object.keys(req.body).forEach((p) => {
    //   console.log(p);
    // });
    let usrS = new UserModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });
    await usrS.save();
  } catch (err) {
    console.log(err);
  }
  renderHomePage(res);
});

//delete
//Delete all users from DB
router.post("/removeAllDataFromCollection", async (req, res) => {
  let data = await UserModel.deleteMany({});
  console.log(data);
  renderHomePage(res);
});
//deleteOneUser
router.post("/deleteOneUser", async (req, res) => {
  let data = await UserModel.deleteOne({ _id: req.body.userToDelete });
  console.log(data);
  renderHomePage(res);
});
let userToUpdate = {};
//update a user
router.get("/updateUser", async (req, res) => {
  //e holds userID
  let e = req.query.userToUpdate;
  console.log(e+"  chosen to be updated");
  let data = await UserModel.findById({ _id: e }, (err, user) => {
    //console.log(user);
  }).clone();
  //console.log(data);
  userToUpdate = data;
  res.render('updateUser', { data: data });
});

router.post("/updateUser", async (req, res) => {
  console.log(userToUpdate._id + "  applying update for");
  let detailsToUpdate = {
    name: req.body.upname,
    email: req.body.upemail,
    phone: req.body.upphone,
    password: req.body.uppassword,
  };
  console.log("updated user details for "+userToUpdate._id+": ");
  console.dir(detailsToUpdate);
  try{
    let data = await UserModel.findByIdAndUpdate(userToUpdate._id, detailsToUpdate,{new: true},(err, user)=>{}).clone();
  console.log("response from updating:  " + JSON.stringify(data));
  userToUpdate = {};
  renderHomePage(res, { data: data});
  }catch(err){
    console.log(err);
    userToUpdate={};
    
    renderHomePage();
  }
});

module.exports = router;
