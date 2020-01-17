const express = require('express');
const router =  express.Router();
const MovieController = require('../app/api/controllers/movies');

router.get('/',MovieController.getAllMovies)
router.post('/',MovieController.create)
router.delete('/',MovieController.deletMovies)

module.exports = router;