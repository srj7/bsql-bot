'use strict';

const { Context } = require('telegraf');


class ContextHandlingEdits extends Context {
    constructor(update, tg, options) {
        const message = update.message || update.edited_message;
        const { update_id } = update;
        super({ message, update_id }, tg, options);
    }

    reply(content, options={}) {
        const reply_to_message_id = this.message.message_id;
        const newOptions = { reply_to_message_id, ...options };
        return super.reply(content, newOptions);
    }
}

module.exports = ContextHandlingEdits;
