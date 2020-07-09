'use strict'

const User = require('../models/user');
const service = require('../services/tokens');
const fs = require('fs');

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    avatar: "Sin imagen"
  });

  if (req.files) {
    console.log(req.files.avatar.path);
    const filePath = req.files.avatar.path;
    const fileName = filePath.split('/')[1];
    user.avatar = fileName;
  }

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usaurio: ${err}` });

    return res.status(201).send({ token: service.createToken(user) });
  });
}

function signIn (req, res) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: "No existe el usuario" });
    
    req.user = user;
    res.status(200).send({
      message: "Te has logueado",
      token: service.createToken(user)
    });
  });
}

module.exports = {
  signUp,
  signIn
};