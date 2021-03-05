'use strict';

const mongoose = require('mongoose');
const Student = require('./Student.js');

const schema = new mongoose.Schema({
  code: { type: String, minlength: 1, maxlength: 16, required: true },
  title: { type: String, minlength: 2, maxlength: 255, required: true },
  description: { type: String, minlength: 5, maxlength: 2048, required: false },
  url: { type: String, minlength: 3, maxlength: 512, required: false },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Model = mongoose.model('Course', schema);
module.exports = Model;
