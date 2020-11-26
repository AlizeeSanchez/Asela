const express = require('express');
const petController = require('./controllers/petController');
const catController = require('./controllers/catController');
const dogController = require('./controllers/dogController');

const router = express.Router();

//--------------------Routes pour Bénévoles--------------------------------
// Route pour afficher la page des chiens
router.get('/volunteer/dogs', dogController.allPetsNotAdopted)
// Route pour afficher un chien
router.get('/volunteer/dog/:id', petController.findOnePet, petController.findAllComment)
// Route pour afficher la page es chats
router.get('/volunteer/cats', catController.allCatsNotAdopted)

module.exports = router;