const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //importe le package m-u-v

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    });

    userSchema.plugin(uniqueValidator);//plugin permet ajouter securite au mail unique pour chaque utilisteur

    module.exports = mongoose.model('User', userSchema); //exporte le model userschema
