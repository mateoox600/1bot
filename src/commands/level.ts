import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../lib/index';
import { users, guilds } from '../index';
import * as config from '../../config.json';

module.exports = new Command('level', ['lvl'], true, 'Show your level', (e: Message, args: string[]) => {
    var user = users.data.get(e.author.id);
    if(args.length <= 0) e.channel.send(new MessageEmbed().addField('Level', `${user.level} (Xp: ${user.xp}/${(user.level+1)*100})`).setAuthor(e.author.username, e.author.displayAvatarURL()));
    else {
        if(args[0] === 'reward' || args[0] === 'r') {
            if(args.length >= 3) {
                const level = Number(args[1]);
                const role = args[2];
                const message = args.slice(3).join(' ');
                if(isNaN(level)) {
                    e.reply('use `;level reward <level> <roleId> <message>` with a valid number');
                    return;
                }
                if(!e.guild.roles.cache.has(role)) {
                    e.reply('use `;level reward ' + level + ' <roleId> <message>` with a valid role id');
                    return;
                }
                guilds.data.get(e.guild.id).levels.rewards.push({
                    level,
                    role,
                    message
                });
            }else {
                e.reply('use `;level reward <level> <roleId> <message>` to create a reward for level');
            }
        }else {
            e.reply('use `;level` to see your level' + (e.member.id === e.guild.ownerID || e.member.id === config.owner.id ? ' and `;level reward <level> <roleId> <message>` to set rewards with level' : ' !'))
        }
    }
});