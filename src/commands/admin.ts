import { Message } from 'discord.js';
import { Command } from '../lib/index';
import { bot, users } from '../index';
import { prefix } from '../../config.json';

module.exports = new Command('admin', ['ad'], true, 'Admin things but only for bot owner', (e: Message, args: string[]) => {
    if(args[0] === 'execute' || args[0] === 'e')
        try {
            var code_arg = args.slice(1);
            var code: any = code_arg.join(' ').split('\n');
            code = code.slice(1, code.length-1).join('\n');
            eval(code);
        }catch(err) { e.reply('```' + err + '```'); }
    else if(args[0] === 'prefix' || args[0] === 'p')
        if(args[1] === '"reset"') bot.changeGuildPrefix(e.guild.id, prefix);
        else bot.changeGuildPrefix(e.guild.id, args[1]);
    else if(args[0] === 'user' || args[0] === 'u')
        if(args[1] === 'level' || args[1] === 'lvl') users.data.get(args[2]).level = Number[3];
        else if(args[1] === 'xp')users.data.get(args[2]).xp = Number[3];
});