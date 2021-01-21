"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const index_2 = require("../index");
const config_json_1 = require("../../config.json");
module.exports = new index_1.Command('admin', ['ad'], true, 'Admin things but only for bot owner', (e, args) => {
    if (args[0] === 'execute' || args[0] === 'e')
        try {
            var code_arg = args.slice(1);
            var code = code_arg.join(' ').split('\n');
            code = code.slice(1, code.length - 1).join('\n');
            eval(code);
        }
        catch (err) {
            e.reply('```' + err + '```');
        }
    else if (args[0] === 'prefix' || args[0] === 'p')
        if (args[1] === '"reset"')
            index_2.bot.changeGuildPrefix(e.guild.id, config_json_1.prefix);
        else
            index_2.bot.changeGuildPrefix(e.guild.id, args[1]);
});
