const { Router } = require('express');
const dogController = require('./controllers/dogController');

const router = Router();

//----------------------------------Routes chiens----------------------------
router.get('/dogs', dogController.allPetsNotAdopted, dogController.allPetsAdopted)

//----------------------------------Routes chats----------------------------
// Route pour recensser tous les chats non adoptés
router.get('/cats/notAdopted', catController.allCatsNotAdopted)
// Route pour recensser tous les chats adoptés
//router.get('/cats/adopted', catController.allCatsAdopted)

module.exports = router;