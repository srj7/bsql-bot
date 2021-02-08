'use strict';

const R = require('ramda');
const Tf = require('telegraf').Composer;

const executor = require('../executor');

const langsList = executor.listLangs();


const padRight = char => length => s => s + char.repeat(length - s.length);

const maxLengthIn = R.compose(R.apply(Math.max), R.map(R.length));

const splitInto = n => arr => R.splitEvery(Math.ceil(arr.length / n), arr);

const prependSlash = s => `/${s}`;

const padIntoMaxLength = arr => arr.map(padRight(' ')(maxLengthIn(arr)));


const langsString = R.pipe(
    R.sortBy(R.identity),
    R.map(prependSlash),
    splitInto(2),
    R.map(padIntoMaxLength),
    R.transpose,
    R.map(R.join(' ')),
    R.join('\n'),
)(langsList);


const handler = Tf.reply(`<pre>${langsString}</pre>`, { parse_mode: 'HTML' });

// @ts-ignore
module.exports = Tf.command([ 'langs', 'languages', 'all_languages' ], handler);
