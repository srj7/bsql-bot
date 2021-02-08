'use strict';

const R = require('ramda');
const Tf = require('telegraf').Composer;

module.exports = Tf.optional(
    R.pathEq([ 'chat', 'type' ], 'private'),
    Tf.reply("Sorry, I couldn't understand that, do you need /help?")
);
