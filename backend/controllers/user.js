//importation modele 'User' depuis 
const User = require('../models/User');

//import module 'bcrypt' pour le hachage et la vérification des mots de passe
const bcrypt = require('bcrypt'); 
//importation module 'jsonwebtoken' pour la génération des tokens JWT
const jwt = require('jsonwebtoken');

//signup pour l'inscription un nouvel utilisateur
exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 10)//hasher le mots de passe 
.then(hash => {
    //créer un nouvel utilisateur avec mail mot de passe
    const user = new User({
        email: req.body.email,
        password: hash
    });
    console.log("Nouvel utilisateur créé:", user); // Log pour afficher l'utilisateur créé
    //enregistrer l'utilisateur dans la base de données
    user.save()
    //utilisateur est créé avec succès, renvoie une réponse avec le statut 201 et un message de succès
    .then(() => {
        console.log("Utilisateur enregistré avec succès dans la base de données"); // Log pour indiquer que l'enregistrement a réussi
        res.status(201).json({ message: 'Utilisateur créé avec succès !' });
    })
   // En cas d'erreur lors de la sauvegarde, renvoie une réponse avec le statut 400
   .catch(error => {
    console.error("Erreur lors de l'enregistrement de l'utilisateur:", error); // Log pour afficher l'erreur
    res.status(400).json({ error });
});
})
 // En cas d'erreur lors du hachage du mot de passe, renvoie une réponse avec le statut 500 et l'erreur
 .catch(error => {
    console.error("Erreur lors du hachage du mot de passe:", error); // Log pour afficher l'erreur
    res.status(500).json({ error });
});
};

//login se connecter
exports.login = (req, res, next) => {
    //recherche utilisateur dans la base de donnees par mail
    User.findOne({ email: req.body.email })
         .then(user => {
            //si utilisateur existe, vérifie le mot de passe
             if(!user) {
                console.log("Utilisateur non trouvé pour l'email:", req.body.email); 
                // Log si l'utilisateur n'existe pas
                //utilisateur n'existe pas renvoie 
                return res.status(401).json({ error: "L'utilisateur n'existe pas !" });}
                console.log("Utilisateur trouvé:", user); // Log pour afficher l'utilisateur trouvé
                //Verifie le mot de passe
             bcrypt.compare(req.body.password, user.password)
                 .then(valid => {
                     if(!valid) {
                        // Log si le mot de passe est incorrect
                        console.log("Mot de passe incorrect pour l'utilisateur:", user.email); 
                         return res.status(401).json({ error: 'Mot de passe incorrect !' });
                     }
                     // Log pour indiquer que la connexion a réussi
                     console.log("Connexion réussie pour l'utilisateur:", user.email); 
                     res.status(200).json({
                         userId: user._id,
                         token: jwt.sign(
                          { userId: user._id },
                          'RANDOM_TOKEN_SECRET',
                          { expiresIn: '24h' })
                     });
                 })
                 .catch(error => {
                    console.error("Erreur lors de la comparaison du mot de passe:", error); // Log pour afficher l'erreur
                    res.status(500).json({ error });
                });
         })
         .catch(error => {
            console.error("Erreur lors de la recherche de l'utilisateur:", error); // Log pour afficher l'erreur
            res.status(500).json({ error });
        });
  
  };