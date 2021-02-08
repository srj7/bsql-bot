'use strict';

const Executor = require('./executor/');

const request = require('./utils/request');

module.exports = new Executor({ request });
