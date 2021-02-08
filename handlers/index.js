'use strict';

const Tf = require('telegraf').Composer;

const paths = [
    './common_langs',
    './help',
    './langs',
    './main',
    './unmatched',
];

const handlers = paths.map(require);

module.exports = Tf.compose(handlers);
