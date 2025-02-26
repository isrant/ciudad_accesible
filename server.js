require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
  newUserController,
  getUserController,
  loginController,
} = require('./controllers/users');

const {
  getIssuesController,
  getIssueController,
  newIssueController,
  deleteIssueController,
  updateIssueController,
} = require('./controllers/issues');

const { authUser } = require('./middlewares/auth');

const app = express();

// para que intente procesar los datos formato JSON de las peticiones postman
app.use(express.json());
// primer middleware es llamar a morgan
app.use(morgan('dev'));

//Rutas (controladores que gestionan las rutas: users e issues)
//Rutas de usuario (users)
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);

//Rutas de incidencias (issues)
app.post('/', authUser, newIssueController);
app.get('/', getIssuesController);
app.get('/issue/:id', getIssueController);
app.delete('/issue/:id', deleteIssueController); // ¿queremos borrar? creo que no
app.put('/issue/:id', updateIssueController); // actualizar/dar por finalizado

//1. Middleware que se encarga de gestionar lo que no pasa por el resto de rutas
// Middleware de 404 - Not found.
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Middleware de error.
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    error: 'error',
    message: error.message,
  });
});

// Lanzamos el servidor
app.listen(3000, () => {
  console.log('Servidor funcionando...');
});
