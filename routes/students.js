'use strict';
const Student = require('../models/Student.js');
const router = require('express').Router();
const sanitizeBody = require('../middleware/sanitizeBody.js');

router.use('/', sanitizeBody);

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.send({ data: students });
});

router.get('/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) throw new Error('Resource not found.');
    res.send({ data: student });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.post('/', async (req, res) => {
  let attributes = req.sanitizedBody;
  delete attributes._id;

  const newStudent = new Student(attributes);
  await newStudent.save();

  res.status(201).send({ data: newStudent });
});

router.patch('/:studentId', async (req, res) => {
  const { _id, id, ...otherAttributes } = req.sanitizedBody;
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      { _id: req.params.studentId, ...otherAttributes },
      { new: true, runValidators: true }
    );
    if (!student) throw new Error('Resource not found.');
    res.send({ data: student });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.put('/:studentId', async (req, res) => {
  const { _id, id, ...otherAttributes } = req.sanitizedBody;
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      { _id: req.params.studentId, ...otherAttributes },
      { new: true, overwrite: true, runValidators: true }
    );
    if (!student) throw new Error('Resourse not found.');
    res.send({ data: student });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.delete('/:studentId', async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.studentId);
    if (!student) throw new Error('Resource not found.');
    res.send({ data: student });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

function sendResourceNotFound(req, res) {
  res.status(404).send({
    errors: [
      {
        status: '404',
        title: 'Resource does not exist',
        description: `We could not find a person with id: ${req.params.studentId}`
      }
    ]
  });
}

module.exports = router;
