'use strict';

const debug = require('debug')('mad9124-w21-a2-mongo-crud');
const morgan = require('morgan');
const express = require('express');
const sanitizeMongo = require('express-mongo-sanitize');

require('./startup/database.js');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/courses', require('./routes/courses.js'));
app.use('/api/students', require('./routes/students.js'));
app.use(sanitizeMongo());

// start listening for HTTP requests
const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
