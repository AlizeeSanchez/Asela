const { Router } = require('express');
const petController = require('./controllers/petController');
const mainController = require('./controllers/mainController')
const otherController = require('./controllers/otherController')


const router = Router();

//Home page
router.get('/home', mainController.home )
//-------------------------- Les pages pour animaux -------------------------

//Nos chiens
router.get('/nos-chiens', petController.dog)

//Nos chiots
router.get('/nos-chiots', petController.puppy)

//Nos chats
router.get('/nos-chats', petController.cat)

//Nos chatons
router.get('/nos-chatons', petController.kitten)

//Fiche animal
router.get('/fiche/:id', petController.onePet)


//------------------------- Les demarches ----------------------------------

// Nos conditions et frais d'adoption

//Nos événements
router.get('/nos-evenements', otherController.event)

//Nous soutenir
router.get('/nous-soutenir', otherController.support)

//Devenir Famille D'accueil
router.get('/devenir-famille-accueil', otherController.host_family)

// Faire un DON

// Toutes les démarches
router.get('/nos-demarches', otherController.tearmAdopt)

// Formulaire d'adoption         PAS ENCORE

// Contact
router.get('/contact', otherController.contact)

//--------------------------- Optionnel -------------------------------


module.exports = router;

// Vente pour l'association       PAS ENCORE

