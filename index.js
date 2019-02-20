const express = require('express');
const knex = require('knex');
const helmet = require('helmet');
const morgan = require('morgan');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

port = process.env.PORT || 8000;

server.listen(port, _ => console.log(`\nServer Listening on Port ${port}\n`))