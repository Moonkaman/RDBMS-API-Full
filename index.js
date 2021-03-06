const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const knexLogger = require('knex-logger');

const cohortsRouter = require('./cohorts/cohortsRouter');
const studentsRouter = require('./students/studentsRouter');

const db = require('./dbConfig');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(knexLogger(db))
server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

port = process.env.PORT || 8000;

server.listen(port, _ => console.log(`\nServer Listening on Port ${port}\n`))