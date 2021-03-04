'use strict';
const express = require("express");
const validateCourseId = require("../middleware/courseValidation");
const router = express.Router();
const { courses } = require("../data/courseData");

router.use("/:courseId", validateCourseId);

router.get("/", (req, res) => res.send({ data: courses }));

router.get("/:courseId", (req, res) => {
  const course = courses.find((course) => course.id === parseInt(req.params.courseId));
  res.send({ data: course });
});

router.post("/", (req, res) => {
  const { code, title, description, url } = req.body;
  const newCourse = {
    id: Date.now(),
    code,
    title,
    description,
    url
  }
  courses.push(newCourse);
  res.status(201).send({ data: newCourse });
});

router.put("/:courseId", (req, res) => {
  const { code, title, description, url } = req.body;
  const updatedCourse = { code, title, description, url };
  courses[req.courseIndex] = updatedCourse;
  res.send({ data: updatedCourse });
});

router.patch("/:courseId", (req, res) => {
  const { id, ...theRest } = req.body;
  const updatedCourse = Object.assign({}, courses.id, theRest);
  courses[req.courseIndex] = updatedCourse;
  res.send({ data: updatedCourse });
});

router.delete("/:courseId", (req, res) => {
  const deletedCourse = courses.splice(req.courseIndex, 1);
  res.send({ data: deletedCourse[0] });
});

module.exports = router;
