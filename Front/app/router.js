const { Router } = require('express');
const petController = require('./controllers/petController');
const mainController = require('./controllers/mainController')

const router = Router();

//Home page
router.get('/home', mainController.home )
//-------------------------- Les pages pour animaux -------------------------

//Nos types d'animaux

//Nos chiens

//Nos chiots

//Nos chats

//Nos chatons



//------------------------- Les demarches ----------------------------------

// Nos conditions et frais d'adoption

//Nos événements

//Nous soutenir

//Devenir Famille D'accueil

// Faire un DON

// Toutes les démarches

// Formulaire d'adoption         PAS ENCORE

//--------------------------- Optionnel -------------------------------


module.exports = router;

// Vente pour l'association       PAS ENCORE

