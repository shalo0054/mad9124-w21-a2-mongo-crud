'use strict';

const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/A2', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => {
    console.error('Problem connecting to MongoDB...', err.message);
    process.exit(1);
  });

const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/students', require('./routes/students.js'));
app.use('/api/courses', require('./routes/courses.js'));

// start listening for HTTP requests
const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
