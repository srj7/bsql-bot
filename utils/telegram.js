'use strict';

const R = require('ramda');

const isCommand = R.pathSatisfies(
    R.whereEq({ offset: 0, type: 'bot_command' }),
    [ 'entities', 0 ]
);

const normalizeUsername = R.pipe(
    R.replace(/^@/, ''),
    R.toLower,
);

const areUsernamesEqual = R.eqBy(normalizeUsername);

module.exports = {
    areUsernamesEqual,
    isCommand,
    normalizeUsername,
};
