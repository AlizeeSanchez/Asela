const { Router } = require('express');
const dogController = require('./controllers/dogController');
const catController = require('./controllers/catController');
const hostFamilyController = require('./controllers/hostFamilyController');

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

//----------------------------------Routes famille d'acceuil----------------------------
// Route pour lister toute les familles d'acceuils
router.get('/hostFamily', hostFamilyController.findAllHostFamily, hostFamilyController.findAllCommentHostFamily)
// Route pour lister une seule famille d'acceuil via son id
router.get('/hostFamily/:id', hostFamilyController.findOneHostFamily)
// Route pour ajouter une famille d'acceuil
router.post('/addHostFamily', hostFamilyController.addHostFamily)
// Route pour supprimer une famille d'acceuil
router.post('/suppHostFamily/:id', hostFamilyController.deleteHostFamily)
// Route pour modifier une famille d'acceuil
router.patch('/editHostFamily/:id', hostFamilyController.editHostFamily)
// Route pour ajouter un commentaire à une famille d'acceuil
router.post('/addCommentHostfamily/:id', hostFamilyController.commentHostFamily)
// Route pour modifier un commentaire d'une famille d'acceuil
router.patch('/editCommentHostFamily/:id', hostFamilyController.editCommentHostFamily)
// Route pour supprimer un commentaire d'une famille d'acceuil
router.delete('/deleteCommentHostFamily/:id', hostFamilyController.deleteCommentHostFamily)
// Route pour attribuer un animal à une famille d'acceuil
router.patch('/putPetToHostFamily/:id', hostFamilyController.putPetHostFamily)

module.exports = router;