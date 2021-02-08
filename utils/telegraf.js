'use strict';

const R = require('ramda');
const Tf = require('telegraf').Composer;
const XRegExp = require('xregexp');

const { areUsernamesEqual, isCommand } = require('./telegram');

const commandRegex = (regex, handler) => (ctx, next) => {
    const { message } = ctx;

    if (!message || !isCommand(message)) {
        return next();
    }

    ctx.match = XRegExp.exec(message.text, regex);

    if (!ctx.match) {
        return next();
    }

    const { username } = ctx.match;

    if (username && !areUsernamesEqual(ctx.me, username)) {
        return next();
    }

    return Tf.unwrap(handler)(ctx, next);
};

const scoped = f => R.useWith(R.call, [ Tf.unwrap, f, R.identity ]);

module.exports = {
    commandRegex,
    scoped,
};
