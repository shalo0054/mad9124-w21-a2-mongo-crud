'use strict';

const morgan = require('morgan');
const debug = require('debug')('mad9124-w21-a2-mongo-crud');
const express = require('express');

require('./startup/database')()

const app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/students', require('./routes/students.js'));
app.use('/api/courses', require('./routes/courses.js'));

// start listening for HTTP requests
const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
