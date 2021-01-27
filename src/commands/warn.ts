import { MessageEmbed } from "discord.js";
import { guilds, hasPermission } from "../index";
import { Command } from "../lib/index";

module.exports = new Command('warn', ['warns'], false, 'Warn user', (e, args) => {
    if(args.length == 1 && e.mentions.members.size >= 1) {
        const embed = new MessageEmbed().setTitle(`${e.mentions.members.first().displayName} Warns`);
        guilds.data.get(e.guild.id).members[e.mentions.members.first().id].warns.forEach((warn, idx) => {
            embed.addField(`${idx}`, `Reason: ${warn.message} \nWarn by: <@${warn.giver}>`)
        });
        if(embed.fields.length == 0) embed.setDescription('No warn');
        e.channel.send(embed);
    }else if(args.length >= 2 && e.mentions.members.size >= 1) {
        if(hasPermission(e.member, 'WARN')) {
            const warn = {
                giver: e.member.id,
                message: args.slice(1).join(' ')
            };
            guilds.data.get(e.guild.id).members[e.mentions.members.first().id].warns.push(warn);
            e.channel.send(new MessageEmbed().setTitle('Warned ' + e.mentions.members.first().displayName).addField('Warn:', `Reason: ${warn.message} \nBy: <@${warn.giver}>`))
        }else {
            e.reply('You don\'t have the permission to warn !');
        }
    }else {
        e.reply('Please use ";warn <mention>" to see warn and ";warn <mention> <reason>" to give warn');
    }
});