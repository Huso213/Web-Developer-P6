//import module express
const express = require('express');
//creation routes express 
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
///import middleware auth
const auth = require('../middleware/auth');
//import middleware multer-config
const multer = require('../middleware/multer-config');

//route pour cree / ajouter une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

//route pour afficher toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

//route pour recupere une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

//route pour modifier et mettre a jour une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//route pour suprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//route pour liker/disliker
router.post('/:id/like', auth, sauceCtrl.likeSauce);

//exportation pour utiliser dans d'autres fichiers
module.exports = router;

 








