'use strict'

const User = require('../models/user');
const service = require('../services/tokens');
const fs = require('fs');

function signUp (req, res) {
  var user = new User({
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password
  });

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
      if (!result) return res.status(401).send({ message: 'Credenciales incorrectas' });

      return res.status(200).send({
        message: "Te has logueado",
        token: service.createToken(user)
      });
    });
  });
}

function updateUser (req, res) {
  var avatar = null;
  if (req.files) {
    const filePath = req.files.avatar.path.split('/');
    avatar = filePath[filePath.length - 1];
  }

  User.findOneAndUpdate({ _id: req.body._id }, {
    email: req.body.email,
    displayName: req.body.displayName,
    name: req.body.name,
    surname: req.body.surname,
    avatar: avatar
  }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` });
    if (!user) return res.status(404).send({ message: 'Error: usuario no encontrado' });

    return res.status(200).send({ message: 'Usuario actualizado correctamente' });
  });
}

module.exports = {
  signUp,
  signIn,
  updateUser
};