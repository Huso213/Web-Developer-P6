const Sauce = require('../models/Sauce');
const fs = require ('fs');//file systeme permet de modifier ou suprimer des fichier

//Créer - ajouter une sauce

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({ 
        ...sauceObject, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
        likes: 0, 
        dislikes: 0, 
    });
    sauce.save() 
    .then(() => res.status(201).json({ message: 'Sauce enregistré !' })) 
    .catch(error => res.status(400).json({ error })) 
};


//Recupere toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

//recupere 1 seul sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
};

//Modifier / mettre a jour une biere
exports.modifySauce = (req, res, next) => {
    if(req.file) {
        Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                const sauceObject = {
                    ...JSON.parse(req.body.beer),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    };
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id})
                    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
                    .catch(error => res.status(400).json({ error }));
                })
        })
        .catch(error => res.status(500).json({ error }));
        } else {
            const sauceObject = { ...req.body };
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
            .catch(error => res.status(400).json({ error }));
            }
    };

//Suprimer 1 sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce a été supprimée avec succès'}))
    .catch(error => res.status(400).json({ error }));
});
})
.catch(error => res.status(500).json({ error }));
}

//Like et Dislike
exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const sauceId = req.params.id;
    Sauce.findOne({ _id: sauceId })//recupere la sauce
    .then(sauce => {
//nouvelles valeurs a modifier on recupere les donnes
const newValues = {
    usersLiked: sauce.usersLiked,
    usersDisliked: sauce.usersDisliked,
    likes: 0,
    dislikes: 0
}
//suivant les cas
switch (like) {
    //lorsqu'on like
    case 1:
        newValues.usersLiked.push(userId);//push enregistre dns tableau userid
        break;
        //lorsqu'on dislike
        case -1:
            newValues.usersDisliked.push(userId);
            break;
            //lorsqu'on annule un likeou pas d'avis ou dislike
            case 0:
                if(newValues.usersLiked.includes(userId)) {
                //si annultion du like
                const index = newValues.usersLiked.indexOf(userId);
                newValues.usersLiked.splice(index, 1);
            }else{
                //si annulation du dislike
                const index = newValues.usersDisliked.indexOf(userId);
                newValues.usersDisliked.splice(index, 1);
            }
            break;

};

//Calcul nombre de likes dislike
newValues.likes = newValues.usersLiked.length;//calcul le nbre des like/dislike
newValues.dislikes = newValues.usersDisliked.length;

//mise a jour des valeurs
Sauce.updateOne({_id: sauceId}, newValues)
.then(() => res.status(200).json({message:'Note attribuée'}))
.catch(error => res.status(500).json({ error }))
})
.catch(error => res.status(500).json({ error}));
};

