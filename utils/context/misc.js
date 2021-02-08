'use strict';

const constructContext = cls => ctx => new cls(ctx.update, ctx.tg, ctx.options);

module.exports = {
    constructContext,
};
