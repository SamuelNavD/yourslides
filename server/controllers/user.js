'use strict'

const User = require('../models/user');
const service = require('../services/tokens');
const fs = require('fs');
const request = require('request');

function signUp (req, res) {
  var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

  download('https://eu.ui-avatars.com/api/?format=svg&background=6752ba&color=fff&name='+req.body.name+'+'+req.body.surname.split(' ')[0], './server/uploads/'+req.body.name+req.body.surname.split(' ')[0]+'_default.svg', function(){});

  var user = new User({
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    avatar: req.body.name+req.body.surname.split(' ')[0]+'_default.svg'
  });

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usaurio: ${err}` });

    user.password = ':)';
    return res.status(201).send({ user: user, token: service.createToken(user) });
  });
}

function signIn (req, res) {
  User.findOne({ email: req.body.email }, 'name surname email avatar password').exec((err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: "No existe el usuario" });

    req.user = user;

    user.comparePassword(req.body.password, function(err, result) {
      if (err) return res.status(500).send({ message: `Error en el inicio de sesión: ${err}` });
      if (!result) return res.status(401).send({ message: 'Credenciales incorrectas' });

      return res.status(200).send({
        message: "Te has logueado",
        user: user,
        token: service.createToken(user)
      });
    });
  });
}

async function updateUser (req, res) {
  User.findOneAndUpdate({ _id: req.body._id }, {
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    avatar: req.body.avatar
  }, {new: true}, (err, user) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` });
    if (!user) return res.status(404).send({ message: 'Error: usuario no encontrado' });

    return res.status(200).send({
              message: 'Usuario actualizado correctamente',
              user: user
            });
  });
}

function getUser ( req, res ) {

  var id = req.params.id;

  User.findById( id, 'name surname email avatar')
      .exec( (err, user) => {
        if (err) return res.status(500).send({ message: err });
        if (!user) return res.status(404).send({ message: "No existe el usuario" });

        res.status(200).json({
          user: user
        });
      });
}

function getAvatarName( id ) {
  return new Promise((resolve, reject) => {
    User.findById(id).exec((err, userDB) => {
      resolve(userDB.avatar);
    });
  });
}

module.exports = {
  signUp,
  signIn,
  updateUser,
  getUser
};