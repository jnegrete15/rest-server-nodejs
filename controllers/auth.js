const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../middlewares/google-verify");

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

const googleSignIn = async(req, res = response) => {

  const { id_token } = req.body;

  try {

    const {name, email, picture: img} = await googleVerify( id_token )

    let user = await User.findOne({email});

    if(!user){
      const data = {
        name,
        email,
        password: "gAuth",
        img,
        google: true
      };

      user = new User(data)
      await user.save();
    }

    if( !user.status ){
      return res.status(401).json({
        msg: "User blocked, contact to admin"
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id)


    return res.json({
      msg:"Ok, google succes",
      user,
      token
    });

  } catch (err) {
   
    res.status(400).json({
      msg: "Google token invalid"
    })
  }
  
}


module.exports = {
  login,
  googleSignIn
}