import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../lib/index';
import { bot } from '../index';

module.exports = new Command('help', ['h'], false, 'Help for the commands', (e: Message, args: string[]) => {
    if(args.length < 1) {
        var commands = '';
        bot.uniqueCommands.forEach((command) => {
            commands += command.name + ', '
        });
        commands = commands.substring(0, commands.length-2);
        e.channel.send(new MessageEmbed().setTitle('Help')
            .setDescription('";help <commad>" to get more help on a command')
            .addField('Commands', commands));
    }else {
        if(bot.commands.has(args[0])) {
            const command = bot.commands.get(args[0]);
            e.channel.send(new MessageEmbed().setTitle(command.name)
                .setDescription(command.description)
                .addField('Aliases', command.aliases.length > 0 ? command.aliases.join(', ') : ''))
        }else {
            e.reply('The command you entered is not valid use ";help" for a list of commands');
        }
    }
});