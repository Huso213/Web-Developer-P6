//import module express framwork node.js
const express = require('express');
//creation routes express 
const router = express.Router();

const userCtrl = require('../controllers/user');

 //middleware pour s'incrire
 router.post('/signup', userCtrl.signup);

 //middleware pour se connecter
 router.post('/login', userCtrl.login);

 //exportation pour utiliser dans d'autres fichiers
 module.exports = router;
