'use strict';

const wrapHandler = require('./utils/context/wrap-handler');

exports.botHandler = wrapHandler(require('./handlers'));
