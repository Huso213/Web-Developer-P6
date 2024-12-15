//Importation du module 'multer' pour gerer le telechargement des fichiers dans app
const multer = require('multer');

//definition d'un objet qui associe les types MIME des images a leurs extension
const MIME_TYPES = {
    //MIME pour les imaages JPG
    'image/jpg': 'jpg',
    //MIME pour les images JPEG
    'image/jpeg': 'jpg',
    //MIME pour les images PNG
    'image/png': 'png',
};

//definition d'un objet qui configure multer pour gerer les fichiers uploades
const storage = multer.diskStorage({
    //fonction qui definit le chemin ou les fichiers sont enregistres
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //fonction qui definit le nom des fichiers uploades
    filename: (req, file, callback) => {
        //generation d'un nom unique pour chaque fichier
        const name = file.originalname.split('.')[0].split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});
//definition d'un objet qui configure multer pour gerer les fichiers uploades
module.exports = multer({ storage: storage }).single('image');