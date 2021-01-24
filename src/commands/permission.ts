import { Command } from '../lib/index';
import { guilds } from '../index';
import * as config from '../../config.json';
import { MessageEmbed } from 'discord.js';

module.exports = new Command('permission', ['permissions', 'perm'], false, 'Give or remove member permission', (e, args) => {
    if(args.length <= 0) {
        e.channel.send(new MessageEmbed().addField('Permissions', guilds.data.get(e.guild.id).members[e.member.id].permissions.join(', ') || 'None'));
    }else {
        if(args[0] === 'add' || args[0] === '+') {
            if(guilds.data.get(e.guild.id).members[e.member.id].permissions.includes('PERMISSION_MANAGE') || e.guild.ownerID === e.member.id || e.member.id === config.owner.id) {
                if(e.mentions.members.size == 1) {
                    const member = guilds.data.get(e.guild.id).members[e.mentions.members.first().id];
                    if(!member.permissions.includes(args[2])) {
                        guilds.data.get(e.guild.id).members[e.mentions.members.first().id].permissions.push(args[2]);
                        e.channel.send('You give the permission ' + args[2] + ' to ' + e.mentions.members.first().displayName)
                    }else {
                        e.reply('Please use ";permission add <mention> <permission>" with a permission that the member don\'t have');
                    }
                }else {
                    e.reply('Please use ";permission add <mention> <permission>"');
                }
            }else {
                e.reply('You don\'t have the permission to do that !');
            }
        }else if(args[0] === 'remove' || args[0] === '-') {
            if(guilds.data.get(e.guild.id).members[e.member.id].permissions.includes('PERMISSION_MANAGE') || e.guild.ownerID === e.member.id || e.member.id === config.owner.id) {
                if(e.mentions.members.size == 1) {
                    const member = guilds.data.get(e.guild.id).members[e.mentions.members.first().id];
                    if(member.permissions.includes(args[2])) {
                        guilds.data.get(e.guild.id).members[e.mentions.members.first().id].permissions = member.permissions.slice(member.permissions.indexOf(args[2]), 1);
                        e.channel.send('You remove the permission ' + args[2] + ' from ' + e.mentions.members.first().displayName)
                    }else {
                        e.reply('Please use ";permission remove <mention> <permission>" with a permission that the member has')
                    }
                }else {
                    e.reply('Please use ";permission remove <mention> <permission>"');
                }
            }else {
                e.reply('You don\'t have the permission to do that !');
            }
        }
    }
});