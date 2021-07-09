const { Router } = require('express');
const dogController = require('./controllers/dogController');
const catController = require('./controllers/catController');
const petController = require('./controllers/petController');
const conditionController = require('./controllers/conditionController');
const hostFamilyController = require('./controllers/hostFamilyController');
const veterinaryController = require('./controllers/veterinaryController');
const questionnaireAdoptController = require('./controllers/questionnaireAdoptController');
const adoptantController = require('./controllers/adoptantController');
const eventController = require('./controllers/eventController');
const dashboardController = require('./controllers/dashboardController');
const userController = require('./controllers/userController');
const blacklistController = require('./controllers/blacklistController');
const waitinglistController = require('./controllers/waitinglistController');

//Partie Joi validation des données
const volunteerSchema = require('./schema/asela_validate');
const { validateBody } = require('./services/validator');


const path = require('path');
//const uploads  = require('./middlewares/upload');
const { upload } = require('multer');

const router = Router();

//---------------------------------Route LOGIN et SIGNIN----------------------------
router.get('/login', userController.loginPage)
router.post('/login', userController.login)
router.get('/signin', userController.signInPage)
router.post('/signin', validateBody(volunteerSchema), userController.createUser)

//---------------------------------------Dashboard------------------------------
router.get('/dashboard', dashboardController.home)

//----------------------------------Routes chiens----------------------------

//Route pour afficher notre back office des chiens
router.get('/dogs', dogController.allPetsNotAdopted, dogController.allPetsAdopted, dogController.allPetsDeceaded)
//Route pour afficher les chiens qui sont adoptés
router.get('/dogsAdopt', dogController.allPetsAdopted)
//Route pour ajouter un chien a l'adoption
router.post('/dogs', dogController.addNewPet)
//Route pour supprimer un chien de la bdd
//router.delete('/dogs/:id', dogController.suppPet)

//----------------------------------Routes chats----------------------------
//Route pour afficher notre back office des chats
router.get('/cats', catController.allPetsNotAdopted, catController.allPetsAdopted, catController.allPetsDeceaded)
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
router.get('/pet/:id', petController.findOnePetWhithAllData)
// Mise à jour  d'un animal
router.patch('/pet/:id', petController.editPet)
// Mise a jour des dates du dernier vaccin
router.patch('/pet/datevaccine/:id', petController.editDateVaccine)
// Mise a jour des dates de prise en charge
router.patch('/pet/datesupported/:id', petController.editDateSupported)
//Poster un commentaire sous l'animal
router.post('/pet/comment/:id', petController.addComment)
//Supprimer un commentaire sous l'animal
router.delete('/pet/comment/:id', petController.deleteCommentPet)
//Route pour modifié le status d'un animal (décédé ou le ressusité si erreur)
router.patch('/petsdead/:id', petController.declarationDead)
//Attribué une FA a un animal
router.patch('/affectfa/:id', petController.affectFamilyHost)
// modifier le status de publication d'un animal sur le site officiel
router.patch('/publish/:id', petController.petSitePublish)
// modifier le status de reservation d'un animal
router.patch('/booked/:id', petController.petBooked)
// Route pour attribuer une famille d'acceuil à un animal
router.patch('/putHostFamilyToPet/:id', petController.putHostFamilyPet)
//Route pour supprimer un animal
router.delete('/pet/:id', petController.suppPet)
//Route pour supprimer une photo
router.delete('/pet/deletemypicturepet/:id', petController.suppPhoto)
//Route pour supprimer un commentaire
router.delete('/pet/deletemycommentpet/:id', petController.suppComment)


//----------------------------------Routes famille d'acceuil----------------------------
// Route pour trier FA par departements
router.get('/hostFamily', hostFamilyController.findHostFamilyByDpt)
// Route pour ajouter une famille d'acceuil
router.post('/addHostFamily', hostFamilyController.addHostFamily)
// Route pour supprimer une famille d'acceuil
router.post('/suppHostFamily/:id', hostFamilyController.deleteHostFamily)
// Route pour modifier une famille d'acceuil
router.patch('/editHostFamily/:id', hostFamilyController.editHostFamily)
// Route pour ajouter un commentaire à une famille d'acceuil
router.patch('/addCommentHostfamily/:id', hostFamilyController.commentHostFamily)
// Route pour attribuer un animal à une famille d'acceuil
router.patch('/putPetToHostFamily/:id', hostFamilyController.putPetHostFamily)


//----------------------------------Routes Veterinaire----------------------------
// Route pour afficher les vétérinaire par départements
router.get('/veterinary', veterinaryController.FindVeterinaryByDpt)
// Route pour ajouter un veterinaire
router.post('/veterinary', veterinaryController.addVeterinary)
// Route pour supprimer un veterinaire
router.delete('/veterinary/:id', veterinaryController.deleteVeterinary)
// Route pour modifier un vétérinaire
router.patch('/veterinary', veterinaryController.editVeterinary)

//-------------------------------Route evenement--------------------------------
//Route pour lister tous les évènements
router.get('/events', eventController.allEvent)
//Route pour télécharger une image de l'évènement
//router.post('/upload', eventController.uploadevent)
router.post('/events', eventController.uploadevent, eventController.addEvent)

//-------------------------------Route questionnaire BACK OFFICE--------------------------------
router.get('/questionnaire', questionnaireAdoptController.findAllQuestionnaire)
router.get('/questionnaire/:id',  questionnaireAdoptController.findOneQuestAdopt)

router.delete('/questionnaire/:id', questionnaireAdoptController.suppQuest)
router.patch('/questionnaire/:id', questionnaireAdoptController.attributeQuest)
router.post('/questionnaireAdoptantToBlacklist/:id', questionnaireAdoptController.passAdoptantToBlacklist)


//-----------------------------Route Adoptant---------------------------------------------------
router.get('/adoptants', adoptantController.findAllAdoptant)
router.post('/adoptants', adoptantController.addAdoptant)
router.get('/adoptant/:id',  adoptantController.findAllPetAdoptant)
router.post('/addCommentAdoptant/:id', adoptantController.commentAdoptant)
router.patch('/editCommentAdoptant/:id', adoptantController.editComment)
router.delete('/deleteCommentAdoptant/:id', adoptantController.deleteCommentAdoptant)


//--------------------------Route Conditions et prix
//Route pour lister les conditions d'adoption
router.get('/reglages', conditionController.findCondition)
router.patch('/tarif-chien', conditionController.editPriceDog)
router.patch('/tarif-chat', conditionController.editPriceCat)
router.patch('/breed-pet', conditionController.breedPet)
router.post('/condition', conditionController.addNewCondition)
router.patch('/condition', conditionController.editCondition)
router.delete('/condition/:id', conditionController.suppCondition)

/*--------------------------Route pour blacklister---------------------------*/
//Route pour afficher tous les blacklister
router.get('/blacklist', blacklistController.findAllBlacklist)
//Route pour afficher tous les blacklister
router.post('/blacklist', blacklistController.addBlacklister)
//Route pour trouver une personne en blacklist
router.get('/blacklist/:id', blacklistController.findOneBlacklist)
//Route pour ajouter une FA en blacklist
router.post('/blacklistHostFamilly/:id', blacklistController.addBlacklisterFA)
//Route pour supprimer une personne en blacklist
router.delete('/blacklist/:id', blacklistController.suppBlacklister)

/*------------------------------Route liste d'attente--------------------------*/
//Route pour lister nos liste d'attente
router.get('/waitinglist', waitinglistController.findAllWaitinglist)

module.exports = router;