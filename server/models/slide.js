'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlideSchema = Schema({
  title: String,
  setting: Object,
  content: Object,
  owner: String
});

module.exports = mongoose.model('Slide', SlideSchema);