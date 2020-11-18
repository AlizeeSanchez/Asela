const { Router } = require('express');
const dogController = require('./controllers/dogController');
const catController = require('./controllers/catController');
const petController = require('./controllers/petController');
const router = Router();

//----------------------------------Routes chiens----------------------------

//Route pour afficher notre back office des chiens
router.get('/dogs', dogController.allPetsNotAdopted, dogController.allPetsAdopted)
//Route pour ajouter un chien a l'adoption
router.post('/dogs', dogController.addNewPet)
//Route pour modifier le status d'un chien (a l'adoption ou non)
router.patch('/dogs/:id', dogController.petStateAdoption)
//Route pour supprimer un chien de la bdd
router.delete('/dogs/:id', dogController.suppPet)
//
//----------------------------------Routes chats----------------------------
// Route pour recensser tous les chats non adoptés
//router.get('/cats/notAdopted', catController.allCatsNotAdopted)
// Route pour recensser tous les chats adoptés
router.get('/cats/adopted', catController.allCatsAdopted)
// Route pour dire qu'un chat viens d'être adopté
router.patch('/catsadopted/:id', catController.catNotAvailable)
// Route pour remettre un chat à l'adoption
router.patch('/catsReadyAgainToAdopt/:id', catController.catAvailableToAdopt)
// Route pour ajouter un nouveau chat à l'adoption
router.post('/addNewCat', catController.AddNewCatToAdopt)
// Route pour supprimer un chat du site de l'association
router.post('/suppCat/:id', catController.deleteCat)

//----------------------------------Routes Animal----------------------------
router.get('/pet/:id', petController.findOnePet)

module.exports = router;