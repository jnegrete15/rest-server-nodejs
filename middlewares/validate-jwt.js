const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res = response, next) => {
  
  const token = req.header('auth');

  if(!token){
    return res.status(401).json({
      msg:"You are not authorized"
    })
  }

  try {
    
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid);

    if(!user){
      return res.status(401).json({
        msg: "User not found"
      })
    }

    // Check if user is not deleted
    if(!user.status){
      return res.status(401).json({
        msg: 'Invalid token - user has been deleted'
      })
    }

    req.user = user;

    next()  

  } catch (err) {
    console.log(err);
    return res.status(401).json({
      msg:"Invalid token"
    })
  }

}

module.exports = {
  validateJWT
}