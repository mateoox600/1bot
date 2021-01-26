import { Message } from 'discord.js';
import { Event } from '../lib/index';
import { users, guilds } from '../index';

module.exports = new Event('message', (msg: Message) => {
    var guild = guilds.data.get(msg.guild.id);
    const user = guild.members[msg.author.id];
    if(user == undefined) return;
    user.xp++;
    if(user.xp >= (user.level+1)*100) {
        user.xp = 0;
        user.level++;

        msg.channel.send('You leveled up ! You are now level ' + user.level);
        guild.levels.rewards.forEach((r) => {
            if(user.level >= r.level) {
                if(r.message !== '' && r.message != undefined) msg.channel.send(r.message);
                if(r.role !== '' && r.role != undefined && msg.guild.roles.cache.get(r.role))msg.member.roles.add(msg.guild.roles.cache.get(r.role));
            }
        });
    }
});