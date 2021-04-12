
const { Router } = require('express');
const { getUser, putUser, postUser, deleteUser} = require('../controllers/user')

const router = Router();

router.get('/', getUser);

router.put('/:id', putUser);  

router.post('/', postUser);    

router.delete('/', deleteUser);  

module.exports = router;