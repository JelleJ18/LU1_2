const express = require('express');
const router = express.Router();
const filmsController = require('../controllers/films.controller');
const authController = require('../controllers/auth.controller');

router.get('/', filmsController.list);
router.get('/:filmId', filmsController.details);

module.exports = router;