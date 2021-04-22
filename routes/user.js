
const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, putUser, postUser, deleteUser} = require('../controllers/user');
const { checkRole, emailExist, userIdExist } = require('../helpers/db_validators');

const {
  validateFields,
  validateJWT,
  adminRole,
  hasRole,
} = require('../middlewares');

const router = Router();

router.get('/', getUser);

router.put('/:id', [
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( userIdExist ),
  check('role').custom( checkRole ),
  validateFields
], putUser);  

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password is required and it must be larger than 5 characteres').isLength({min:6}),
  check('email', 'Invalid email').isEmail(),
  check('email').custom( emailExist ),
  //check('role', 'Role is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( checkRole ),
  validateFields
], postUser);    

router.delete('/:id',[
  validateJWT,
  //adminRole,
  hasRole("ADMIN_ROLE", "SALES_ROLE"),
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( userIdExist ),
  validateFields
], deleteUser);  

module.exports = router;