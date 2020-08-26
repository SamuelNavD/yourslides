'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlideSchema = Schema({
  title: String,
  setting: Object,
  content: { type: Object, default: {} },
  owner: String
}, { minimize: false });

module.exports = mongoose.model('Slide', SlideSchema);