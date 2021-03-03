const { Router } = require('express');
const dogController = require('./controllers/dogController');
const catController = require('./controllers/catController');
const petController = require('./controllers/petController');
const conditionController = require('./controllers/conditionController');
const priceController = require('./controllers/priceController');
const hostFamilyController = require('./controllers/hostFamilyController');
const veterinaryController = require('./controllers/veterinaryController');
const questionnaireAdoptController = require('./controllers/questionnaireAdoptController');
const adoptantController = require('./controllers/adoptantController');
const eventController = require('./controllers/eventController');
const researchController = require('./controllers/researchController');
const userController = require('./controllers/userController');
//Partie Joi validation des données
const volunteerSchema = require('./schema/asela_validate');
const { addUserValidation } = require('./services/validator');

const router = Router();

//---------------------------------Route LOGIN et SIGNIN----------------------------
router.get('/login', userController.loginPage)
router.post('/login', userController.login)
router.get('/signin', userController.signInPage)
router.post('/signin', addUserValidation, userController.createUser)

//----------------------------------Routes chiens----------------------------

//Route pour afficher notre back office des chiens
router.get('/dogs', dogController.allPetsNotAdopted, dogController.allPetsAdopted, dogController.allPetsDeceaded)
//
router.get('/dogsAdopt', dogController.allPetsAdopted)
//Route pour ajouter un chien a l'adoption
router.post('/dogs', dogController.addNewPet)
//Route pour supprimer un chien de la bdd
router.delete('/dogs/:id', dogController.suppPet)

//----------------------------------Routes chats----------------------------
//Route pour afficher notre back office des chats
router.get('/cats', catController.allPetsNotAdopted, catController.allPetsAdopted, catController.allPetsDeceaded)
// Route pour recensser tous les chats adoptés
//router.get('/cats/adopted', catController.allCatsAdopted)
//Route pour modifier le status d'un chat (a l'adoption ou non)
router.patch('/cats/:id', catController.petStateAdoption)
// Route pour ajouter un nouveau chat à l'adoption
router.post('/cats', catController.AddNewCatToAdopt)
// Route pour supprimer un chat du site de l'association
router.delete('/cats/:id', catController.deleteCat)

//----------------------------------Routes Animal----------------------------
//Route pour declarer qu'un animal a été adopté
router.post('/pet/adopt/:id', petController.petSitePublish)
//route pour voir la fiche d'un animal
router.get('/pet/:id', petController.findOnePet, petController.findAllComment, petController.findAllQuestAdoptForOnePet)
// Mise à jour  d'un animal
router.patch('/pet/:id', petController.editPet)
// Mise a jour des dates du dernier vaccin
router.patch('/pet/datevaccine/:id', petController.editDateVaccine)
// Mise a jour des dates de prise en charge
router.patch('/pet/datesupported/:id', petController.editDateSupported)
//Rechercher un animal
router.post('/pet/:id', petController.findresearch)
//Poster un commentaire sous l'animal
router.post('/pet/comment/:id', petController.addComment)
//Supprimer un commentaire sous l'animal
router.delete('/pet/comment/:id', petController.deleteCommentPet)
//Route pour afficher la liste des animaux décédés
router.get('/petsdead', petController.allPetDead)
//Route pour modifié le status d'un animal (décédé ou le ressusité si erreur)
router.patch('/petsdead/:id', petController.declarationDead)
//Attribué une FA a un animal
router.patch('/affectfa/:id', petController.affectFamilyHost)
// modifier le status de publication sur secondechance d'un animal
router.patch('/secondechance/:id', petController.petStatePublishSC)
// modifier le status de publication sur fb d'un animal
router.patch('/facebook/:id', petController.petStatePublishFB)
// modifier le status de publication d'un animal sur le site officiel
router.patch('/site/:id', petController.petSitePublish)
// modifier le status de reservation d'un animal
router.patch('/reserve/:id', petController.petReserve)
// Ajouter une photo a l'animal
router.post('/uploadpet', petController.uploadPhotoPet)
// Route pour attribuer une famille d'acceuil à un animal
router.patch('/putHostFamilyToPet/:id', petController.putHostFamilyPet)

