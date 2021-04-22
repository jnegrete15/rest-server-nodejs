const { response } = require("express")


const adminRole = (req, res = response, next) => {

  if(!req.user){
    return res.status(500).json({
      msg: "go to validate token first"
    })
  } 

  const {role, name} = req.user;

  if(role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `${name} has not rights to delete users`
    })
  }

  next()
}

const hasRole = (...roles) =>{

  return (req, res = response, next) =>{
    if(!req.user){
      return res.status(500).json({
        msg: "go to validate token first"
      })
    } 

    if(!roles.includes(req.user.role)){
      return res.status(401).json({
        msg: `Your role is not able to delete users`
      })
    }

    next()
  }
}

module.exports = {
  adminRole,
  hasRole
}