'use strict';
const express = require("express");
const validateStudentId = require("../middleware/studentValidation");
const router = express.Router();
const { students } = require("../data/studentData");

router.use("/:studentId", validateStudentId);

router.get("/", (req, res) => res.send({ data: students }));

router.get("/:studentId", (req, res) => {
  const student = students.find(student => student.id === parseInt(req.params.studentId));
  res.send({ data: student });
});

router.post("/", (req, res) => {
  const { firstName, LastName, nickName, email } = req.body;
  const newStudent = {
    id: Date.now(),
    firstName,
    LastName,
    nickName,
    email
  }
  students.push(newStudent);
  res.status(201).send({ data: newStudent });
});

router.put("/:studentId", (req, res) => {
  const { firstName, lastName, nickName, email } = req.body;
  const updatedStudent = { firstName, lastName, nickName, email };
  students[req.studentIndex] = updatedStudent;
  res.send({ data: updatedStudent });
});

router.patch("/:studentId", (req, res) => {
  const { id, ...theRest } = req.body;
  const updatedStudent = Object.assign({}, students.id, theRest);
  students[req.studentIndex] = updatedStudent;
  res.send({ data: updatedStudent });
});

router.delete("/:studentId", (req, res) => {
  const deletedStudent = students.splice(req.studentIndex, 1);
  res.send({ data: deletedStudent[0] });
});

module.exports = router;
