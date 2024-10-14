const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

 //middleware pour s'incrire
 router.post('/signup', userCtrl.signup);

 //middleware pour se connecter
 router.post('/login', userCtrl.login);

 module.exports = router;