//---------------------------Routes Conditions d'adoption--------------------
//Route pour lister les conditions d'adoption
router.get('/reglage')
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

//----------------------------------Routes famille d'acceuil----------------------------
// Route pour trier FA par departements
//router.get('/hostFamily', hostFamilyController.findHostFamilyByDpt)
// Route pour lister une seule famille d'acceuil via son id
router.get('/hostFamily', hostFamilyController.findHostFamilyByDpt)
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


//----------------------------------Routes Veterinaire----------------------------

// Route pour afficher les vétérinaire par départements
router.get('/veterinary', veterinaryController.FindVeterinaryByDpt)
// Route pour afficher un véterinaire
router.get('/veterinary/:id', veterinaryController.findOneVeterinary, veterinaryController.findAllPrice)
// Route pour ajouter un veterinaire
router.post('/addveterinary', veterinaryController.addVeterinary)
// Route pour supprimer un veterinaire
router.delete('/deleteVeterinary/:id', veterinaryController.deleteVeterinary)
// Route pour modifier un vétérinaire
router.patch('/editVeterinary/:id', veterinaryController.editVeterinary)
// Route pour ajouter un prix d'un vétérinaire
router.post('/addPriceVeterinary', veterinaryController.addPriceVeterinary)
// Route pour supprimer un prix d'un vétérinaire
router.delete('/deletePriceVeterinary/:id', veterinaryController.deletePriceVeterinary)
// Route pour modifier un prix d'un vétérinaire
router.patch('/editPriceVeterinary/:id', veterinaryController.editPriceVeterinary)

//-------------------------------Route questionnaire--------------------------------
router.post('/questionnaire', questionnaireAdoptController.responseQuest)

//-------------------------------Route evenement--------------------------------
// Route pour lister tous les évènements
router.get('/events', eventController.allEvent)
// Route pour télécharger une image de l'évènement
router.post('/upload', eventController.uploadevent)
router.post('/events', eventController.uploadevent, eventController.addEvent)

//-------------------------------Route questionnaire BACK OFFICE--------------------------------
router.delete('/questionnaire/:id', questionnaireAdoptController.suppQuest)
router.get('/questionnaire/:id', questionnaireAdoptController.findOneQuestAdopt)
router.patch('/questionnaire/:id', questionnaireAdoptController.attributeQuest)
router.get('/questionnaireEnAttente', questionnaireAdoptController.findAllQuestAdoptWaiting)
router.get('/questionnaireRefuse', questionnaireAdoptController.findAllQuestAdoptRefused)
router.get('/questionnaireAbandonne', questionnaireAdoptController.findAllQuestAdoptSsSuite)
router.post('/questionnaireAdoptant/:id', questionnaireAdoptController.passQuestToAdoptant)
router.post('/questionnaireAdoptantToBlacklist/:id', questionnaireAdoptController.passAdoptantToBlacklist)

//-----------------------------Route Adoptant---------------------------------------------------
router.get('/adoptants', adoptantController.findAllAdoptant, adoptantController.findAllPetAdoptant)
router.get('/adoptant/:id',  adoptantController.findOneAdoptant, adoptantController.findAllPetAdoptant, adoptantController.findAllCommentAdoptant)
router.post('/addCommentAdoptant/:id', adoptantController.commentAdoptant)
router.delete('/deleteCommentAdoptant/:id', adoptantController.deleteCommentAdoptant)

//---------------------------------------Recherche-------------------------------------------------
// ce middleware est appelé en 1 er car il prépare la liste des données que l'on as mis dans le response.locals
//router.use(researchController.loadAllSearch);
router.get('/pet/:id', researchController.loadPet)
router.get('/hostFamilly/:id', researchController.loadHostFamily)
router.get('/adoptant/:id', researchController.loadAdoptant)
//router.get('/search', researchController.search)

module.exports = router;