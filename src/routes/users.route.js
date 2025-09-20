var express = require('express');
var router = express.Router();
const usersController=require('../controllers/users.controller');
const authController = require('../controllers/auth.controller')
const filmsController = require('../controllers/films.controller');

router.get('/account', authController.isLoggedIn, usersController.account); 
router.get('/', usersController.get);
router.get('/:userId/account', usersController.get);
router.get('/:userId/edit', authController.isLoggedIn, usersController.update);
router.post('/:userId/edit', authController.isLoggedIn, usersController.validate, usersController.update);
router.delete('/:userId', usersController.delete);
router.get('/rentals', authController.isLoggedIn, filmsController.rentedByUser);
router.get('/register', usersController.registerForm);
router.post('/register', usersController.create);

module.exports = router;
