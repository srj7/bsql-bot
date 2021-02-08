'use strict';

const Tf = require('telegraf').Composer;

// @ts-ignore
const pkg = require('../package.json');

const helpText = ({ me }) => `Execute code.

Usage: \`/<language> <code> [/stdin <stdin>]\`

Inline mode:
\`@${me} <language> <code> [/stdin <stdin>]\`

Line breaks and indentation are supported.

See list of supported programming languages:
/common\\_languages, /all\\_languages.

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
