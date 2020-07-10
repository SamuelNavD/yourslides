'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error al conectar con la base de datos: ${err}`);
  console.log('Conexión con la base de datos exitosa');

  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`);
  });
});