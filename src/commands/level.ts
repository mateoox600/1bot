import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../lib/index';
import { guilds } from '../index';
import * as config from '../../config.json';

module.exports = new Command('level', ['lvl'], false, 'Show your level', (e: Message, args: string[]) => {
    var user = guilds.data.get(e.guild.id).members[e.author.id];
    if(args.length <= 0) e.channel.send(new MessageEmbed().addField('Level', `${user.level} (Xp: ${user.xp}/${(user.level+1)*100})`).setAuthor(e.author.username, e.author.displayAvatarURL()));
    else {
        if(args[0] === 'reward' || args[0] === 'r') {
            if(args.length == 1) {
                var embed = new MessageEmbed().setTitle(e.guild.name + ' level reward');
                guilds.data.get(e.guild.id).levels.rewards.forEach((v, idx) => {
                    embed.addField(idx, `level: ${v.level} \nmessage: ${v.message} \nrole: ${e.guild.roles.cache.get(v.role)}`);
                });
                e.channel.send(embed);
            }else {
                if(args[1] === 'add' || args[1] === '+') {
                    if(e.member.id !== e.guild.ownerID || e.member.id !== config.owner.id) {
                        e.reply('you don\'t have the permission to do that');
                        return;
                    }
                    if(args.length >= 5) {
                        const level = Number(args[2]);
                        const role = args[3];
                        const message = args.slice(4).join(' ');
                        if(isNaN(level)) {
                            e.reply('use ";level reward add <level> <roleId> <message>" with a valid number');
                            return;
                        }
                        if(!e.guild.roles.cache.has(role)) {
                            e.reply('use ";level reward add <level> <roleId> <message>" with a valid role id');
                            return;
                        }
                        guilds.data.get(e.guild.id).levels.rewards.push({
                            level,
                            role,
                            message
                        });
                        e.reply('you created a reward for leveling up to level ' + level + ' with a role reward of ' + e.guild.roles.cache.get(role).name + ' with a message of "' + message + '"');
                    }else {
                        e.reply('use ";level reward add <level> <roleId> <message>" to create a reward for level');
                    }
                }else if(args[1] === 'remove' || args[1] === '-') {
                    if(e.member.id !== e.guild.ownerID || e.member.id !== config.owner.id) {
                        e.reply('you don\'t have the permission to do that');
                        return;
                    }
                    if(args.length >= 3) {
                        const id = Number(args[2]);
                        if(isNaN(id)) {
                            e.reply('use ";level reward remove <reward-id>"');
                            return;
                        }
                        guilds.data.get(e.guild.id).levels.rewards.splice(id, 1);
                        e.reply('you deleted the reward with id ' + id);
                    }else {
                        e.reply('use ";level reward remove <reward-id>"');
                    }
                }
            }
        }
    }
});