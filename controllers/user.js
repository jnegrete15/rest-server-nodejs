const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const getUser = async(req = request, res = response) =>{
  
  const { limit, from = 0} = req.query;
  const query = {status:true};

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
    .skip(Number(from))
    .limit(Number(limit))
  ])

  res.json({
    total,
    users
  })
}

const putUser = async(req, res) => {

  const {id} = req.params;
  const {_id, password, google, email, ...info} = req.body

  if(password){
    const salt = bcryptjs.genSaltSync();
    info.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, info);

  res.json(user)
}

const postUser = async(req, res) =>{

  const { name, email, password, role} = req.body;
  const user = new User({name,email,password,role});

  //encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt)

  await user.save()

  res.json({
    msg: 'post from controller',
    user
  });
}

const deleteUser = async(req, res) =>{

  const { id } = req.params;

  //delete user, do not recommended
  //const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, {status:false})


  res.json(user)
}



module.exports = {
  getUser,
  putUser,
  postUser,
  deleteUser
}