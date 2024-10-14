const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path'); // Module utilisé pour travailler avec des fichiers et chemin d'accés 

const app = express();

const userRoutes = require('./routes/users') // J'importe le router User
const sauceRoutes = require('./routes/sauces'); // J'importe le router sauces

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://huso213:2131965@cluster0.fv78yjr.mongodb.net/', )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Security-Policy', "default-src 'self'");  next();
  });
  

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
 //pour afficher les images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes); 
app.use('/api/sauces', sauceRoutes);


module.exports = app;