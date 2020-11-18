const { Router } = require('express');
const dogController = require('./controllers/dogController');
const catController = require('./controllers/catController');

const router = Router();

//----------------------------------Routes chiens----------------------------
router.get('/dogs', dogController.allPetsNotAdopted, dogController.allPetsAdopted)

//----------------------------------Routes chats----------------------------
// Route pour recensser tous les chats non adoptés
router.get('/cats/notAdopted', catController.allCatsNotAdopted)
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

module.exports = router;