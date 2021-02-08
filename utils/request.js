'use strict';

const fetch = require('node-fetch');
const qs = require('querystring');
const R = require('ramda');

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

const formatErrorMessage = (res) => `${res.status}: ${res.statusText}`;

/* Implementing this using Ramda makes the stack-trace polluted */
const handleFetchError = res =>
    res.ok
        ? res
        : Promise.reject(new Error(formatErrorMessage(res)));

// subset of request-promise-any reimplemented using node-fetch.
// Because request-promise-any has more indirect dependencies
// than everything in my project combined / my whole project,
// and node-fetch is used by Telegraf, but it feels bare-bones.

const request = ({ form={}, json=false, method='get', url }) => {
    const body = qs.stringify(form);
    // @ts-ignore
    return fetch(url, { body, headers, method })
        .then(handleFetchError)
        // @ts-ignore
        .then(R.invoker(0, json? 'json': 'text'));
};

module.exports = request;
