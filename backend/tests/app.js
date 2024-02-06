const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const notes = require('./index.js');


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/notes', notes);

module.exports = app;