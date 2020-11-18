const { Router } = require('express');
const dogController = require('./controllers/dogController');

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
//router.get('/cats/adopted', catController.allCatsAdopted)

module.exports = router;