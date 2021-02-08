'use strict';

const Tf = require('telegraf').Composer;

// @ts-ignore
const pkg = require('../package.json');

const helpText = ({ me }) => `Hey there, I can help you compile code snippets in telegram.

How to use: \`/<language> <code> [/stdin <stdin>]\`

example : \`/python print("Hello World") /stdin inputs(if any) \`

Line breaks and indentation are supported.

See list of supported programming languages:
/common\\_languages

Version: \`${pkg.version}\`.
Powered by AWS Lambda.
`;

const helpHandler = ctx => {
    const inline_keyboard = [ [
        // XXX use pkg.bugs.url instead?
        { text: "Web App", url: "https://www.binarysquirrel.cf/" },
    ] ];

    const reply_markup = { inline_keyboard };

    return ctx.replyWithMarkdown(helpText(ctx), { reply_markup });
};

// @ts-ignore
module.exports = Tf.command([ 'help', 'start' ], helpHandler);
