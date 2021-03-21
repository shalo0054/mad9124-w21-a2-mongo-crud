'use strict';
const Course = require('../models/Course.js');
const router = require('express').Router();
const sanitizeBody = require('../middleware/sanitizeBody.js');

router.use('/', sanitizeBody);

router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.send({ data: courses });
});

router.get('/:courseId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      'students'
    );
    if (!course) throw new Error('Resource not found');
    res.send({ data: course });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.post('/', async (req, res) => {
  let attributes = req.sanitizedBody;
  delete attributes._id;

  try {
    const newCourse = new Course(attributes);
    await newCourse.save();
    res.status(201).send({ data: newCourse });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.patch('/:courseId', async (req, res) => {
  const { _id, id, ...otherAttributes } = req.sanitizedBody;
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { _id: req.params.courseId, ...otherAttributes },
      { new: true, runValidators: true }
    );
    if (!course) throw new Error('Resource not found.');
    res.send({ data: course });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.put('/:courseId', async (req, res) => {
  const { _id, id, ...otherAttributes } = req.sanitizedBody;
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { _id: req.params.courseId, ...otherAttributes },
      { new: true, overwrite: true, runValidators: true }
    );
    if (!course) throw new Error('Resource not found.');
    res.send({ data: course });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.delete('/:courseId', async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.courseId);
    if (!course) throw new Error('Resource not found.');
    res.send({ data: course });
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
        description: `We could not find a car with id: ${req.params.courseId}`
      }
    ]
  });
}

module.exports = router;
