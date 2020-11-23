const { Router } = require('express');
const dogController = require('./controllers/dogController');
const catController = require('./controllers/catController');
const petController = require('./controllers/petController');
const conditionController = require('./controllers/conditionController');
const priceController = require('./controllers/priceController');
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
// Route pour dire qu'un chat voiens d'être adopté
router.patch('/catsadopted/:id', catController.catNotAvailable)
// Route pour remettre un chat à l'adoption
router.patch('/catsReadyAgainToAdopt/:id', catController.catAvailableToAdopt)
// Route pour ajouter un nouveau chat à l'adoption
router.post('/addNewCat', catController.AddNewCatToAdopt)
// Route pour supprimer un chat du site de l'association
router.post('/suppCat/:id', catController.deleteCat)

//----------------------------------Routes Animal----------------------------
//route pour voir la fiche d'un animal
router.get('/pet/:id', petController.findOnePet, petController.findAllComment)
// Mise à jour  d'un animal
router.patch('/pet/:id', petController.editPet)
//Rechercher un animal
router.post('/pet/:id', petController.findresearch)
//Poster un commentaire sous l'animal
router.post('/pet/comment/:id', petController.addComment)

//---------------------------Routes Conditions d'adoption--------------------
//Route pour lister les conditions d'adoption
router.get('/conditions', conditionController.findCondition)
//Route pour voir une seule condition
router.get('/condition/:id', conditionController.findOneCondition)
//Route pour ajouter une condition d'adoption
router.post('/addNewCondition', conditionController.addNewCondition)
//Route pour modifier une condition d'adoption
router.patch('/editCondition/:id', conditionController.editCondition)
//Route pour supprimer une condition d'adoption
router.delete('/suppCondition/:id', conditionController.suppCondition)

//----------------------------Route Prix d'Adoption------------------------
//Route pour lister les prix d'adoption
router.get('/price', priceController.findPriceAdopt)
//Route pour voir un seul prix
router.get('/OnePrice/:id', priceController.findOnePriceAdopt)
//Route pour ajouter un prix
router.post('/addPrice', priceController.addNewPrice)
//Route pour modifier un prix
router.patch('/editPrice/:id', priceController.editPrice)
//Route pour supprimer un prix 
router.delete('/suppPrice/:id', priceController.suppPrice)

module.exports = router;