import { Command } from '../lib/index';
import { guilds, hasPermission, Permissions } from '../index';
import { MessageEmbed } from 'discord.js';

module.exports = new Command('permission', ['permissions', 'perm'], false, 'Give or remove member permission', (e, args) => {
    if(args.length <= 0) {
        e.channel.send(new MessageEmbed().addField('Your Permissions', guilds.data.get(e.guild.id).members[e.member.id].permissions.map((perm) => Permissions[perm]).join(', ') || 'None'));
    }else {
        if(args.length == 1 && e.mentions.members.size == 1) {
            if(hasPermission(e.member, Permissions.PERMISSION_MANAGE)) {
                const member = guilds.data.get(e.guild.id).members[e.mentions.members.first().id];
                e.channel.send(new MessageEmbed().addField(e.mentions.members.first().displayName + ' Permissions', member.permissions.map((perm) => Permissions[perm]).join(', ') || 'None'));
            }
        }else if(args[0] === 'add' || args[0] === '+') {
            if(hasPermission(e.member, Permissions.PERMISSION_MANAGE)) {
                if(e.mentions.members.size == 1) {
                    const member = guilds.data.get(e.guild.id).members[e.mentions.members.first().id];
                    if(Permissions[args[2]] == undefined) {
                        e.reply('Please use ";permission add <mention> <permission>" with a valid permission you can see them with ";permission list"');
                        return;
                    }
                    const permission = Permissions[args[2]];
                    if(!member.permissions.includes(permission)) {
                        member.permissions.push(permission);
                        e.channel.send('You give the permission ' + Permissions[permission] + ' to ' + e.mentions.members.first().displayName)
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
            if(hasPermission(e.member, Permissions.PERMISSION_MANAGE)) {
                if(e.mentions.members.size == 1) {
                    const member = guilds.data.get(e.guild.id).members[e.mentions.members.first().id];
                    if(Permissions[args[2]] == undefined) {
                        e.reply('Please use ";permission add <mention> <permission>" with a valid permission you can see them with ";permission list"');
                        return;
                    }
                    const permission = Permissions[args[2]];
                    if(member.permissions.includes(permission)) {
                        member.permissions.slice(member.permissions.indexOf(permission), 1);
                        e.channel.send('You remove the permission ' + Permissions[permission] + ' from ' + e.mentions.members.first().displayName)
                    }else {
                        e.reply('Please use ";permission remove <mention> <permission>" with a permission that the member has')
                    }
                }else {
                    e.reply('Please use ";permission remove <mention> <permission>"');
                }
            }else {
                e.reply('You don\'t have the permission to do that !');
            }
        }else if(args[0] === 'list' || args[0] === 'l') {
            e.channel.send(new MessageEmbed().addField('Permissions', Object.keys(Permissions).filter((key) => isNaN(Number(key))).join(', ')));
        }else {
            e.reply('Please use ";permission <add/remove/list> <mention> <permission>"')
        }
    }
});