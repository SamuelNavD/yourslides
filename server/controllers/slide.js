'use strict'

const Slide = require('../models/slide');
const request = require('request');
const slide = require('../models/slide');

function createSlide(req, res) {
  var slide = new Slide({
    title: req.body.title,
    setting: req.body.setting,
    owner: req.body.owner,
  });

  slide.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear la presentación: ${err}` });

    return res.status(201).send({ slide: slide });
  });
}

function updateSlide(req, res) {
  Slide.findOneAndUpdate({ _id: req.body._id }, {
    title: req.body.title,
    setting: req.body.setting,
    owner: req.body.owner,
    content: req.body.content
  }, {new: true}, (err, slide) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` });
    if (!slide) return res.status(404).send({ message: 'Error: presentación no encontrada' });

    return res.status(200).send({
              message: 'Presentación actualizada correctamente',
              slide: slide
            });
  });
}

function getSlide ( req, res ) {

  var id = req.params.id;

  Slide.findById( id )
      .exec( (err, slide) => {
        if (err) return res.status(500).send({ message: err });
        if (!slide) return res.status(404).send({ message: "No existe la presentación" });

        res.status(200).json({
          slide: slide
        });
      });
}

function deleteSlide ( req, res ) {

  var id = req.body.id;

  Slide.findOneAndDelete( id, (err, slide) => {
        if (err) return res.status(500).send({ message: err });
        if (!slide) return res.status(404).send({ message: "No existe la presentación" });

        res.status(200).json({
          message: 'Presentación eliminada con éxito',
          slide: slide
        });
      });
}


module.exports = {
  createSlide,
  updateSlide,
  getSlide,
  deleteSlide
};