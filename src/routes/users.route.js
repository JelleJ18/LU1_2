var express = require('express');
var router = express.Router();
const usersController=require('../controllers/users.controller');
const authController = require('../controllers/auth.controller')

/* GET users listing. */
router.get('/', usersController.get);
router.get('/:userId/details', usersController.get);
router.get('/:userId/edit',authController.isLoggedIn, usersController.update);
router.post('/:userId/edit', authController.isLoggedIn, usersController.validate, usersController.update);
router.delete('/:userId', usersController.delete);

module.exports = router;
