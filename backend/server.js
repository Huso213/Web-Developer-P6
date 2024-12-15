//importation du module 'http' permet de creer un serveur HTTP
const http = require('http');
//import app.js 
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;//si le num de port est un entier positif ou egale a 0 on le retourne
  }
  return false;//condition non correcte return pour indique le port invalide
};
// Fonction pour normaliser le port ecoute par l'application
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Affiche les erreur lies au connection de servuer
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error; //Relance l'erreur car ce n'est pas le cas prévu
  }
  //recupere les info adresse du serveur
  const address = server.address();
  //serveur ecoute le port cree une chaine et indique le port ecoute
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  //affiche les differents erreurs lors demarrage serveur
  switch (error.code) {
    case 'EACCES'://erreur indique permission insuffisantes por utiliser le port
      console.error(bind + ' requires elevated privileges.');//message afficher
      process.exit(1);//quitte le processus avec code echec 1
      break;
    case 'EADDRINUSE'://le port est deja utilisé par un autre processus
      console.error(bind + ' is already in use.');//message erreur signale que le port occupe
      process.exit(1);//quitte le processus avec code echec 1
      break;
    default://cas par defut non gere explicitement
      throw error;//relance l'erreur pour traiter ailleur
  }
};
//Ecoute le serveur
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);