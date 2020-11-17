const { Router } = require('express');
const petController = require('./controllers/petController');

const router = Router();

//----------------------------------Routes animaux----------------------------
router.get('/pets', petController.allPets)

module.exports = router;