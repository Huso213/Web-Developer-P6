//Importation des module 
const express = require('express');//pour le routage + gestion des requetes HTTP
const bodyParser = require('body-parser')
const mongoose = require('mongoose'); //interagir avec la base de donnees
const path = require('path'); // Module utilisé pour manipuler les chemins fichiers et repertoires +ajout extension aux fichiers

//pour gerer les requetes HTTP
const app = express();

const userRoutes = require('./routes/users') // J'importe le router User
const sauceRoutes = require('./routes/sauces'); // J'importe le router sauces

//connection serveur mongoose
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://huso213:2131965@cluster0.fv78yjr.mongodb.net/', )
//Afficher dans le terminal le message de connection Mongodb
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  //Middleware pour CORS et la politique de secu
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//toutes les origines peuvent acceder au ressources
    //les en-tetes qui peuvent utiliserlors des requetes
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //les methode HTTP autorisees
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //Ressources provenan de meme origines Self aide a prevenir les attaques 
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
  });
  
//Pour traiter et envoyer les donnees
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

 //pour afficher les images depuis le repertoires 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

//Middleware pour gerer les codes qui commence par /api/xx requete envoye a URL traite par le routeur correspondant
app.use('/api/auth', userRoutes); 
app.use('/api/sauces', sauceRoutes);

//export app 
module.exports = app;
