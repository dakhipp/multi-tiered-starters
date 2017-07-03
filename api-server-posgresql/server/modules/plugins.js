'use strict';

const Swagger = require('./swagger');
const Inert = require('inert');
const Vision = require('vision');
const Good = require('./good');
const Jwt = require('hapi-auth-jwt2');

module.exports = [Swagger, Inert, Vision, Good, Jwt];
