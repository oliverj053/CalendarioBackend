const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');


// console.log(process.env)

// crear servidor express 
const app = express();

// Base de datos
dbConnection();

// CORS 
app.use(cors())

// -------MIDLEWARE---------------
// Directorio publico 
app.use(express.static('public'));
// Lectura y parseo de body  --->Los datos json que mandamos por POST
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriedo en el puerto ${process.env.PORT}`);
});
