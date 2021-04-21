const Role = require('../models/role');
const User = require('../models/user');

const checkRole = async(role = '') =>{
  const roleExist = await Role.findOne({role});
  if(!roleExist){
    throw new Error(`${role} role does not exist in the database`);
  }
}

//validate email
const emailExist = async(email = '') => {
  const exist = await User.findOne({email});
  if(exist){
    throw new Error(`${email} is already taken`);
  }
} 

const userIdExist = async(id) => {
  const exist = await User.findById(id);
  if(!exist){
    throw new Error(`${id} id does not exist`);
  }
} 

module.exports = {
  checkRole,
  emailExist,
  userIdExist
}