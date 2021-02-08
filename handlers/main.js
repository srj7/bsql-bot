'use strict';

const R = require('ramda');
const XRegExp = require('xregexp');

const executor = require('../executor');

const { languageRegex, displayError, format } = require('../utils/misc');
const { commandRegex } = require('../utils/telegraf');


const regex = XRegExp.tag('six') `^/
    (?<lang> ${languageRegex})
    (?<username> @\w+)?
    \s+
    (?<Program> .+?)
    (?:
        \s+
        /stdin
        \s+
        (?<Input> .+)
    )?
$`;


const handler = async (ctx, next) => {
    const { lang, Program, Input } = ctx.match;

    const langIds = await executor.resolveLang(lang);

    if (langIds.length === 0) {
        return ctx.chat.type === 'private'
            ? ctx.reply(`Unknown language: ${lang}`)
            : null;
    }

    ctx.replyWithChatAction('typing');

    const [ LanguageChoice ] = langIds;

    return executor.execute({ Input, LanguageChoice, Program })
        .then(format)
        .then(ctx.replyWithHTML)
        .catch(R.pipe(displayError, ctx.reply));
};

module.exports = commandRegex(regex, handler);
