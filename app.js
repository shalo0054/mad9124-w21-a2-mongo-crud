'use strict';

const debug = require('debug')('mad9124-w21-a2-mongo-crud');
const morgan = require('morgan');
const express = require('express');

require('./startup/database.js');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/courses', require('./routes/courses.js'));
app.use('/api/students', require('./routes/students.js'));

// start listening for HTTP requests
const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
