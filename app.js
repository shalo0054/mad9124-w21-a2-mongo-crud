'use strict'
const express = require('express');
const studentsRouter = require('./routes/students');
const coursesRouter = require('./routes/courses');

const app = express();

app.use(express.json());

app.use('/api/students', studentsRouter);
app.use('/api/courses', coursesRouter);

// start listening for HTTP requests
const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port}...`));