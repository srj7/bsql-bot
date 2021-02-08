'use strict';

const R = require('ramda');

const { html } = require('./string');

// @ts-ignore
const proxy = R.flip(R.construct(Proxy));

// Similar to https://www.npmjs.com/package/binded
const bound = proxy({
    get: (target, name) =>
        typeof target[name] === 'function'
            ? target[name].bind(target)
            : target[name],
});


const displayError = process.env.NODE_ENV === 'development'
    ? R.prop('stack')
    : String;

const symbolForNull = '\u2400';

const format = R.pipe(
    R.filter(Boolean),
    R.map(R.trim),
    R.map(R.replace(/\0/g, symbolForNull)),
    R.toPairs,
    R.map(([ key, value ]) => html`<b>${key}</b>:\n<pre>${value}</pre>`),
    R.join('\n\n'),
);

const languageRegex = /^[\w.#+]+$/;

const mix = mod => proto =>
    Object.assign(Object.create(proto), { super: proto }, mod);

module.exports = {
    bound,
    displayError,
    format,
    languageRegex,
    mix,
    proxy,
};
