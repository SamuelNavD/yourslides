'use strict'

const User = require('../models/user');
const service = require('../services/tokens');

function signUp (req, res) {
  var user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password
  });

  /*if (req.files) {
    console.log(req.files.avatar.path);
    const filePath = req.files.avatar.path;
    const fileName = filePath.split('/')[1];
    user.avatar = fileName;
  }*/

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usaurio: ${err}` });

    return res.status(201).send({ token: service.createToken(user) });
  });
}

function signIn (req, res) {
  User.findOne({ email: req.body.email }).select('password').exec((err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: "No existe el usuario" });

    req.user = user;

    user.comparePassword(req.body.password, function(err, result) {
      if (err) return res.status(500).send({ message: `Error en el inicio de sesión: ${err}` });
      if (!result) return res.status(401).send({ message: 'Contraseña incorrecta' });

      return res.status(200).send({
        message: "Te has logueado",
        token: service.createToken(user)
      });
    });
  });
};

module.exports = {
  signUp,
  signIn
};