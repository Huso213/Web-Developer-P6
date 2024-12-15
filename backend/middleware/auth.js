//protection pour les connection 
const jwt = require('jsonwebtoken');//importe module jsonwebtoken pour authentification et autorisation

//export middleware pour verifier l'auth d'une requete
module.exports = (req, res, next) => {
    try {
        //recupere token de la requete
        const token = req.headers.authorization.split(' ')[1];
        //verifie token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //extraction de l'ID utilisateur token decode
        const userId = decodedToken.userId;

        req.auth = { userId }; 
        //ID utilisateur dans le corps de la requete correspond a Token pas le cas une erreur leve
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {//si tout est valide passe prochaine fonction middleware
            next();
        }
    } catch (error) { // Je renvoie une erreur status 401.
        res.status(401).json({ error: error | 'Requête non authentifiée ! ' })
    }
};

