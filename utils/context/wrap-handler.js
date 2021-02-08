'use strict';

const { scoped } = require('../telegraf');
const { constructContext } = require('./misc');
const ContextHandlingEdits = require('./handle-edits');

const wrapHandler = scoped(constructContext(ContextHandlingEdits));

module.exports = wrapHandler;
