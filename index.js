const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const cohortsRouter = require('./cohorts/cohortsRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/cohorts', cohortsRouter);

port = process.env.PORT || 8000;

server.listen(port, _ => console.log(`\nServer Listening on Port ${port}\n`))