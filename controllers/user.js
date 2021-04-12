const {response, request} = require('express');



const getUser = (req = request, res = response) =>{
  
  const query = req.query;

  res.json({
    msg: 'get from controller',
    query
  })
}

const putUser = (req, res) => {

  const { id } = req.params;

  res.json({
    msg: 'put api from controller',
    id
  })
}

const postUser = (req, res) =>{

  const {nombre, edad} = req.body;

  res.json({
    msg: 'post from controller',
    nombre,
    edad
  });
}

const deleteUser = (req, res) =>{
  res.send('delete from contoller')
}



module.exports = {
  getUser,
  putUser,
  postUser,
  deleteUser
}