'use strict';

const mongoose = require('mongoose');
const Student = require('./Student.js');

const schema = new mongoose.Schema({
  code: { type: String, maxlength: 16, required: true },
  title: { type: String, maxlength: 255, required: true },
  description: { type: String, maxlength: 2048, required: false },
  url: { type: String, maxlength: 512, required: false },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Model = mongoose.model('Course', schema);
module.exports = Model;
