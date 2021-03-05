'use strict'

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: {type: String, minlength: 2, maxlength: 64, required: true},
  lastName: {type: String, minlength: 2, maxlength: 64, required: true}, 
  nickName: {type: String, minlength: 1, maxlength: 64, required: false}, 
  email: {type: String, minlength: 5, maxlength: 512, required: true}
});

const Model = mongoose.model('Student', schema);
module.exports = Model;
