//new
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");


//R.E.G.I.S.T.E.R
const registerUser = asyncHandler(async (req, res) => {
    const { name, lastname, username, email, password, pic } = req.body;
    
 // check user existence by comparing email
 const userExists = await User.findOne({ email });

 //if user does not exist
 if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

 //create new user
 const user = await User.create({
    name,
    lastname,
    username,
    email,
    password,
    //pic,
  });

 //send response 
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      //pic:user.pic,
      token:generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
 
});

// L.O.G.I.N
const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        //pic:user.pic,
        token:generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid username or password");
    }
});
  

module.exports = { registerUser, authUser};