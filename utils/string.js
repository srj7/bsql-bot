'use strict';

const R = require('ramda');


const escapeHtml = R.pipe(
    R.replace(/&/g, '&amp;'),
    R.replace(/"/g, '&quot;'),
    R.replace(/</g, '&lt;'),
);

// @ts-ignore
const intermix = R.pipe(R.zip, R.unnest);

/**
 * Simple function which emulates untagged template string.
 * Useful for building other tag functions which actually do something.
 * @param {string[]} as
 * @param {any[]} subs
 */
const tag = (as, ...subs) => intermix(as, subs).join('') + R.last(as);
const simpleEscape = esc => (as, ...subs) => tag(as, ...subs.map(esc));

// Similar to https://www.npmjs.com/package/html-template-tag
const html = simpleEscape(R.pipe(String, escapeHtml));

module.exports = {
    escapeHtml,
    html,
    simpleEscape,
    tag,
};
