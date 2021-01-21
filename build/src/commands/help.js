"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../lib/index");
const index_2 = require("../index");
module.exports = new index_1.Command('help', ['h'], false, 'Help for the commands', (e, args) => {
    if (args.length < 1) {
        var commands = '';
        index_2.bot.uniqueCommands.forEach((command) => {
            commands += command.name + ', ';
        });
        commands = commands.substring(0, commands.length - 2);
        e.channel.send(new discord_js_1.MessageEmbed().setTitle('Help')
            .setDescription('";help <commad>" to get more help on a command')
            .addField('Commands', commands));
    }
    else {
        if (index_2.bot.commands.has(args[0])) {
            const command = index_2.bot.commands.get(args[0]);
            e.channel.send(new discord_js_1.MessageEmbed().setTitle(command.name)
                .setDescription(command.description)
                .addField('Aliases', command.aliases.length > 0 ? command.aliases.join(', ') : ''));
        }
        else {
            e.reply('The command you entered is not valid use ";help" for a list of commands');
        }
    }
});
