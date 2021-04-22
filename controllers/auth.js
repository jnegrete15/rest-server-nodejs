const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async(req, res = response) => {

  const {email, password} = req.body;

  try {

    // Check if email exists
    const user = await User.findOne({email});
    if(!user){
      res.status(400).json({
        msg: "Wrong user or password"
      })
    }

    // Check status's user
    if(!user.status){
      res.status(400).json({
        msg: "User not found - status:false"
      })
    }

    // Validate password
    const validatePassword = bcryptjs.compareSync(password, user.password);
    if(!validatePassword){
      res.status(400).json({
        msg: "Wrong password"
      })
    }

    // Generate JWT
    const token = await generateJWT(user.id)


    res.json({
      user,
      token
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg:"Something went wrong"
    })
  }
  
}


module.exports = {
  login
}